import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicGrid } from '../components/topic/TopicGrid';
import { getTopicsWithStats, getDueCards } from '../db/database';
import { useStudyStore } from '../store';

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

export function HomePage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<TopicWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const startSession = useStudyStore((state) => state.startSession);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const topicsWithStats = await getTopicsWithStats();
      setTopics(topicsWithStats);
    } catch (error) {
      console.error('Failed to load topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelect = async (topicId: string, topicName: string) => {
    // Load cards for this topic
    const cards = await getDueCards(topicId);

    if (cards.length === 0) {
      // No cards due - could show a message
      alert('No cards due for this topic. Check back later!');
      return;
    }

    // Start the session
    startSession(topicId, topicName, cards);
    navigate('/study');
  };

  const getProgress = (topicId: string): number => {
    // For now, return 0 - we'll calculate this properly later
    const topic = topics.find(t => t.id === topicId);
    if (!topic || topic.totalCards === 0) return 0;

    // Progress = cards with some reviews / total cards
    // For simplicity, use (total - new) / total as rough progress
    const reviewed = topic.totalCards - topic.newCards;
    return Math.round((reviewed / topic.totalCards) * 100);
  };

  const totalDue = topics.reduce((sum, t) => sum + t.dueCards + t.newCards, 0);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 safe-area-top">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-white">Apologetica</h1>
          <p className="text-slate-400 text-sm mt-1">Catholic Apologetics Training</p>
        </div>
      </header>

      {/* Stats banner */}
      {totalDue > 0 && (
        <div className="bg-blue-500/10 border-b border-blue-500/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-lg">📚</span>
            <span className="text-blue-300 text-sm font-medium">
              {totalDue} cards ready for review
            </span>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="p-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-white mb-4">Topics</h2>
            <TopicGrid
              topics={topics}
              onTopicSelect={handleTopicSelect}
              getProgress={getProgress}
            />
          </>
        )}
      </main>

      {/* Bottom navigation placeholder */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 safe-area-bottom">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center text-blue-400">
            <span className="text-xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-slate-500">
            <span className="text-xl">📊</span>
            <span className="text-xs mt-1">Stats</span>
          </button>
          <button className="flex flex-col items-center text-slate-500">
            <span className="text-xl">⚙️</span>
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
