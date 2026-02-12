import { useEffect, useCallback } from 'react';
import { useStudyStore } from '../../store';
import { FlashcardView } from '../flashcard/FlashcardView';
import { RatingButtons } from '../flashcard/RatingButtons';
import { SessionComplete } from './SessionComplete';
import { processReview } from '../../lib/scheduler';
import { previewIntervals } from '../../lib/sm2';
import type { RatingButton } from '../../types';

interface StudySessionProps {
  onExit: () => void;
}

export function StudySession({ onExit }: StudySessionProps) {
  const {
    topicName,
    queue,
    currentIndex,
    isFlipped,
    sessionStats,
    flipCard,
    rateCard,
    nextCard,
    endSession,
    isSessionComplete,
    getCurrentCard,
  } = useStudyStore();

  const currentCard = getCurrentCard();
  const progress = queue.length > 0 ? ((currentIndex + 1) / queue.length) * 100 : 0;

  // Handle rating
  const handleRate = useCallback(async (rating: RatingButton) => {
    if (!currentCard) return;

    // Update database
    await processReview(currentCard.id, rating);

    // Update session stats
    rateCard(rating);

    // Move to next card after a brief delay
    setTimeout(() => {
      nextCard();
    }, 150);
  }, [currentCard, rateCard, nextCard]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFlipped) {
        // Spacebar or Enter to flip
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          flipCard();
        }
      } else {
        // Number keys for rating
        const keyMap: Record<string, RatingButton> = {
          '1': 'again',
          '2': 'hard',
          '3': 'good',
          '4': 'easy',
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          handleRate(keyMap[e.key]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, flipCard, handleRate]);

  // Handle exit
  const handleExit = () => {
    endSession();
    onExit();
  };

  // Show completion screen
  if (isSessionComplete()) {
    return <SessionComplete stats={sessionStats} onFinish={handleExit} />;
  }

  // No cards available
  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="text-6xl mb-6">📚</div>
        <h2 className="text-2xl font-bold text-white mb-2">No Cards Due</h2>
        <p className="text-slate-400 mb-8">You've reviewed all available cards. Check back later!</p>
        <button
          onClick={handleExit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          Back to Topics
        </button>
      </div>
    );
  }

  // Get interval previews
  const intervals = previewIntervals(null); // TODO: pass actual state

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <button
          onClick={handleExit}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← Exit
        </button>
        <div className="text-center">
          <div className="text-sm font-medium text-white">{topicName}</div>
          <div className="text-xs text-slate-500">
            {currentIndex + 1} / {queue.length}
          </div>
        </div>
        <div className="w-12"></div> {/* Spacer for alignment */}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-700">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card area */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        <FlashcardView
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={flipCard}
        />
      </div>

      {/* Rating buttons (only show when flipped) */}
      <div className={`p-4 safe-area-bottom transition-opacity duration-200 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <RatingButtons
          onRate={handleRate}
          intervals={intervals}
          disabled={!isFlipped}
        />
      </div>
    </div>
  );
}
