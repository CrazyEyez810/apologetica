type Technique = 'boomerang' | 'reroute' | 'principle' | 'bridge';

interface TechniqueTagProps {
  technique: Technique;
}

const techniqueConfig: Record<Technique, { label: string; color: string; icon: string; description: string }> = {
  boomerang: {
    label: 'Boomerang',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: '🔁',
    description: 'Use their own chapter against them'
  },
  reroute: {
    label: 'Reroute',
    color: 'bg-green-500/20 text-green-300 border-green-500/30',
    icon: '↪️',
    description: 'Point to another Scripture'
  },
  principle: {
    label: 'Principle',
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    icon: '💡',
    description: 'Derive from biblical principles'
  },
  bridge: {
    label: 'Bridge',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    icon: '🌉',
    description: 'Build a logical chain'
  }
};

export function TechniqueTag({ technique }: TechniqueTagProps) {
  const config = techniqueConfig[technique];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.color}`}
      title={config.description}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
}
