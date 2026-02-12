import type { ScriptureRef as ScriptureRefType } from '../../types';

interface ScriptureRefProps {
  refs: ScriptureRefType[];
}

export function ScriptureRef({ refs }: ScriptureRefProps) {
  if (refs.length === 0) return null;

  const formatRef = (ref: ScriptureRefType): string => {
    const verse = ref.verseEnd
      ? `${ref.verseStart}-${ref.verseEnd}`
      : `${ref.verseStart}`;
    return `${ref.book} ${ref.chapter}:${verse}`;
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {refs.map((ref, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded text-sm text-blue-300"
        >
          <span className="text-xs">📖</span>
          {formatRef(ref)}
        </span>
      ))}
    </div>
  );
}
