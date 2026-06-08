import { Navigate, Route, Routes } from 'react-router-dom';
import NameInput from './pages/NameInput';
import Landing from './pages/Landing';
import QuestionsFlow from './pages/QuestionsFlow';
import PauseScreen from './pages/PauseScreen';
import Letter from './pages/Letter';
import NicknameReveal from './pages/NicknameReveal';
import AppShell from './components/AppShell';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<NameInput />} />
        <Route path="/start" element={<Landing />} />
        <Route path="/questions" element={<QuestionsFlow />} />
        <Route path="/pause" element={<PauseScreen />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/final" element={<NicknameReveal />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
