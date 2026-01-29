import { StaticImageData } from 'next/image';

// Event Types
export interface EventData {
  id: string;
  title: string;
  dateRange: string;
  location: string;
  attendees: number;
  status: 'Live' | 'Upcoming' | 'Past' | 'prototype';
  imageSrc: StaticImageData;
}

// Attendee Types
export interface AttendeeData {
  id: number;
  name: string;
  email: string;
  ticketType: string;
  price: string;
  joined: string;
  avatar: StaticImageData;
  eventName: string;
}

// Payout Types
export interface PayoutData {
  id: number;
  eventName: string;
  date: string;
  ticketSold: number;
  amount: string;
  status: 'Paid' | 'Pending';
  image: StaticImageData;
}

// Filter Types
export type FilterState = {
  date: 'All' | 'Today' | 'This week' | 'This month';
  locationType: 'All' | 'Physical' | 'Virtual';
  freeEventsOnly: boolean;
};
