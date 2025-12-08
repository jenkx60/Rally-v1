import * as React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Calendar, Ellipsis, MapPin } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import illustrations from "@/public/Sidebar/avatar.svg";

// Placeholder for attendee avatars (ensure you have these paths or update them)
import attendeeAvatar from "@/public/Sidebar/attendee_avatar.png"; 

// Define the shape of the data the card expects
interface EventCardProps {
    id: string; // Used for the manage link
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
            <span className="ml-2 font-medium">
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
    // Determine status badge color
    const statusColor = status === 'Live' 
        ? 'bg-[#E3FFF5] text-[#00A36A]' 
        : 'bg-[#F2F4F7] text-[#525252]';
        
    // Path to manage the event (e.g., /dashboard/events/[id]/manage)
    const managePath = `/dashboard/events/${id}/manage`; 

    return (
        <div className="bg-white border border-[#0000000D] rounded-xl overflow-hidden shadow-sm shadow-[#1A1A1A0D] flex flex-col">
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
                    <h3 className="font-bricolage text-lg font-bold text-[#1A1A1A] leading-tight">{title}</h3>
                    <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        statusColor
                    )}>
                        {status}
                    </span>
                </div>
                
                <div className="space-y-2 text-sm text-[#707070] font-geist">
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

                    <Button
                        variant="outline"
                        className="w-[15%] border-none"
                    >
                        <Ellipsis className="w-6 h-6 text-[#1A1A1A]"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}