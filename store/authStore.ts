import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  checkAuth: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (session?.user) {
        set({
           user: {
             id: session.user.id,
             email: session.user.email!,
             name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
           },
           isLoading: false
        });
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
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));
