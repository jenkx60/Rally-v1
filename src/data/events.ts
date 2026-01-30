import { EventData } from '../types';
import image1 from '@/public/Sidebar/people-happy.webp';
import image2 from '@/public/Sidebar/link-up.webp';
import image3 from '@/public/Sidebar/sunday-ill.webp';
import image4 from '@/public/Sidebar/sip-ill.webp';

export const EVENTS: EventData[] = [
  {
    id: 'saints-popup',
    title: 'Saints pop-up',
    dateRange: 'Today • 6:00 PM - 11:00 PM',
    location: 'Shore mall, Osapa',
    attendees: 5,
    status: 'Live',
    imageSrc: image1,
  },
  {
    id: 'the-link-up',
    title: 'The link up',
    dateRange: 'Fri, Nov 21 • 5:30 PM - 10:30 PM',
    location: 'The Garden, Ikoyi',
    attendees: 9,
    status: 'Upcoming',
    imageSrc: image2,
  },
  {
    id: 'sunday-brunch',
    title: 'Potluck & chill',
    dateRange: 'Sat, Oct 12 • 1:30 PM - 4:30 PM',
    location: 'Lekki phase 1, Lekki',
    attendees: 6,
    status: 'Upcoming',
    imageSrc: image3,
  },
  {
    id: 'sip-yap',
    title: 'Sip & yap',
    dateRange: 'Sat, Oct 12 • 1:30 PM - 4:30 PM',
    location: 'Lekki phase 1, Lekki',
    attendees: 4,
    status: 'Past',
    imageSrc: image4,
  },
];
