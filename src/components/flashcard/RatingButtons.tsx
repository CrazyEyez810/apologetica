import type { RatingButton } from '../../types';

interface RatingButtonsProps {
  onRate: (rating: RatingButton) => void;
  intervals: Record<RatingButton, string>;
  disabled?: boolean;
}

export function RatingButtons({ onRate, intervals, disabled }: RatingButtonsProps) {
  const buttons: { rating: RatingButton; label: string; className: string; key: string }[] = [
    {
      rating: 'again',
      label: 'Again',
      className: 'btn-again',
      key: '1',
    },
    {
      rating: 'hard',
      label: 'Hard',
      className: 'btn-hard',
      key: '2',
    },
    {
      rating: 'good',
      label: 'Good',
      className: 'btn-good',
      key: '3',
    },
    {
      rating: 'easy',
      label: 'Easy',
      className: 'btn-easy',
      key: '4',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {buttons.map(({ rating, label, className, key }) => (
        <button
          key={rating}
          onClick={() => onRate(rating)}
          disabled={disabled}
          className={`${className} py-3 px-2 rounded-xl text-white font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1`}
        >
          <span className="text-sm">{label}</span>
          <span className="text-xs opacity-80">{intervals[rating]}</span>
          <span className="text-[10px] opacity-60 hidden sm:block">({key})</span>
        </button>
      ))}
    </div>
  );
}
