import { MatchRecord } from "../types/game";

const HISTORY_KEY = "tictactoe_game_history";

export const getStoredHistory = (): MatchRecord[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read history from localStorage", e);
    return [];
  }
};

export const saveMatchRecord = (record: Omit<MatchRecord, "id" | "date">): MatchRecord[] => {
  try {
    const current = getStoredHistory();
    const newRecord: MatchRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...record
    };
    const updated = [newRecord, ...current].slice(0, 50); // Keep latest 50 records
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save record to localStorage", e);
    return [];
  }
};

export const clearStoredHistory = (): MatchRecord[] => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  } catch (e) {
    console.error("Failed to clear history", e);
    return [];
  }
};
