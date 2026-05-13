import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import SquadBuilder from './pages/SquadBuilder';
import RivalsLobby from './pages/RivalsLobby';
import Matchup from './pages/Matchup';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Coach from './pages/Coach';
import { useGame } from './lib/store';

export default function App() {
  const onboarded = useGame((s) => s.onboarded);
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<Layout />}>
        <Route
          index
          element={
            <Navigate to={onboarded ? '/squad' : '/onboarding'} replace />
          }
        />
        <Route path="/squad" element={<SquadBuilder />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/rivals" element={<RivalsLobby />} />
        <Route path="/matchup" element={<Matchup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/squad" replace />} />
    </Routes>
  );
}
