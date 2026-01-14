// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ArrowLeft, Calendar, Edit2, LinkIcon, MapPin, Share2 } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/app/components/ui/button';

// // --- Placeholder/Mock Imports ---
// // Replace these with your actual component paths
// import { Badge } from '@/app/components/ui/badge'; 
// import sharePlane from '@/public/Sidebar/paper-plane.svg'; 
// import revenueIcon from '@/public/Sidebar/revenue-icon.svg'; 
// import spotsIcon from '@/public/Sidebar/coupon_fill.svg'; 
// import rsvpsIcon from '@/public/Sidebar/group_3_fill.svg'; 
// import illustrationUser from '@/public/Sidebar/avatar.svg'; // Placeholder for activity user

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
//     date: "Saturday, October 12 - 3:00 PM",
//     location: "205 Apartments Rooftop, Lekki",
//     price: 5000,
//     currency: '₦',
//     rsvps: 24,
//     rsvpsToday: 3,
//     spotsFilled: 18,
//     spotLimit: 50,
//     revenue: 240000,
//     revenueChange: 40,
//     attendees: Array(8).fill(0).map((_, i) => ({ id: i, avatar: illustrationUser.src })), // 8 mock attendees
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
//     icon: string;
//     iconBgColor: string;
// }

// const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, iconBgColor }) => (
//     <div className="flex flex-col gap-3 p-5 border border-[#F5F5F5] rounded-xl shadow-sm bg-white">
//         <div className={cn("flex items-center justify-center h-8 w-8 rounded-full", iconBgColor)}>
//             <Image src={icon} alt={`${title} Icon`} width={16} height={16} />
//         </div>
//         <span className="font-geist text-sm font-normal text-[#A3A3A3]">{title}</span>
//         <div className="font-bricolage text-[28px] font-bold leading-[120%] tracking-[-0.6px] text-[#1A1A1A] flex items-end">
//             {value}
//             <span className="ml-2 font-geist text-sm font-medium text-[#00A36A]">
//                 {subtitle}
//             </span>
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
//     // let iconBg = '';
    
//     // Customize styles based on activity type (Mocking the icons from the image)
//     switch (type) {
//         case 'join':
//             iconClass = 'bg-[#FFEDED] text-[#F7931E]'; 
//             break;
//         case 'confirm':
//             iconClass = 'bg-[#E3FFF5] text-[#00A36A]'; 
//             break;
//         case 'update':
//             iconClass = 'bg-[#F2F4F7] text-[#525252]'; 
//             break;
//     }

//     return (
//         <div className="flex items-start gap-4 py-2 border-b border-[#F7F7F7] last:border-b-0">
//             <div className={cn("flex items-center justify-center h-5 w-5 rounded-full mt-1", iconClass)}>
//                 {/* Replace with actual icons if needed. For now, matching the color */}
//                 <div className="h-2 w-2 rounded-full" /> 
//             </div>
//             <div className="flex flex-col font-geist text-sm">
//                 <span className="text-[#1A1A1A] font-medium leading-[150%]">{text}</span>
//                 <span className="text-[#A3A3A3] font-normal text-xs">{time}</span>
//             </div>
//         </div>
//     );
// }

// // --- Component: Attendees Stack (Reused from EventCard logic) ---
// const AttendeesStack: React.FC<{ count: number; attendees: EventData['attendees'] }> = ({ count, attendees }) => {
//     const displayAttendees = attendees.slice(0, 4);
//     const remainingCount = count > 4 ? `+${count - 4}` : null;

//     return (
//         <div className="flex flex-col gap-2">
//             <h3 className="font-bricolage text-base font-semibold text-[#1A1A1A]">Attendees</h3>
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
//             <Button className="mt-2 w-full bg-[#6A59CE] hover:bg-[#5a4cb0] font-geist font-semibold py-3 px-6 text-sm">
//                 View all attendees
//             </Button>
//         </div>
//     );
// };


// // --- Main Page Component ---
// const EventOverviewPage = () => {
//     const event = mockEventData; // Load data for the current eventSlug

//     return (
//         <div className="p-6">
            
//             {/* Back Link */}
//             <Link href="/dashboard/events" className="flex items-center gap-2 mb-6 font-geist text-sm font-medium text-[#767676] hover:text-[#525252]">
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to events
//             </Link>

//             {/* Title and Tab Header (Tabs are in the Layout, but Title is here) */}
//             <h1 className="font-bricolage text-[32px] font-bold leading-[120%] tracking-[-0.8px] text-[#1A1A1A] mb-8">
//                 {event.title}
//             </h1>

//             {/* --- Management Grid --- */}
//             <div className="grid grid-cols-12 gap-6">

//                 {/* Left Column (9/12 width) */}
//                 <div className="col-span-12 lg:col-span-12 space-y-6">
                    
