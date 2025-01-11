import { create } from "zustand";

interface AppState {
  signal: number;
  triggerSignal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  signal: 0,
  triggerSignal: () => {
    set({ signal: 1 }); // Postavi signal na 1
    setTimeout(() => set({ signal: 0 }), 0); // Odmah vrati na 0
  },
}));
