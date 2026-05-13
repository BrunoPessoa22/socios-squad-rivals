import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { assistants, type Assistant } from '../data/mock';

type GameStore = {
  assistantId: string;
  userName: string;
  homeClub: string;
  onboarded: boolean;
  setAssistant: (id: string) => void;
  setUserName: (n: string) => void;
  setHomeClub: (c: string) => void;
  completeOnboarding: () => void;
  reset: () => void;
};

export const useGame = create<GameStore>()(
  persist(
    (set) => ({
      assistantId: 'andrea',
      userName: '',
      homeClub: 'PSG',
      onboarded: false,
      setAssistant: (id) => set({ assistantId: id }),
      setUserName: (n) => set({ userName: n.trim() }),
      setHomeClub: (c) => set({ homeClub: c }),
      completeOnboarding: () => set({ onboarded: true }),
      reset: () =>
        set({
          assistantId: 'andrea',
          userName: '',
          homeClub: 'PSG',
          onboarded: false,
        }),
    }),
    { name: 'squad-rivals-state' },
  ),
);

export function useAssistant(): Assistant {
  const id = useGame((s) => s.assistantId);
  return assistants.find((a) => a.id === id) ?? assistants[0];
}