//                     {/* 1. Metric Cards */}
//                     <div className="grid grid-cols-3 gap-6">
//                         <MetricCard
//                             title="RSVPs"
//                             value={event.rsvps}
//                             subtitle={`+${event.rsvpsToday} today`}
//                             icon={rsvpsIcon.src}
//                             iconBgColor="bg-[#FFEFE3]" // Light orange/peach
//                         />
//                         <MetricCard
//                             title="Spots left"
//                             value={event.spotLimit - event.spotsFilled}
//                             subtitle={`${event.spotsFilled}/${event.spotLimit} filled`}
//                             icon={spotsIcon.src}
//                             iconBgColor="bg-[#F0F5FF]" // Light blue
//                         />
//                         <MetricCard
//                             title="Revenue"
//                             value={`${event.currency}${event.revenue.toLocaleString()}`}
//                             subtitle={`↑ ${event.revenueChange}%`}
//                             icon={revenueIcon.src}
//                             iconBgColor="bg-[#E3FFF5]" // Light green
//                         />
//                     </div>

//                     <div className='grid grid-cols-12 gap-6'>
//                         {/* 2. Event Details */}
//                         <div className="col-span-8 p-6 border border-[#F5F5F5] rounded-xl shadow-sm bg-white space-y-4">
//                             <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A]">Event details</h2>
                            
//                             <div className="space-y-3 font-geist text-base text-[#767676]">
//                                 <div className="flex items-center gap-3">
//                                     <Calendar className="w-5 h-5 text-[#A3A3A3] shrink-0" />
//                                     <span>{event.date}</span>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                     <MapPin className="w-5 h-5 text-[#A3A3A3] shrink-0" />
//                                     <span>{event.location}</span>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                     <Image src={revenueIcon} alt="Paid Icon" width={20} height={20} className="opacity-50" />
//                                     <span>Paid event · {event.currency}{event.price.toLocaleString()}</span>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* 3. Quick Actions */}
//                         <div className="col-span-4 p-6 border border-[#F5F5F5] rounded-xl shadow-sm bg-white space-y-2">
//                             <h2 className="font-bricolage text-base font-semibold text-[#1A1A1A] mb-3">Quick actions</h2>
                            
//                             {/* Share Event */}
//                             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F9F9F9] cursor-pointer text-[#767676]">
//                                 <Share2 className="w-4 h-4" />
//                                 <span className="font-geist text-sm font-medium">Share event</span>
//                             </div>
                            
//                             {/* Edit Event */}
//                             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F9F9F9] cursor-pointer text-[#767676]">
//                                 <Edit2 className="w-4 h-4" />
//                                 <span className="font-geist text-sm font-medium">Edit event</span>
//                             </div>
//                         </div>
//                     </div>


//                     <div className="grid grid-cols-12 gap-6">
//                         {/* 4. Recent Activity */}
//                         <div className="col-span-8 p-6 border border-[#F5F5F5] rounded-xl shadow-sm bg-white">
//                             <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A] mb-4">Recent activity</h2>
//                             <div className="space-y-2">
//                                 {event.recentActivity.map(activity => (
//                                     <ActivityItem key={activity.id} {...activity} />
//                                 ))}
//                             </div>
//                         </div>
                        
//                         {/* 5. Attendees Summary */}
//                         <div className="col-span-4 p-6 border border-[#F5F5F5] rounded-xl shadow-sm bg-white">
//                             <AttendeesStack count={event.rsvps} attendees={event.attendees} />
//                         </div>

//                     </div>
//                 </div>

//                 {/* Right Column (3/12 width) */}
//             </div>
//         </div>
//     );
// }

// export default EventOverviewPage;

'use client';

import EventAttendeesContent from '@/app/components/dashboard/events/event-attendees-content'
import EventOverviewContent from '@/app/components/dashboard/events/event-overview-content'
import EventSettingsContent from '@/app/components/dashboard/events/event-settings-content'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const EventTabs: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = ['Overview', 'Attendees', 'Settings'];

    return (
        <div className="flex space-x-2.5 pb-12">
            {tabs.map((tabName) => (
                <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={cn(
                        "font-geist text-[15px] font-medium px-3.5 py-2 rounded-md leading-6 transition-colors cursor-pointer",
                        activeTab === tabName
                            ? "text-white bg-[#6A59CE]" 
                            : "text-[#959595] bg-[#F7F7F7] hover:text-[#959595]"
                    )}
                >
                    {tabName}
                </button>
            ))}
        </div>
    );
}

// Main Event Page
const MangeEvent = () => {
    const [activeTab, setActiveTab] = useState('Overview')

    const eventTitle = "Saint pop-up"

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <EventOverviewContent />;
            case 'Attendees':
                return <EventAttendeesContent />;
            case 'Settings':
                return <EventSettingsContent />;
            default:
                return null;
        }
    }
  return (
    <div className="flex flex-col p-0 pb-10 pt-5 md:p-5">
        {/* Back Link */}
        <Link href="/dashboard/events" className="flex items-center gap-2 mb-6 font-geist text-sm font-medium text-[#767676] hover:text-[#525252]">
            <ArrowLeft className="w-4 h-4" />
            Back to events
        </Link>

        {/* Title */}
        <h1 className="font-bricolage text-[32px] font-bold leading-[120%] tracking-[-0.8px] text-[#1A1A1A] mb-8">
            {eventTitle}
        </h1>

        {/* Tabs */}
        <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <main>
            {renderContent()}
        </main>
    </div>
  )
}

export default MangeEvent