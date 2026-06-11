import type { ArcPlan, TargetWord, UserVocabulary, VocabularyItem } from './types';

const EPISODE_LIMIT = 20;

/** Fisher-Yates shuffle — breaks alphabetical bias in word pools. */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildPools(
  userVocabulary: UserVocabulary,
  now: Date,
): { unseenPool: VocabularyItem[]; reviewPool: VocabularyItem[] } {
  const unseenPool: VocabularyItem[] = [];
  const reviewPool: VocabularyItem[] = [];

  for (const item of userVocabulary.vocabulary) {
    const lastReview = parseDate(item.fsrs_card.last_review);
    const due = parseDate(item.fsrs_card.due);
    if (!lastReview) {
      unseenPool.push(item);
    } else if (due && due <= now) {
      reviewPool.push(item);
    }
  }

  return { unseenPool, reviewPool };
}

function reorderPool<T extends VocabularyItem>(
  pool: T[],
  pendingOrder: string[],
  pendingIds: Set<string>,
  sortKey: (item: T) => number,
): T[] {
  const poolById = new Map(pool.map((item) => [item.id, item]));
  const pendingItems = pendingOrder
    .map((id) => poolById.get(id))
    .filter((item): item is T => Boolean(item));
  const nonPending = pool
    .filter((item) => !pendingIds.has(item.id))
    .sort((a, b) => sortKey(a) - sortKey(b));
  return [...pendingItems, ...nonPending];
}

function applyPendingOverlay(
  pools: { unseenPool: VocabularyItem[]; reviewPool: VocabularyItem[] },
  pendingWords: Array<{ item_id: string }>,
): { unseenPool: VocabularyItem[]; reviewPool: VocabularyItem[] } {
  const pendingOrder = pendingWords.map((word) => word.item_id);
  const pendingIds = new Set(pendingOrder);
  return {
    unseenPool: reorderPool(
      pools.unseenPool,
      pendingOrder,
      pendingIds,
      (item) => item.chapter_first_seen,
    ),
    reviewPool: reorderPool(
      pools.reviewPool,
      pendingOrder,
      pendingIds,
      (item) => parseDate(item.fsrs_card.due)?.getTime() ?? 0,
    ),
  };
}

function computeUrgency(dueDate: Date, now: Date): number {
  const overdueDays = (now.getTime() - dueDate.getTime()) / 86_400_000;
  if (overdueDays < 0) return 0;
  return Math.min(1, overdueDays / 30);
}

function finalScore(item: VocabularyItem, contextScore: number, now: Date): number {
  if (!item.fsrs_card.last_review) return 0.4 * 0.3 + contextScore * 0.7;
  const due = parseDate(item.fsrs_card.due);
  const urgency = due ? computeUrgency(due, now) : 0;
  return urgency * 0.5 + contextScore * 0.5;
}

function buildTarget(item: VocabularyItem, isNew: boolean): TargetWord {
  return {
    item_id: item.id,
    word: item.word,
    meaning: item.meaning,
    is_new: isNew,
    fsrs_card: item.fsrs_card,
  };
}

function allocateMainEpisode(
  unseenScored: Array<[number, VocabularyItem]>,
  reviewScored: Array<[number, VocabularyItem]>,
  arcNewIds: Set<string>,
): TargetWord[] {
  const targetWords: TargetWord[] = [];
  const unseenSorted = [...unseenScored].sort((a, b) => b[0] - a[0]);
  const reviewSorted = [...reviewScored].sort((a, b) => b[0] - a[0]);

  for (const [, item] of unseenSorted) {
    if (targetWords.filter((tw) => tw.is_new).length >= EPISODE_LIMIT) break;
    if (arcNewIds.has(item.id)) continue;
    targetWords.push(buildTarget(item, true));
    arcNewIds.add(item.id);
  }

  let reviewCount = 0;
  for (const [, item] of reviewSorted) {
    if (reviewCount >= EPISODE_LIMIT) break;
    targetWords.push(buildTarget(item, false));
    reviewCount += 1;
  }

  return targetWords;
}

function allocateSideEpisode(
  unseenScored: Array<[number, VocabularyItem]>,
  reviewScored: Array<[number, VocabularyItem]>,
  pendingItemIds: string[],
  arcNewIds: Set<string>,
): TargetWord[] {
  const pendingSet = new Set(pendingItemIds);
  const pendingUnseen = unseenScored
    .filter(([, item]) => pendingSet.has(item.id))
    .sort((a, b) => b[0] - a[0]);
  const otherUnseen = unseenScored
    .filter(([, item]) => !pendingSet.has(item.id))
    .sort((a, b) => b[0] - a[0]);
  const reviewSorted = [...reviewScored].sort((a, b) => b[0] - a[0]);
  const targetWords: TargetWord[] = [];

  for (const [, item] of [...pendingUnseen, ...otherUnseen]) {
    if (targetWords.filter((tw) => tw.is_new).length >= EPISODE_LIMIT) break;
    if (arcNewIds.has(item.id)) continue;
    targetWords.push(buildTarget(item, true));
    arcNewIds.add(item.id);
  }

  let reviewCount = 0;
  for (const [, item] of reviewSorted) {
    if (reviewCount >= EPISODE_LIMIT) break;
    targetWords.push(buildTarget(item, false));
    reviewCount += 1;
  }

  return targetWords;
}

export async function scheduleVocabulary(
  arcPlan: ArcPlan,
  userVocabulary: UserVocabulary,
  now = new Date(),
): Promise<ArcPlan> {
  const pools = applyPendingOverlay(buildPools(userVocabulary, now), arcPlan.pending_words);

  // Shuffle pools so new words are distributed across the alphabet,
  // not fed in file-order (which is alphabetical).
  pools.unseenPool = shuffleArray(pools.unseenPool);
  pools.reviewPool = shuffleArray(pools.reviewPool);

  const arcNewIds = new Set<string>();

  // Track the full candidate window consumed, not just the allocated count.
  // Old code advanced by allocation count, which caused later episodes to see
  // shrinking pools when earlier episodes skipped candidates (arcNewIds dedup).
  let unseenCandidateConsumed = 0;
  let reviewCandidateConsumed = 0;

  const episodes = arcPlan.episodes.map((episode) => {
    const candidateCount = EPISODE_LIMIT * 3;
    const unseenBatch = pools.unseenPool.slice(unseenCandidateConsumed, unseenCandidateConsumed + candidateCount);
    const reviewBatch = pools.reviewPool.slice(reviewCandidateConsumed, reviewCandidateConsumed + candidateCount);

    const unseenScored = unseenBatch.map(
      (item): [number, VocabularyItem] => [finalScore(item, 0.5, now), item],
    );
    const reviewScored = reviewBatch.map(
      (item): [number, VocabularyItem] => [finalScore(item, 0.5, now), item],
    );

    const targetWords = episode.episode_type === 'side'
      ? allocateSideEpisode(
        unseenScored,
        reviewScored,
        arcPlan.pending_words.map((word) => word.item_id),
        arcNewIds,
      )
      : allocateMainEpisode(unseenScored, reviewScored, arcNewIds);

    // Advance by the full candidate window, not by actual allocation count.
    // This prevents later episodes from seeing rapidly shrinking candidate pools.
    unseenCandidateConsumed += candidateCount;
    reviewCandidateConsumed += candidateCount;

    return { ...episode, target_words: targetWords };
  });

  return { ...arcPlan, episodes };
}
