export const BUILTIN_WORD_LIST_ID = 'builtin-cet4-core';

export interface WordList {
  id: string;
  name: string;
  text: string;
  source: 'builtin' | 'user';
  created_at: string;
  updated_at: string;
}

export type WordListSource = 'builtin' | 'user';
