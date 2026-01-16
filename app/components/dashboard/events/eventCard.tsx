import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Calendar, Edit3, Ellipsis, Forward, MapPin } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import illustrations from "@/public/Sidebar/avatar.svg";
import attendeeAvatar from "@/public/Sidebar/attendee_avatar.png"; 
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import ShareEventDialog from "./share-event-dialog";

// Define the shape of the data the card expects
interface EventCardProps {
    id: string;
    title: string;
    dateRange: string;
    location: string;
    attendees: number;
    status: 'Live' | 'Upcoming' | 'Past';
    imageSrc: StaticImageData;
}

// Helper component for attendee avatar stack
const AttendeeStack: React.FC<{ count: number }> = ({ count }) => {
    // Show up to 3 avatars + count
    const displayCount = Math.min(count, 4);
    const remainingCount = count - displayCount;
    
    // Placeholder avatars for display (in a real app, these would be user images)
    const AvatarPlaceholder = ({ index }: { index: number }) => (
        <div 
            key={index}
            className={cn(
                "h-7 w-7 rounded-full border-2 border-white bg-gray-300",
                index > 0 && "-ml-2"
            )}
            style={{ zIndex: displayCount - index }}
        >
            {/* Replace attendeeAvatar with actual small user image component if available */}
            <Image 
                src={illustrations} 
                alt={`Attendee ${index + 1}`} 
                width={20} 
                height={20} 
                className="rounded-full object-cover"
            />
        </div>
    );

    return (
        <div className="flex items-center text-[#707070] text-xs font-geist">
            {/* Avatar Stack */}
            <div className="flex -space-x-0.5">
                {Array.from({ length: displayCount }).map((_, i) => (
                    <AvatarPlaceholder key={i} index={i} />
                ))}
            </div>
            
            {/* Attendee Count */}
            <span className="h-7 w-7 rounded-full border-2 border-white bg-[#F7F7F7] font-medium text-[#959595] p-1">
                {count > 0 ? `+${count}` : 'No attendees'}
            </span>
        </div>
    );
};

export const EventCard: React.FC<EventCardProps> = ({
    id,
    title,
    dateRange,
    location,
    attendees,
    status,
    imageSrc,
}) => {
    const router = useRouter()
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    // const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    // Determine status badge color
    const statusColor = status === 'Live' 
        ? 'bg-[#E3FFF5] text-[#00A36A] animate-pulse' 
        : 'bg-[#F2F4F7] text-[#525252]';
        
    // Path to manage the event (e.g., /dashboard/events/[id]/manage)
    const managePath = `/dashboard/events/manage`; 

    const handleEditClick = () => {
        setIsPopoverOpen(false);
        // Navigate to the dynamic edit page path: /dashboard/events/[eventSlug]/edit
        router.push(`/dashboard/events/edit`);
    };

    // const handleShareClick = () => {
    //     setIsPopoverOpen(false);
    //     // Open the Share Modal
    //     setIsShareModalOpen(true);
    // };

    // mock event link
    const MOCK_EVENT_LINK = "https://rally.com/yup2ibi6g6";

    return (
        <>
            <div className="bg-white border border-[#0000000D] rounded-xl overflow-hidden shadow-xs shadow-[#1A1A1A0D] flex flex-col cursor-pointer">
                {/* Event Image and Status Tag */}
                <div className="relative w-full h-40">
                    <Image 
                        src={imageSrc} 
                        alt={title} 
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                {/* Event Details */}
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h1 className="font-bricolage text-lg font-bold text-[#1A1A1A] leading-[120%] tracking-[-0.6px]">{title}</h1>
                        {status === 'Live' && (
                            <span className={cn(
                                "text-xs font-semibold pr-2 pl-1.5 py-0.5 rounded-full",
                                statusColor
                            )}>
                                <span className="mr-0.5 text-[12px]">•</span>Live
                            </span>
                        )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-[#767676] font-geist font-normal leading-[150%] tracking-[-0.2px]">
                        {/* Date */}
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#A3A3A3] shrink-0" />
                            <span>{dateRange}</span>
                        </div>
                        {/* Location */}
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#A3A3A3] shrink-0" />
                            <span>{location}</span>
                        </div>
                    </div>

                    {/* Attendees */}
                    <AttendeeStack count={attendees} />

                    {/* Manage Button */}
                    <div className="flex gap-4">
                            <Button 
                                variant="outline" 
                                className="w-[85%] font-geist font-semibold border-[#6A59CE] text-[#6A59CE] text-[15px] leading-[135%] tracking-[-0.2px] hover:bg-[#F9F9F9] py-3 px-6"
                            >
                                <Link href={managePath} passHref>
                                    Manage event
                                </Link>
                            </Button>

                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[15%] border-none"
                                >
                                    <Ellipsis className="w-6 h-6 text-[#1A1A1A]"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="border border-[#0000000D] shadow shadow-[#0000000D]">
                                <div className="flex flex-col gap-2 bg-white font-geist font-medium text-sm leading-[150%]">
                                    <div onClick={handleEditClick} className="flex justify-between items-center hover:bg-[#F5F5F5] px-2 py-1.5 rounded-[6px] cursor-pointer">
                                        <span>Edit</span>
                                        <Edit3 className="w-3 h-3 text-[#333333]" />
                                    </div>
                                    <ShareEventDialog
                                        eventLink={MOCK_EVENT_LINK}
                                        trigger={
                                            <div className="flex justify-between items-center hover:bg-[#F5F5F5] px-2 py-1.5 rounded-[6px] cursor-pointer">
                                                <span>Share</span>
                                                <Forward className="w-4 h-4 text-[#333333]" />
                                            </div>
                                        }
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

        </>
    );
}