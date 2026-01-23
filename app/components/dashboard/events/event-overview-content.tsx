// import React from 'react';
// import Link from 'next/link';
// import Image, { StaticImageData } from 'next/image';
// import { ArrowLeft, Calendar, Edit2, LinkIcon, MapPin, Share2, Ticket } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/app/components/ui/button';
// import { Badge } from '@/app/components/ui/badge'; 
// import sharePlane from '@/public/Sidebar/paper-plane.svg'; 
// import revenueIcon from '@/public/Sidebar/revenue-icon.svg'; 
// import spotsIcon from '@/public/Sidebar/coupon_fill.svg'; 
// import rsvpsIcon from '@/public/Sidebar/group_3_fill.svg'; 
// import illustrationUser from '@/public/Sidebar/avatar.svg';
// import shareQuick from '@/public/Sidebar/forward-quick.svg';
// import editQuick from '@/public/Sidebar/edit-quick.svg';
// import attend from '@/public/Sidebar/attend-man.svg';
// import check from '@/public/Sidebar/check.svg';

// // --- Mock Data Structure ---
// interface EventData {
//     title: string;
//     date: string;
//     location: string;
//     price: number;
//     currency: string;
//     rsvps: number;
//     rsvpsToday: number;
//     spotsFilled: number;
//     spotLimit: number;
//     revenue: number;
//     revenueChange: number;
//     attendees: { id: number; avatar: string }[];
//     recentActivity: { id: number; text: string; time: string; type: 'join' | 'update' | 'confirm' }[];
//     // eventSlug is passed via URL params
// }

// // Mock Data for "Saints pop-up"
// const mockEventData: EventData = {
//     title: "Saints pop-up",
//     date: "Saturday, October 12 • 3:00 PM",
//     location: "205 Apartments Rooftop, Lekki",
//     price: 5000,
//     currency: '₦',
//     rsvps: 24,
//     rsvpsToday: 3,
//     spotsFilled: 18,
//     spotLimit: 50,
//     revenue: 240000,
//     revenueChange: 40,
//     attendees: Array(8).fill(0).map((_, i) => ({ id: i, avatar: illustrationUser.src })),
//     recentActivity: [
//         { id: 1, text: "3 new attendees joined", time: "Just now", type: 'join' },
//         { id: 2, text: "Divil confirmed attendance", time: "5 mins ago", type: 'confirm' },
//         { id: 3, text: "Event details updated", time: "8 mins ago", type: 'update' },
//     ]
// };

// // --- Component: Metric Card ---
// interface MetricCardProps {
//     title: string;
//     value: React.ReactNode;
//     subtitle: React.ReactNode;
//     icon: StaticImageData;
//     iconBgColor: string;
// }

// const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, iconBgColor }) => (
//     <div className="flex flex-col gap-6 md:gap-8 p-5 md:p-6 border border-[#0000000D] rounded-xl bg-white">
//         <div className={cn("flex items-center justify-center h-12 w-12 rounded-lg", iconBgColor)}>
//             <Image src={icon} alt={`${title} Icon`} width={24} height={24} />
//         </div>
//         <div className='flex flex-col gap-0.5'>
//             <h3 className="font-geist text-sm font-normal text-[#A3A3A3]">{title}</h3>
//             <div className='flex items-center gap-2'>
//                 <h1 className="font-bricolage text-[28px] font-bold leading-[120%] tracking-[-0.6px] text-[#1A1A1A] flex items-end">{value}</h1>
//                 <span className="border border-[#0000000D] rounded-lg px-2 py-0.5 font-geist text-sm font-medium text-[#00A36A]">
//                     {subtitle}
//                 </span>
//             </div>
//         </div>
//     </div>
// );

// // --- Component: Activity Item ---
// interface ActivityItemProps {
//     text: string;
//     time: string;
//     type: 'join' | 'update' | 'confirm';
// }

// const ActivityItem: React.FC<ActivityItemProps> = ({ text, time, type }) => {
//     let iconClass = '';
//     let imageSrc = null;
    
//     // Customize styles based on activity type (Mocking the icons from the image)
//     switch (type) {
//         case 'join':
//             iconClass = 'bg-[#FFEDED] text-[#F7931E]';
//             imageSrc = attend
//             break;
//         case 'confirm':
//             iconClass = 'bg-[#E3FFF5] text-[#00A36A]'; 
//             imageSrc = check
//             break;
//         case 'update':
//             iconClass = 'bg-[#F2F4F7] text-[#525252]'; 
//             imageSrc = editQuick
//             break;
//     }

