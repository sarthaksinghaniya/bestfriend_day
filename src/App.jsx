import { Navigate, Route, Routes } from 'react-router-dom';
import NameInput from './pages/NameInput';
import Landing from './pages/Landing';
import BestFriendLetter from './pages/BestFriendLetter';
import QuestionsFlow from './pages/QuestionsFlow';
import PauseScreen from './pages/PauseScreen';
import Letter from './pages/Letter';
import FinalScreen from './pages/FinalScreen';
import AppShell from './components/AppShell';

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
