import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Card, UserSettings, RatingButton } from '../types';

// ============ Settings Store ============

interface SettingsState extends UserSettings {
  setDailyNewCards: (count: number) => void;
  setDailyReviewLimit: (count: number) => void;
  setShowTimer: (show: boolean) => void;
  setAutoAdvance: (auto: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setFontScale: (scale: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      dailyNewCards: 10,
      dailyReviewLimit: 100,
      showTimer: false,
      autoAdvance: false,
      theme: 'dark',
      fontScale: 1.0,

      setDailyNewCards: (count) => set({ dailyNewCards: count }),
      setDailyReviewLimit: (count) => set({ dailyReviewLimit: count }),
      setShowTimer: (show) => set({ showTimer: show }),
      setAutoAdvance: (auto) => set({ autoAdvance: auto }),
      setTheme: (theme) => set({ theme }),
      setFontScale: (scale) => set({ fontScale: scale }),
    }),
    {
      name: 'apologetica-settings',
    }
  )
);

// ============ Study Session Store ============

interface StudyState {
  // Current session
  topicId: string | null;
  topicName: string | null;
  queue: Card[];
  currentIndex: number;
  isFlipped: boolean;

  // Session stats
  sessionStats: {
    total: number;
    again: number;
    hard: number;
    good: number;
    easy: number;
    startTime: number;
  };

  // Actions
  startSession: (topicId: string, topicName: string, cards: Card[]) => void;
  flipCard: () => void;
  rateCard: (rating: RatingButton) => void;
  nextCard: () => void;
  endSession: () => void;
  isSessionComplete: () => boolean;
  getCurrentCard: () => Card | null;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  topicId: null,
  topicName: null,
  queue: [],
  currentIndex: 0,
  isFlipped: false,

  sessionStats: {
    total: 0,
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
    startTime: 0,
  },

  startSession: (topicId, topicName, cards) => {
    set({
      topicId,
      topicName,
      queue: cards,
      currentIndex: 0,
      isFlipped: false,
      sessionStats: {
        total: cards.length,
        again: 0,
        hard: 0,
        good: 0,
        easy: 0,
        startTime: Date.now(),
      },
    });
  },

  flipCard: () => {
    set({ isFlipped: true });
  },

  rateCard: (rating) => {
    const { sessionStats } = get();
    set({
      sessionStats: {
        ...sessionStats,
        [rating]: sessionStats[rating] + 1,
      },
    });
  },

  nextCard: () => {
    const { currentIndex, queue } = get();
    if (currentIndex < queue.length - 1) {
      set({
        currentIndex: currentIndex + 1,
        isFlipped: false,
      });
    }
  },

  endSession: () => {
    set({
      topicId: null,
      topicName: null,
      queue: [],
      currentIndex: 0,
      isFlipped: false,
      sessionStats: {
        total: 0,
        again: 0,
        hard: 0,
        good: 0,
        easy: 0,
        startTime: 0,
      },
    });
  },

  isSessionComplete: () => {
    const { queue, sessionStats } = get();
    const reviewed = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy;
    return reviewed >= queue.length;
  },

  getCurrentCard: () => {
    const { queue, currentIndex } = get();
    return queue[currentIndex] || null;
  },
}));

// ============ UI Store ============

interface UIState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