//     return (
//         <div className="flex gap-4 py-2 font-geist">
//             <div className={cn("rounded-lg mt-1 ", iconClass)}>
//                 {imageSrc && (
//                     <Image 
//                         src={imageSrc}
//                         alt={type}
//                         width={32}
//                         height={32}
//                         className='object-contain'
//                     />
//                 )}
//             </div>
//             <div className="flex items-center  text-[15px] font-normal leading-[150%] tracking-[-0.2px]">
//                 <p className="text-[#333333] pr-1">{text}</p>
//                 <span className="text-[#A3A3A3]">• {time}</span>
//             </div>
//         </div>
//     );
// }

// // --- Component: Attendees Stack (Reused from EventCard logic) ---
// const AttendeesStack: React.FC<{ count: number; attendees: EventData['attendees'] }> = ({ count, attendees }) => {
//     const displayAttendees = attendees.slice(0, 4);
//     const remainingCount = count > 4 ? `+${count - 4}` : null;

//     return (
//         <div className="flex flex-col ">
//             <div className="flex items-center">
//                 {displayAttendees.map((att, index) => (
//                     <div 
//                         key={att.id}
//                         className={cn(
//                             "h-10 w-10 rounded-full border-2 border-white overflow-hidden",
//                             index > 0 && "-ml-2"
//                         )}
//                         style={{ zIndex: displayAttendees.length - index }}
//                     >
//                         <Image 
//                             src={illustrationUser} // Using the mock avatar for visual consistency
//                             alt={`Attendee ${index + 1}`} 
//                             width={40} 
//                             height={40} 
//                             className="object-cover"
//                         />
//                     </div>
//                 ))}
//                 {remainingCount && (
//                     <div 
//                         className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-[#F7F7F7] text-sm font-medium text-[#959595] -ml-2"
//                         style={{ zIndex: 0 }}
//                     >
//                         {remainingCount}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// // --- Main Page Component ---
// const EventOverviewContent = () => {
//     const event = mockEventData; // Load data for the current eventSlug

//     return (
//         <div className="">
//             {/* --- Management Grid --- */}
//             <div className="grid grid-cols-12 gap-12">

//                 {/* Left Column (9/12 width) */}
//                 <div className="col-span-8 lg:col-span-12 space-y-6">
                    
//                     {/* 1. Metric Cards */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <MetricCard
//                             title="RSVPs"
//                             value={event.rsvps}
//                             subtitle={`↑ +${event.rsvpsToday} today`}
//                             icon={rsvpsIcon}
//                             iconBgColor="bg-[#FFEFE3]" // Light orange/peach
//                         />
//                         <MetricCard
//                             title="Spots left"
//                             value={event.spotLimit - event.spotsFilled}
//                             subtitle={`${event.spotsFilled}/${event.spotLimit} filled`}
//                             icon={spotsIcon}
//                             iconBgColor="bg-[#F0F5FF]" // Light blue
//                         />
//                         <MetricCard
//                             title="Revenue"
//                             value={`${event.currency}${event.revenue.toLocaleString()}`}
//                             subtitle={`↑ ${event.revenueChange}%`}
//                             icon={revenueIcon}
//                             iconBgColor="bg-[#E3FFF5]" // Light green
//                         />
//                     </div>

//                     <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
//                         {/* 2. Event Details */}
//                         <div className='col-span-8 space-y-2'>
//                             <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Event details</h2>
//                             <div className="flex items-center text-left px-6 py-4 border border-[#F5F5F5] rounded-xl bg-white space-y-6 min-h-[184px]">
//                                 <div className="space-y-6 font-geist text-base text-[#767676]">
//                                     <div className="flex items-center gap-2">
//                                         <div className='bg-[#F7F7F7] w-8 h-8 flex justify-center items-center rounded-[6px]'>
//                                             <Calendar className="w-4 h-4 text-[#A3A3A3] shrink-0" />
//                                         </div>
//                                         <span className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.2px]'>{event.date}</span>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <div className='bg-[#F7F7F7] w-8 h-8 flex justify-center items-center rounded-[6px]'>
//                                             <MapPin className="w-5 h-5 text-[#A3A3A3] shrink-0" />
//                                         </div>
//                                         <span className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.2px]'>{event.location}</span>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <div className='bg-[#F7F7F7] w-8 h-8 flex justify-center items-center rounded-[6px]'>
//                                             <Ticket className='w-5 h-5 text-[#A3A3A3]' />
//                                         </div>
//                                         <span className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.2px]'>Paid event • {event.currency}{event.price.toLocaleString()}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>                       

