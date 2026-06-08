import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import NameInput from './pages/NameInput';
import Letter from './pages/Letter';
import NicknameReveal from './pages/NicknameReveal';
import AppShell from './components/AppShell';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Landing />} />
        <Route path="/name-input" element={<NameInput />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/nickname-reveal" element={<NicknameReveal />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
