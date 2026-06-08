import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';

const NameInput = lazy(() => import('./pages/NameInput'));
const Landing = lazy(() => import('./pages/Landing'));
const BestFriendLetter = lazy(() => import('./pages/BestFriendLetter'));
const QuestionsFlow = lazy(() => import('./pages/QuestionsFlow'));
const PauseScreen = lazy(() => import('./pages/PauseScreen'));
const Letter = lazy(() => import('./pages/Letter'));
const FinalScreen = lazy(() => import('./pages/FinalScreen'));

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<NameInput />} />
        <Route path="/start" element={<Landing />} />
        <Route path="/wish" element={<BestFriendLetter />} />
        <Route path="/questions" element={<QuestionsFlow />} />
        <Route path="/pause" element={<PauseScreen />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/final" element={<FinalScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