//                         {/* 3. Quick Actions */}
//                         <div className='col-span-4 space-y-2'>
//                             <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Quick actions</h2>
//                             <div className="px-6 py-4 border border-[#F5F5F5] rounded-xl bg-white space-y-2 min-h-[184px]">
//                                 {/* Share Event */}
//                                 <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F9F9F9] cursor-pointer text-[#767676]">
//                                     <Image src={shareQuick} alt='Share Quick' width={32} height={32} />
//                                     <span className="font-geist text-sm font-medium">Share event</span>
//                                 </div>
                                
//                                 {/* Edit Event */}
//                                 <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F9F9F9] cursor-pointer text-[#767676]">
//                                     <Image src={editQuick} alt='Edit Quick' width={32} height={32} />
//                                     <span className="font-geist text-sm font-medium">Edit event</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//                         {/* 4. Recent Activity */}
//                         <div className='col-span-8 space-y-2'>
//                             <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Recent activity</h2>
//                             <div className="p-6 border border-[#F5F5F5] rounded-xl bg-white">
//                                 <div className="space-y-2">
//                                     {event.recentActivity.map(activity => (
//                                         <ActivityItem key={activity.id} {...activity} />
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
                        
//                         {/* 5. Attendees Summary */}
//                         <div className='col-span-4 space-y-2'>
//                             <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Attendees</h2>
//                             <div className="p-6 border border-[#0000000D] rounded-xl bg-white min-h-[184px] flex flex-col justify-between">
//                                 <AttendeesStack count={event.rsvps} attendees={event.attendees} />
//                                 <div>
//                                     <Button className="w-full bg-white border border-[#6A59CE] text-[#6A59CE] font-geist font-semibold py-3 px-6 text-[15px] leading-[135%] tracking-[-0.2px]">
//                                         View all attendees
//                                     </Button>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 {/* Right Column (3/12 width) */}
//             </div>
//         </div>
//     );
// }

// export default EventOverviewContent;

"use client";
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { ArrowLeft, Calendar, Edit2, LinkIcon, MapPin, Share2, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge'; 
import sharePlane from '@/public/Sidebar/paper-plane.svg'; 
import revenueIcon from '@/public/Sidebar/revenue-icon.svg'; 
import spotsIcon from '@/public/Sidebar/coupon_fill.svg'; 
import rsvpsIcon from '@/public/Sidebar/group_3_fill.svg'; 
import avatar from '@/public/Sidebar/avatar.svg';
import shareQuick from '@/public/Sidebar/forward-quick.svg';
import editQuick from '@/public/Sidebar/edit-quick.svg';
import attend from '@/public/Sidebar/attend-man.svg';
import check from '@/public/Sidebar/check.svg';
import avatar2 from "@/public/Sidebar/avatar-man.svg";
import avatar3 from "@/public/Sidebar/avatar-glass.svg";
import avatar4 from "@/public/Sidebar/avatar-kill.svg";
import avatar5 from "@/public/Sidebar/avatar-3eyes.svg";
import ShareEventDialog from './share-event-dialog';

// --- Mock Data Structure ---
interface EventData {
    title: string;
    date: string;
    location: string;
    price: number;
    currency: string;
    rsvps: number;
    rsvpsToday: number;
    spotsFilled: number;
    spotLimit: number;
    revenue: number;
    revenueChange: number;
    attendees: { id: number; avatar: string }[];
    recentActivity: { id: number; text: string; time: string; type: 'join' | 'update' | 'confirm' }[];
    // eventSlug is passed via URL params
}

// Mock Data for "Saints pop-up"
const mockEventData: EventData = {
    title: "Saints pop-up",
    date: "Saturday, October 12 • 3:00 PM",
    location: "205 Apartments Rooftop, Lekki",
    price: 5000,
    currency: '₦',
    rsvps: 24,
    rsvpsToday: 3,
    spotsFilled: 18,
    spotLimit: 50,
    revenue: 240000,
    revenueChange: 40,
    attendees: Array(8).fill(0).map((_, i) => ({ id: i, avatar: avatar.src })),
    recentActivity: [
        { id: 1, text: "3 new attendees joined", time: "Just now", type: 'join' },
        { id: 2, text: "Divil confirmed attendance", time: "5 mins ago", type: 'confirm' },
        { id: 3, text: "Event details updated", time: "8 mins ago", type: 'update' },
    ]
};

interface EventOverviewContentProps {
    onViewAttendees: () => void;
}


// --- Metrics, Activity, and Attendees code stays exactly the same as your structure ---


// --- Component: Metric Card ---
interface MetricCardProps {
    title: string;
    value: React.ReactNode;
    subtitle: React.ReactNode;
    icon: StaticImageData;
    iconBgColor: string;
    // metricType: 'rsvps' | 'spots' | 'revenue';
    metricTextColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, iconBgColor, metricTextColor }) => (
    <div className="flex flex-col gap-6 md:gap-8 p-5 md:p-6 border border-[#0000000D] rounded-xl bg-white">
        <div className={cn("flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-lg", iconBgColor)}>
            <Image src={icon} alt={`${title} Icon`} width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" priority={true} />
        </div>
        <div className='flex flex-col gap-0.5'>
            <h3 className="font-geist text-sm font-normal text-[#A3A3A3]">{title}</h3>
            <div className='flex items-center gap-2 flex-wrap'>
                <h1 className="font-bricolage text-[24px] font-bold leading-[120%] tracking-[-0.6px] text-[#1A1A1A]">{value}</h1>
                <span className={cn("border border-[#0000000D] rounded-[8px] px-2 py-0.5 font-geist text-xs font-medium text-[#00A36A] whitespace-nowrap", metricTextColor)}>
                    {subtitle}
                </span>
            </div>
        </div>
    </div>
);

