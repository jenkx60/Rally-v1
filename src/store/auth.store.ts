import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';
import { USE_MOCK_DATA } from '../config/featureFlags';
import { useDataStore } from './data.store';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  userEventCount: number | null;
  checkAuth: () => Promise<void>;
  checkUserStats: () => Promise<void>;
  incrementEventCount: () => Promise<void>;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  userEventCount: null,

  checkUserStats: async () => {
    if (USE_MOCK_DATA) {
      // In mock mode, we manually manage a local count if needed, 
      // but for "new user" simulation we can start with 1 or use local storage
      const count = parseInt(sessionStorage.getItem('mock_event_count') || '0');
      set({ userEventCount: count });
      return;
    }

    try {
      const { count, error } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });
      
      if (!error) {
        set({ userEventCount: count });
      }
    } catch (error) {
      console.error('Check stats error:', error);
    }
  },

  incrementEventCount: async () => {
    if (USE_MOCK_DATA) {
      const currentCount = get().userEventCount || 0;
      const newCount = currentCount + 1;
      sessionStorage.setItem('mock_event_count', newCount.toString());
      set({ userEventCount: newCount });
      return;
    }

    try {
      const { user } = get();
      if (!user) return;

      const { error } = await supabase
        .from('events')
        .insert([{
          user_id: user.id,
          title: `Prototype Event ${Date.now()}`,
          status: 'prototype',
        }]);

      if (!error) {
        await get().checkUserStats();
      }
    } catch (error) {
      console.error('Increment event count error:', error);
    }
  },

  checkAuth: async () => {
    if (USE_MOCK_DATA) {
      const count = parseInt(sessionStorage.getItem('mock_event_count') || '0');
      // Mock authenticated user
      set({
        user: {
          id: 'mock-user-id',
          email: 'hello@rally.com',
          name: 'Rally User',
        },
        userEventCount: count,
        isLoading: false
      });
      await get().checkUserStats();
      return;
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session?.user) {
        set({
           user: {
             id: session.user.id,
             email: session.user.email!,
             name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
           },
        });
        await get().checkUserStats();
        set({ isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Check auth error:', error);
      set({ user: null, isLoading: false });
    }
  },

  login: (user) => set({ user }),

  logout: async () => {
    if (USE_MOCK_DATA) {
      sessionStorage.removeItem('mock_event_count')

      useDataStore.getState().reset();
      set({ user: null, userEventCount: 0 });
      return;
    }

    try {
      await supabase.auth.signOut();
      set({ user: null, userEventCount: 0 });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));
