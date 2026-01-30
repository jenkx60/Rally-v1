import { AttendeeData } from '../types';
import avatard from '@/public/Sidebar/avatar.svg';
import avatarkill from '@/public/Sidebar/avatar-kill.svg';
import avatarman from '@/public/Sidebar/avatar-man.svg';
import avatarglass from '@/public/Sidebar/avatar-glass.svg';
import avatarhat from '@/public/Sidebar/avatar-hat.svg';
import avatarwomanbun from '@/public/Sidebar/avatar-womanbun.svg';
import avatarstrip from '@/public/Sidebar/avatar-strip.svg';
import avatereyes from '@/public/Sidebar/avatar-3eyes.svg';
import avatarmanbun from '@/public/Sidebar/avatar-manbun.svg';

export const ATTENDEES: AttendeeData[] = [
  { id: 1, name: 'Divii', email: 'divii@example.com', ticketType: 'Regular', price: 'Free', joined: 'Jan 8, 2026', avatar: avatard, eventName: 'Saints pop-up' },
  { id: 2, name: 'Jessica Smith', email: 'jessica@example.com', ticketType: 'VIP', price: '₦16,000', joined: 'Jan 4, 2026', avatar: avatarkill, eventName: 'Games night' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', ticketType: 'VIP', price: '₦6,000', joined: 'Jan 2, 2026', avatar: avatarhat, eventName: 'Taco tuesdayy' },
  { id: 4, name: 'Jenkx', email: 'jenkx@example.com', ticketType: 'VIP', price: '₦6,000', joined: 'Jan 3, 2026', avatar: avatarmanbun, eventName: 'Potluck & chill' },
  { id: 5, name: 'Uchy', email: 'u.kimberly@example.com', ticketType: 'VIP', price: '₦16,000', joined: 'Jan 3, 2026', avatar: avatarkill, eventName: 'Saints pop-up' },
  { id: 6, name: 'Nneoms', email: 'n.annette@rocketmail..com', ticketType: 'VIP', price: '₦30,000', joined: 'Dec 3, 2026', avatar: avatarwomanbun, eventName: 'Games night' },
  { id: 7, name: 'Nkem', email: 'realsaints@gmail.com', ticketType: 'VIP', price: '₦1,000', joined: 'Jan 12, 2026', avatar: avatarstrip, eventName: 'Taco tuesdayy' },
  { id: 8, name: 'Mike Johnson', email: 'mike@example.com', ticketType: 'VIP', price: '₦6,000', joined: 'Jan 2, 2026', avatar: avatarhat, eventName: 'Taco tuesdayy' },
  { id: 9, name: 'Jessica Smith', email: 'jessica@example.com', ticketType: 'Regular', price: 'Free', joined: 'Jan 11, 2026', avatar: avatereyes, eventName: 'Saints pop-up' },
  { id: 10, name: 'Mike Johnson', email: 'mike@example.com', ticketType: 'VIP', price: '₦6,000', joined: 'Jan 19, 2026', avatar: avatarhat, eventName: 'The link up' },
  { id: 11, name: 'Uchy', email: 'u.kimberly@example.com', ticketType: 'Regular', price: 'Free', joined: 'Jan 1, 2026', avatar: avatarglass, eventName: 'Sip & yap' },
  { id: 12, name: 'Mike Johnson', email: 'mike@example.com', ticketType: 'VIP', price: '₦6,000', joined: 'Jan 2, 2026', avatar: avatarhat, eventName: 'Taco tuesdayy' },
];