interface ActivityItemProps {
    text: string;
    time: string;
    type: 'join' | 'update' | 'confirm';
}

// --- Component: Activity Item ---
const ActivityItem: React.FC<ActivityItemProps> = ({ text, time, type }) => {
    let iconClass = '';
    let imageSrc = null;
    
    switch (type) {
        case 'join':
            iconClass = 'bg-[#FFEDED]';
            imageSrc = attend;
            break;
        case 'confirm':
            iconClass = 'bg-[#E3FFF5]'; 
            imageSrc = check;
            break;
        case 'update':
            iconClass = 'bg-[#F2F4F7]'; 
            imageSrc = editQuick;
            break;
    }

    return (
        <div className="flex gap-3 md:gap-4 font-geist py-2 px-1">
            <div className={cn("rounded-lg shrink-0", iconClass)}>
                {imageSrc && (
                    <Image src={imageSrc} alt={type} width={32} height={32} className="w-8 h-8" priority={true} />
                )}
            </div>
            <div className="flex flex-wrap items-center text-sm md:text-[15px] font-normal leading-[150%] tracking-[-0.2px]">
                <p className="text-[#333333] pr-1">{text}</p>
                <span className="text-[#A3A3A3]"> • {time}</span>
            </div>
        </div>
    );
}

// --- Component: Attendees Stack (Reused from EventCard logic) ---
const getSeed = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
};

