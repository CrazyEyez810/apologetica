import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { StudyPage } from './pages/StudyPage';
import { seedInitialData } from './db/seed';

function App() {
  useEffect(() => {
    // Seed initial data on first load
    seedInitialData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
