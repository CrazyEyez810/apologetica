import type { Card } from '../../types';
import { ScriptureRef } from './ScriptureRef';
import { TechniqueTag } from './TechniqueTag';

interface FlashcardViewProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashcardView({ card, isFlipped, onFlip }: FlashcardViewProps) {
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-300',
    intermediate: 'bg-yellow-500/20 text-yellow-300',
    advanced: 'bg-red-500/20 text-red-300',
  };

  return (
    <div
      className="flip-card w-full h-[400px] cursor-pointer"
      onClick={onFlip}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* FRONT - The Objection */}
        <div className="flip-card-front bg-slate-800 border border-slate-700 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-500 uppercase tracking-wide">
              Objection
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${difficultyColors[card.difficulty]}`}>
              {card.difficulty}
            </span>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xl text-white leading-relaxed">
              "{card.front.primary}"
            </p>

            {/* Scripture references */}
            <ScriptureRef refs={card.front.scriptureRefs} />

            {/* Notes */}
            {card.front.notes && (
              <p className="text-sm text-slate-400 mt-4 italic">
                {card.front.notes}
              </p>
            )}
          </div>

          {/* Tap hint */}
          <div className="text-center text-slate-500 text-sm mt-4">
            Tap to reveal response
          </div>
        </div>

        {/* BACK - The Response */}
        <div className="flip-card-back bg-slate-800 border border-slate-700 p-6 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-500 uppercase tracking-wide">
              Response
            </span>
            {card.back.technique && (
              <TechniqueTag technique={card.back.technique} />
            )}
          </div>

          {/* Main content */}
          <div className="flex-1">
            <p className="text-lg text-white leading-relaxed whitespace-pre-line">
              {card.back.primary}
            </p>

            {/* Scripture references */}
            <ScriptureRef refs={card.back.scriptureRefs} />

            {/* Notes */}
            {card.back.notes && (
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-blue-300">Key: </span>
                  {card.back.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
