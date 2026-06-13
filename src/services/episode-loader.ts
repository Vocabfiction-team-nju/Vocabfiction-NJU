import type { Episode } from '@/src/models/episode';
import { loadUserEpisode, loadUserPlainText } from '@/src/services/user-content';
import { PARA_CH01 } from './para-ch01';

const builtinEpisodes: Record<string, Record<number, () => Episode>> = {
  makeine: {
    1: () => require('@/novels/败犬女主太多了！/makeine/ep01_a_quiet_afternoon.json'),
    2: () => require('@/novels/败犬女主太多了！/makeine/ep02_the_argument.json'),
    3: () => require('@/novels/败犬女主太多了！/makeine/ep03_the_glass.json'),
  },
  little_prince: {
    1: () => require('@/novels/the_little_prince/little_prince/ep01.json'),
    2: () => require('@/novels/the_little_prince/little_prince/ep02.json'),
    3: () => require('@/novels/the_little_prince/little_prince/ep03.json'),
    4: () => require('@/novels/the_little_prince/little_prince/ep04.json'),
    5: () => require('@/novels/the_little_prince/little_prince/ep05.json'),
    6: () => require('@/novels/the_little_prince/little_prince/ep06.json'),
    7: () => require('@/novels/the_little_prince/little_prince/ep07.json'),
    8: () => require('@/novels/the_little_prince/little_prince/ep08.json'),
    9: () => require('@/novels/the_little_prince/little_prince/ep09.json'),
    10: () => require('@/novels/the_little_prince/little_prince/ep10.json'),
  },
  merchant_venice: {
    1: () => require('@/novels/merchant_of_venice/merchant_venice/ep01.json'),
    2: () => require('@/novels/merchant_of_venice/merchant_venice/ep02.json'),
    3: () => require('@/novels/merchant_of_venice/merchant_venice/ep03.json'),
    4: () => require('@/novels/merchant_of_venice/merchant_venice/ep04.json'),
    5: () => require('@/novels/merchant_of_venice/merchant_venice/ep05.json'),
    6: () => require('@/novels/merchant_of_venice/merchant_venice/ep06.json'),
    7: () => require('@/novels/merchant_of_venice/merchant_venice/ep07.json'),
    8: () => require('@/novels/merchant_of_venice/merchant_venice/ep08.json'),
    9: () => require('@/novels/merchant_of_venice/merchant_venice/ep09.json'),
    10: () => require('@/novels/merchant_of_venice/merchant_venice/ep10.json'),
  },
};

export function loadBuiltinEpisode(workId: string, epNum: number): Episode | null {
  const workEps = builtinEpisodes[workId];
  if (!workEps) return null;
  const loader = workEps[epNum];
  if (!loader) return null;
  return loader() as Episode;
}

export async function loadEpisode(workId: string, epNum: number): Promise<Episode | null> {
  return loadBuiltinEpisode(workId, epNum) ?? await loadUserEpisode(workId, epNum);
}

/** Load plain text chapter for traditional reading mode. */
export async function loadPlainText(workId: string, _chNum = 1): Promise<string | null> {
  if (workId === 'makeine') return PARA_CH01;
  return loadUserPlainText(workId);
}

export function hasBuiltinEpisodes(workId: string): boolean {
  return workId in builtinEpisodes;
}

export function getBuiltinEpisodeCount(workId: string): number {
  const workEps = builtinEpisodes[workId];
  return workEps ? Object.keys(workEps).length : 0;
}
