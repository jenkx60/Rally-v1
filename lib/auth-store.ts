import { create } from 'zustand'
import { supabase } from './supabase-client'

interface User {
  id: string
  email: string
  name?: string
  avatarUrl?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => Promise<void>
  clearError: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Start true to verify auth on load
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  logout: async () => {
    try {
        await supabase.auth.signOut();
        set({ user: null, error: null });
        window.location.href = '/login';
    } catch (e) {
        console.error("Logout failed", e)
    }
  },
  clearError: () => set({ error: null }),
  checkAuth: async () => {
    try {
        set({ isLoading: true });
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          set({
            user: {
              id: user.id,
              email: user.email!,
              name: user.user_metadata.full_name || user.email!,
              avatarUrl: user.user_metadata.avatar_url || '',
            }
          });
        } else {
          set({ user: null });
        }
    } catch (error) {
        set({ user: null });
    } finally {
        set({ isLoading: false });
    }
  }
}))

