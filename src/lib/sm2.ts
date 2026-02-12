/**
 * SM-2 Spaced Repetition Algorithm
 * Based on: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */

import type { RatingButton } from '../types';

export interface SM2Input {
  quality: number;        // 0-5 rating
  repetitions: number;    // Current repetition count
  easeFactor: number;     // Current EF (default 2.5)
  interval: number;       // Current interval in days
}

export interface SM2Output {
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReviewDate: Date;
}

/**
 * Core SM-2 calculation
 * Returns new interval, ease factor, and repetition count
 */
export function calculateSM2(input: SM2Input): SM2Output {
  const { quality, repetitions, easeFactor, interval } = input;

  let newRepetitions: number;
  let newEaseFactor: number;
  let newInterval: number;

  // If quality < 3, reset learning (incorrect response)
  if (quality < 3) {
    newRepetitions = 0;
    newInterval = 1; // Review again tomorrow (or sooner for learning)
    newEaseFactor = Math.max(1.3, easeFactor - 0.2); // Decrease EF, minimum 1.3
  } else {
    // Correct response
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }

    newRepetitions = repetitions + 1;

    // Update ease factor using SM-2 formula
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEaseFactor = Math.max(1.3, newEaseFactor); // Minimum EF is 1.3
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    repetitions: newRepetitions,
    easeFactor: Math.round(newEaseFactor * 100) / 100, // Round to 2 decimals
    interval: newInterval,
    nextReviewDate
  };
}

/**
 * Convert Anki-style buttons to SM-2 quality rating
 */
export function buttonToQuality(button: RatingButton): number {
  const mapping: Record<RatingButton, number> = {
    again: 1,  // Complete blackout or wrong
    hard: 2,   // Correct but very difficult
    good: 3,   // Correct with some hesitation
    easy: 5    // Perfect, instant recall
  };
  return mapping[button];
}

/**
 * Calculate "fuzz" to prevent card bunching
 * Adds slight randomness to intervals
 */
export function fuzzInterval(interval: number): number {
  if (interval < 2) return interval;
  const fuzzDays = Math.max(1, Math.round(interval * 0.05));
  const fuzz = Math.floor(Math.random() * (fuzzDays * 2 + 1)) - fuzzDays;
  return Math.max(1, interval + fuzz);
}

/**
 * Format interval for display
 * e.g., "1d", "2w", "3mo"
 */
export function formatInterval(days: number): string {
  if (days < 1) {
    const minutes = Math.round(days * 24 * 60);
    if (minutes < 60) return `${minutes}m`;
    return `${Math.round(minutes / 60)}h`;
  }
  if (days < 7) return `${Math.round(days)}d`;
  if (days < 30) return `${Math.round(days / 7)}w`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${Math.round(days / 365)}y`;
}

/**
 * Preview what happens with each rating button
 * Used to show "1d", "4d", etc. on buttons
 */
export function previewIntervals(
  currentState: { repetitions: number; easeFactor: number; interval: number } | null
): Record<RatingButton, string> {
  const defaultState = { repetitions: 0, easeFactor: 2.5, interval: 0 };
  const state = currentState || defaultState;

  const buttons: RatingButton[] = ['again', 'hard', 'good', 'easy'];
  const previews: Record<RatingButton, string> = {} as Record<RatingButton, string>;

  for (const button of buttons) {
    const quality = buttonToQuality(button);
    const result = calculateSM2({
      quality,
      repetitions: state.repetitions,
      easeFactor: state.easeFactor,
      interval: state.interval
    });
    previews[button] = formatInterval(result.interval);
  }

  return previews;
}

/**
 * Get the interval in minutes for learning/relearning cards
 * These are shorter intervals for cards being actively learned
 */
export function getLearningInterval(step: number): number {
  const steps = [1, 10, 60]; // minutes
  return steps[Math.min(step, steps.length - 1)];
}