const AttendeesStack: React.FC<{ count: number; attendees: EventData['attendees'] }> = ({ count, attendees }) => {
    const displayAttendees = attendees.slice(0, 4);
    const remainingCount = count > 4 ? `+${count - 4}` : null;
    
    const avatarImages = [avatar2, avatar3, avatar4, avatar5];
    const bgColors = ["bg-[#F0EEFA]", "bg-[#FFECE5]"];
    const seed = attendees.length > 0 ? getSeed(attendees[0].avatar) : 0;
    
    
    return (
        <div className="flex flex-col ">
            <div className="flex items-center">
                {displayAttendees.map((att, index) => (
                    <div 
                        key={att.id}
                        className={cn(
                            "h-10 w-10 rounded-full border-2 border-white overflow-hidden",
                            index > 0 && "-ml-2", bgColors[(seed + index) % bgColors.length]
                        )}
                        style={{ zIndex: displayAttendees.length - index }}
                    >
                        <Image 
                            src={avatarImages[(seed + index) % avatarImages.length]}
                            alt={`Attendee ${index + 1}`} 
                            width={40} 
                            height={40} 
                            className="object-cover"
                            priority={true}
                        />
                    </div>
                ))}
                {remainingCount && (
                    <div 
                        className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-[#F7F7F7] text-sm font-medium text-[#959595] -ml-2"
                        style={{ zIndex: 0 }}
                    >
                        {remainingCount}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Main Page Component ---
const EventOverviewContent: React.FC<EventOverviewContentProps> = ({onViewAttendees}) => {
    const event = mockEventData;

    return (
        <div className="w-full">
            {/* --- Management Grid --- */}
            <div className="grid grid-cols-12 gap-6 lg:gap-12">

                {/* Main content wrapper */}
                <div className="col-span-12 space-y-6">
                    {/* 1. Metric Cards - Stacks on mobile, 3 columns on tablet+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <MetricCard
                            title="RSVPs"
                            value={event.rsvps}
                            subtitle={`↑ +${event.rsvpsToday} today`}
                            icon={rsvpsIcon}
                            iconBgColor="bg-[#FFEFE3]"
                            metricTextColor="text-[#00A36A]"
                        />
                        <MetricCard
                            title="Spots left"
                            value={event.spotLimit - event.spotsFilled}
                            subtitle={`${event.spotsFilled}/${event.spotLimit} filled`}
                            icon={spotsIcon}
                            iconBgColor="bg-[#F0F5FF]"
                            metricTextColor="text-[#A3A3A3]"
                        />
                        <MetricCard
                            title="Revenue"
                            value={`${event.currency}${event.revenue.toLocaleString()}`}
                            subtitle={`↑ ${event.revenueChange}%`}
                            icon={revenueIcon}
                            iconBgColor="bg-[#E3FFF5]"
                            metricTextColor="text-[#00A36A]"
                        />
                    </div>

                    <div className='pt-6'>
                        <div className='grid grid-cols-12 gap-4 md:gap-6'>
                            {/* 2. Event Details - Full width on mobile, 8/12 on desktop */}
                            <div className='col-span-12 md:col-span-8 space-y-2 shadow shadow-[#E8E8E81A]'>
                                <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Event details</h2>
                                <div className="flex items-center text-left p-5 border border-[#F5F5F5] rounded-xl bg-white space-y-6 min-h-[184px]">
                                    <div className="space-y-6 font-geist text-base text-[#767676]">
                                        <div className="flex items-center gap-2">
                                            <div className='bg-[#F7F7F7] w-8 h-8 flex justify-center items-center rounded-[6px]'>
                                                <Calendar className="w-4 h-4 text-[#A3A3A3] shrink-0" />
                                            </div>
                                            <span className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.2px]'>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className='bg-[#F7F7F7] w-8 h-8 flex justify-center items-center rounded-[6px]'>
                                                <MapPin className="w-5 h-5 text-[#A3A3A3] shrink-0" />
                                            </div>
                                            <span className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.2px]'>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className='bg-[#F7F7F7] w-8 h-8 flex justify-center items-center rounded-[6px]'>
                                                <Ticket className='w-5 h-5 text-[#A3A3A3]' />
                                            </div>
                                            <span className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.2px]'>Paid event • {event.currency}{event.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                       

                            {/* 3. Quick Actions */}
                            <div className='col-span-12 md:col-span-4 space-y-2 shadow shadow-[#E8E8E81A]'>
                                <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Quick actions</h2>
                                <div className="p-5 border border-[#F5F5F5] rounded-xl bg-white space-y-6 min-h-fit md:min-h-[186px]">
                                    {/* Share Event */}
                                    <ShareEventDialog 
                                        eventLink='https://rally.com/yup2ibi6g6'
                                        eventTitle={event.title}
                                        trigger={
                                            <div className="flex items-center gap-3 px-0 md:p-2 rounded-lg hover:bg-[#F9F9F9] cursor-pointer text-[#767676]">
                                                <Image src={shareQuick} alt='Share Quick' width={32} height={32} priority={true} />
                                                <span className="font-geist text-[15px] font-normal text-[#333333]">Share event</span>
                                            </div>
                                        }
                                    />
                                    
                                    {/* Edit Event */}
                                    <div className="flex items-center gap-3 px-0 md:p-2 rounded-lg hover:bg-[#F9F9F9] cursor-pointer text-[#767676]">
                                        <Image src={editQuick} alt='Edit Quick' width={32} height={32} priority={true} />
                                        <span className="font-geist text-[15px] font-normal text-[#333333]">Edit event</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 md:gap-6 pt-4 md:pt-6">
                            {/* 4. Recent Activity */}
                            <div className='col-span-12 md:col-span-8 space-y-2 shadow shadow-[#E8E8E81A]'>
                                <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Recent activity</h2>
                                <div className="p-5 border border-[#F5F5F5] rounded-xl bg-white">
                                    <div className="space-y-2">
                                        {event.recentActivity.map(activity => (
                                            <ActivityItem key={activity.id} {...activity} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* 5. Attendees Summary */}
                            <div className='col-span-12 md:col-span-4 space-y-2 shadow shadow-[#E8E8E81A]'>
                                <h2 className="font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]">Attendees</h2>
                                <div className="p-5 border border-[#0000000D] rounded-xl bg-white min-h-0 md:min-h-[202px] flex flex-col gap-6 justify-between">
                                    <AttendeesStack count={event.rsvps} attendees={event.attendees} />
                                    <div>
                                        <Button onClick={onViewAttendees} className="w-full bg-white border border-[#6A59CE] text-[#6A59CE] font-geist font-semibold py-3 px-6 text-[15px] leading-[135%] tracking-[-0.2px] hover:bg-transparent ">
                                            View all attendees
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EventOverviewContent;