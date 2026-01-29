import { create } from 'zustand';
import { USE_MOCK_DATA } from '../config/featureFlags';
import { EVENTS } from '../data/events';
import { ATTENDEES } from '../data/attendees';
import { PAYOUTS } from '../data/payouts';
import { EventData, AttendeeData, PayoutData } from '../types';
import { supabase } from '@/lib/supabase-client';

interface DataState {
  events: EventData[];
  attendees: AttendeeData[];
  payouts: PayoutData[];
  isLoading: boolean;
  
  // Actions
  fetchData: () => Promise<void>;
  addEvent: (event: Partial<EventData>) => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
  events: [],
  attendees: [],
  payouts: [],
  isLoading: true,

  fetchData: async () => {
    set({ isLoading: true });

    if (USE_MOCK_DATA) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({
        events: EVENTS,
        attendees: ATTENDEES,
        payouts: PAYOUTS,
        isLoading: false,
      });
      return;
    }

    // Real Supabase implementation would go here
    try {
      // For now, we keep Supabase logic as placeholder or basic implementation
      // as the goal is "Mock-Data First"
      // In production, we'd fetch from multiple tables
      set({ 
        events: [], 
        attendees: [], 
        payouts: [], 
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ isLoading: false });
    }
  },

  addEvent: async (eventData) => {
    if (USE_MOCK_DATA) {
      const newEvent: EventData = {
        id: Math.random().toString(36).substr(2, 9),
        title: eventData.title || 'Untitled Event',
        dateRange: eventData.dateRange || 'TBD',
        location: eventData.location || 'TBD',
        attendees: 0,
        status: 'Upcoming',
        imageSrc: eventData.imageSrc || EVENTS[0].imageSrc,
      };
      
      set((state) => ({
        events: [newEvent, ...state.events]
      }));
      return;
    }

    // Supabase logic (commented/gated)
    /*
    try {
      const { error } = await supabase.from('events').insert([eventData]);
      if (!error) await get().fetchData();
    } catch (err) {
      console.error(err);
    }
    */
  },
}));
