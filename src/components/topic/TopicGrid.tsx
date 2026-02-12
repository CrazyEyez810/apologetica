import { TopicCard } from './TopicCard';

interface TopicWithStats {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  totalCards: number;
  dueCards: number;
  newCards: number;
}

interface TopicGridProps {
  topics: TopicWithStats[];
  onTopicSelect: (topicId: string, topicName: string) => void;
  getProgress: (topicId: string) => number;
}

export function TopicGrid({ topics, onTopicSelect, getProgress }: TopicGridProps) {
  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">No topics available yet.</p>
        <p className="text-slate-500 text-sm mt-2">Add some flashcard content to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          id={topic.id}
          name={topic.name}
          icon={topic.icon}
          description={topic.description}
          totalCards={topic.totalCards}
          dueCards={topic.dueCards}
          newCards={topic.newCards}
          progress={getProgress(topic.id)}
          onClick={() => onTopicSelect(topic.id, topic.name)}
        />
      ))}
    </div>
  );
}
