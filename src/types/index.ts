// Topic/Category for organizing cards
export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  createdAt: number;
  updatedAt: number;
}

// Scripture reference
export interface ScriptureRef {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  text?: string;
}

// Card content (front or back)
export interface CardContent {
  primary: string;
  scriptureRefs: ScriptureRef[];
  notes?: string;
  technique?: 'boomerang' | 'reroute' | 'principle' | 'bridge';
}

// Individual flashcard
export interface Card {
  id: string;
  topicId: string;
  front: CardContent;
  back: CardContent;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sourceType: 'builtin' | 'imported' | 'user';
  createdAt: number;
  updatedAt: number;
}

// SM-2 Review State (per card)
export interface ReviewState {
  id: string;
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueDate: number;
  lastReviewDate: number;
  status: 'new' | 'learning' | 'review' | 'relearning';
  lapses: number;
}

// Individual review log entry
export interface ReviewLog {
  id: string;
  cardId: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  reviewedAt: number;
  timeSpentMs: number;
  previousInterval: number;
  newInterval: number;
  previousEF: number;
  newEF: number;
}

// User progress per topic
export interface TopicProgress {
  topicId: string;
  totalCards: number;
  newCards: number;
  learningCards: number;
  reviewCards: number;
  matureCards: number;
  masteredCards: number;
  lastStudied: number;
  streak: number;
}

// User settings
export interface UserSettings {
  dailyNewCards: number;
  dailyReviewLimit: number;
  showTimer: boolean;
  autoAdvance: boolean;
  theme: 'light' | 'dark' | 'system';
  fontScale: number;
}

// Rating button type
export type RatingButton = 'again' | 'hard' | 'good' | 'easy';

// Study session state
export interface StudySessionState {
  topicId: string | null;
  queue: Card[];
  currentIndex: number;
  isFlipped: boolean;
  sessionStats: {
    total: number;
    again: number;
    hard: number;
    good: number;
    easy: number;
    startTime: number;
  };
}
