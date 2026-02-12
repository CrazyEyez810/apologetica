import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { StudySession } from '../components/study/StudySession';
import { useStudyStore } from '../store';

export function StudyPage() {
  const navigate = useNavigate();
  const queue = useStudyStore((state) => state.queue);

  // If no session is active, redirect to home
  useEffect(() => {
    if (queue.length === 0) {
      navigate('/');
    }
  }, [queue.length, navigate]);

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <StudySession onExit={handleExit} />
    </div>
  );
}
