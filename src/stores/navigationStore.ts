import { create } from 'zustand';

interface NavigationState {
  isOpen: boolean;
  currentSection: string;
  setIsOpen: (isOpen: boolean) => void;
  setCurrentSection: (section: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isOpen: false,
  currentSection: 'dashboard',
  setIsOpen: (isOpen) => set({ isOpen }),
  setCurrentSection: (currentSection) => set({ currentSection })
}));