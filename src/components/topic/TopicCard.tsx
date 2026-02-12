import { ProgressRing } from '../common/ProgressRing';

interface TopicCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  totalCards: number;
  dueCards: number;
  newCards: number;
  progress: number;
  onClick: () => void;
}

export function TopicCard({
  name,
  icon,
  description,
  totalCards,
  dueCards,
  newCards,
  progress,
  onClick,
}: TopicCardProps) {
  const hasDueCards = dueCards > 0 || newCards > 0;

  return (
    <button
      onClick={onClick}
      className="relative w-full bg-slate-800 rounded-2xl p-5 text-left transition-all active:scale-[0.98] hover:bg-slate-750 border border-slate-700 hover:border-slate-600"
    >
      {/* Due indicator */}
      {hasDueCards && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
          {dueCards + newCards}
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-4xl">{icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{description}</p>

          {/* Stats row */}
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
            <span>{totalCards} cards</span>
            {newCards > 0 && (
              <span className="text-blue-400">{newCards} new</span>
            )}
            {dueCards > 0 && (
              <span className="text-orange-400">{dueCards} due</span>
            )}
          </div>
        </div>

        {/* Progress ring */}
        <ProgressRing progress={progress} size={56} strokeWidth={4} />
      </div>
    </button>
  );
}
