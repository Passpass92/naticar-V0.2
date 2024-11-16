import { create } from 'zustand';
import { UserProfile } from '../types';
import { userService } from '../services/userService';

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  period: 'prenatal' | 'postnatal';
  setProfile: (profile: UserProfile) => void;
  loadProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<UserProfile>) => Promise<void>;
  setPeriod: (period: 'prenatal' | 'postnatal') => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  period: 'prenatal',
  setProfile: (profile) => set({ profile }),
  loadProfile: async (userId) => {
    set({ loading: true, error: null });
    try {
      const profile = await userService.getProfile(userId);
      set({ profile, loading: false });
    } catch (error) {
      set({ error: 'Failed to load profile', loading: false });
    }
  },
  updateProfile: async (userId, updates) => {
    set({ loading: true, error: null });
    try {
      await userService.updateProfile(userId, updates);
      const updatedProfile = await userService.getProfile(userId);
      set({ profile: updatedProfile, loading: false });
    } catch (error) {
      set({ error: 'Failed to update profile', loading: false });
    }
  },
  setPeriod: (period) => set({ period })
}));