interface SessionCompleteProps {
  stats: {
    total: number;
    again: number;
    hard: number;
    good: number;
    easy: number;
    startTime: number;
  };
  onFinish: () => void;
}

export function SessionComplete({ stats, onFinish }: SessionCompleteProps) {
  const duration = Math.round((Date.now() - stats.startTime) / 1000 / 60);
  const reviewed = stats.again + stats.hard + stats.good + stats.easy;
  const accuracy = reviewed > 0
    ? Math.round(((stats.good + stats.easy) / reviewed) * 100)
    : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      {/* Success icon */}
      <div className="text-6xl mb-6">🎉</div>

      <h2 className="text-2xl font-bold text-white mb-2">Session Complete!</h2>
      <p className="text-slate-400 mb-8">Great work defending the faith.</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-white">{reviewed}</div>
          <div className="text-sm text-slate-400">Cards Reviewed</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-white">{accuracy}%</div>
          <div className="text-sm text-slate-400">Accuracy</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-white">{duration}m</div>
          <div className="text-sm text-slate-400">Duration</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-green-400">{stats.good + stats.easy}</div>
          <div className="text-sm text-slate-400">Correct</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="w-full max-w-sm mb-8">
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            Again: {stats.again}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            Hard: {stats.hard}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Good: {stats.good}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Easy: {stats.easy}
          </span>
        </div>
      </div>

      {/* Finish button */}
      <button
        onClick={onFinish}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
      >
        Back to Topics
      </button>
    </div>
  );
}
