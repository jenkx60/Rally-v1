import { PayoutData } from '../types';
import image1 from '@/public/Sidebar/people-happy.webp';
import image2 from '@/public/Sidebar/link-up.webp';
import image3 from '@/public/Sidebar/sunday-ill.webp';
import image4 from '@/public/Sidebar/sip-ill.webp';

export const PAYOUTS: PayoutData[] = [
  {
    id: 1,
    eventName: 'Saints pop-up',
    date: 'October 12, 2025',
    ticketSold: 24,
    amount: '₦140,000',
    status: 'Paid',
    image: image1,
  },
  {
    id: 2,
    eventName: 'The link up',
    date: 'November 21, 2025',
    ticketSold: 24,
    amount: '₦300,000',
    status: 'Paid',
    image: image2,
  },
  {
    id: 3,
    eventName: 'Potluck & chill',
    date: 'October 12, 2025',
    ticketSold: 24,
    amount: '₦100,000',
    status: 'Pending',
    image: image3,
  },
  {
    id: 4,
    eventName: 'Sip & yap',
    date: 'October 12, 2025',
    ticketSold: 24,
    amount: '₦50,000',
    status: 'Pending',
    image: image4,
  },
];

const mockPayouts: PayoutData[] = [
  { id: 5, eventName: 'Saints pop-up', date: 'October 12, 2025', ticketSold: 24, amount: '₦140,000', status: 'Paid' as const, image: image1 },
  { id: 6, eventName: 'The link up', date: 'November 21, 2025', ticketSold: 24, amount: '₦300,000', status: 'Paid' as const, image: image2 },
  { id: 7, eventName: 'Potluck & chill', date: 'October 12, 2025', ticketSold: 24, amount: '₦100,000', status: 'Pending' as const, image: image3 },
  { id: 8, eventName: 'Sip & yap', date: 'December 12, 2025', ticketSold: 24, amount: '₦150,000', status: 'Pending' as const, image: image4 },
  { id: 9, eventName: 'Saints pop-up', date: 'October 12, 2025', ticketSold: 24, amount: '₦140,000', status: 'Paid' as const, image: image1 },
  { id: 10, eventName: 'The link up', date: 'November 21, 2025', ticketSold: 24, amount: '₦300,000', status: 'Paid' as const, image: image2 },
  { id: 11, eventName: 'Potluck & chill', date: 'October 12, 2025', ticketSold: 24, amount: '₦100,000', status: 'Pending' as const, image: image3 },
  { id: 12, eventName: 'Sip & yap', date: 'October 12, 2025', ticketSold: 24, amount: '₦500,000', status: 'Pending' as const, image: image4 },
];
