/**
 * Card Scheduler - Manages review scheduling and state updates
 */

import { db, generateId } from '../db/database';
import { calculateSM2, buttonToQuality, fuzzInterval } from './sm2';
import type { RatingButton, ReviewState } from '../types';

/**
 * Process a card review and update the database
 */
export async function processReview(
  cardId: string,
  button: RatingButton
): Promise<{ newInterval: number; nextDue: Date }> {
  const quality = buttonToQuality(button);

  // Get or create review state
  let state = await db.reviewStates.where('cardId').equals(cardId).first();

  if (!state) {
    // New card - initialize
    state = {
      id: generateId(),
      cardId,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: Date.now(),
      lastReviewDate: 0,
      status: 'new',
      lapses: 0
    };
  }

  const previousInterval = state.interval;
  const previousEF = state.easeFactor;

  // Apply SM-2
  const result = calculateSM2({
    quality,
    repetitions: state.repetitions,
    easeFactor: state.easeFactor,
    interval: state.interval
  });

  // Add fuzz to prevent bunching
  const newInterval = fuzzInterval(result.interval);

  // Determine new status
  let newStatus: ReviewState['status'];
  if (quality < 3) {
    // Failed - go to learning or relearning
    newStatus = state.status === 'review' ? 'relearning' : 'learning';
  } else if (result.interval >= 21) {
    // Graduated to review
    newStatus = 'review';
  } else {
    // Still learning
    newStatus = 'learning';
  }

  // Update state
  const updatedState: ReviewState = {
    ...state,
    easeFactor: result.easeFactor,
    interval: newInterval,
    repetitions: result.repetitions,
    dueDate: result.nextReviewDate.getTime(),
    lastReviewDate: Date.now(),
    status: newStatus,
    lapses: quality < 3 ? state.lapses + 1 : state.lapses
  };

  await db.reviewStates.put(updatedState);

  // Log the review
  await db.reviewLogs.add({
    id: generateId(),
    cardId,
    rating: quality as 0 | 1 | 2 | 3 | 4 | 5,
    reviewedAt: Date.now(),
    timeSpentMs: 0, // TODO: track actual time
    previousInterval,
    newInterval,
    previousEF,
    newEF: result.easeFactor
  });

  return { newInterval, nextDue: result.nextReviewDate };
}

/**
 * Get review state for a card
 */
export async function getReviewState(cardId: string): Promise<ReviewState | null> {
  const state = await db.reviewStates.where('cardId').equals(cardId).first();
  return state || null;
}

/**
 * Get study statistics for a topic
 */
export async function getTopicStats(topicId: string) {
  const cards = await db.cards.where('topicId').equals(topicId).toArray();
  const cardIds = new Set(cards.map(c => c.id));

  const allStates = await db.reviewStates.toArray();
  const states = allStates.filter(s => cardIds.has(s.cardId));

  const now = Date.now();
  const stateMap = new Map(states.map(s => [s.cardId, s]));

  let newCount = 0;
  let learningCount = 0;
  let reviewCount = 0;
  let dueCount = 0;
  let matureCount = 0;

  for (const card of cards) {
    const state = stateMap.get(card.id);
    if (!state) {
      newCount++;
    } else {
      if (state.status === 'learning' || state.status === 'relearning') {
        learningCount++;
      } else {
        reviewCount++;
        if (state.interval >= 21) {
          matureCount++;
        }
      }
      if (state.dueDate <= now) {
        dueCount++;
      }
    }
  }

  return {
    total: cards.length,
    new: newCount,
    learning: learningCount,
    review: reviewCount,
    due: dueCount + newCount, // New cards are always "due"
    mature: matureCount
  };
}

/**
 * Reset a card's progress (for re-learning)
 */
export async function resetCard(cardId: string): Promise<void> {
  await db.reviewStates.where('cardId').equals(cardId).delete();
}

/**
 * Get recent review history for a card
 */
export async function getCardHistory(cardId: string, limit = 10) {
  return db.reviewLogs
    .where('cardId')
    .equals(cardId)
    .reverse()
    .limit(limit)
    .toArray();
}
