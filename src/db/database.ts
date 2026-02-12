import Dexie, { type Table } from 'dexie';
import type { Topic, Card, ReviewState, ReviewLog } from '../types';

export class ApologeticaDB extends Dexie {
  topics!: Table<Topic>;
  cards!: Table<Card>;
  reviewStates!: Table<ReviewState>;
  reviewLogs!: Table<ReviewLog>;

  constructor() {
    super('apologetica');

    this.version(1).stores({
      topics: 'id, slug, order',
      cards: 'id, topicId, [topicId+sourceType], *tags',
      reviewStates: 'id, cardId, dueDate, status, [status+dueDate]',
      reviewLogs: 'id, cardId, reviewedAt, [cardId+reviewedAt]'
    });
  }
}

export const db = new ApologeticaDB();

// Helper to generate UUIDs
export function generateId(): string {
  return crypto.randomUUID();
}

// Get all topics with card counts
export async function getTopicsWithStats() {
  const topics = await db.topics.orderBy('order').toArray();
  const stats = await Promise.all(
    topics.map(async (topic) => {
      const cards = await db.cards.where('topicId').equals(topic.id).count();
      const now = Date.now();

      // Count cards by status
      const reviewStates = await db.reviewStates.toArray();
      const cardIds = new Set((await db.cards.where('topicId').equals(topic.id).toArray()).map(c => c.id));

      const topicStates = reviewStates.filter(rs => cardIds.has(rs.cardId));
      const dueCards = topicStates.filter(rs => rs.dueDate <= now).length;
      const newCards = cards - topicStates.length;

      return {
        ...topic,
        totalCards: cards,
        dueCards,
        newCards,
      };
    })
  );
  return stats;
}

// Get cards due for a topic
export async function getDueCards(topicId: string, limit = 50) {
  const now = Date.now();
  const topicCards = await db.cards.where('topicId').equals(topicId).toArray();
  const cardIds = new Set(topicCards.map(c => c.id));

  // Get review states for this topic's cards
  const reviewStates = await db.reviewStates.toArray();
  const topicStates = new Map(
    reviewStates.filter(rs => cardIds.has(rs.cardId)).map(rs => [rs.cardId, rs])
  );

  // Categorize cards
  const dueForReview: Card[] = [];
  const learning: Card[] = [];
  const newCards: Card[] = [];

  for (const card of topicCards) {
    const state = topicStates.get(card.id);
    if (!state) {
      newCards.push(card);
    } else if (state.status === 'learning' || state.status === 'relearning') {
      if (state.dueDate <= now) {
        learning.push(card);
      }
    } else if (state.dueDate <= now) {
      dueForReview.push(card);
    }
  }

  // Priority: Learning > Review > New (limited)
  const queue = [
    ...learning,
    ...dueForReview,
    ...newCards.slice(0, 10) // Limit new cards per session
  ].slice(0, limit);

  // Shuffle to prevent predictable order
  return shuffleArray(queue);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
