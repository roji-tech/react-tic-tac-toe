export type PlayerSymbol = 'X' | 'O' | 'Δ' | '▢';

export type GameVariant = 'classic' | 'ultimate' | 'threed' | 'multiplayer';

export type AIMode = 'pvp' | 'ai-easy' | 'ai-unbeatable';

export interface ScoreState {
  [key: string]: number;
  DRAW: number;
}

export interface MatchRecord {
  id: number;
  date: string;
  variant: GameVariant;
  variantName: string;
  winner: string; // Player symbol or 'DRAW'
  modeName: string;
  movesCount?: number;
}

export interface WinResult {
  winner: string;
  line: number[];
}
