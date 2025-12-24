"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Calendar, Clock, MapPin, User, Users, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

// Placeholder for the event image (use the same one from the success page for consistency)
import eventCoverPlaceholder from "@/public/Sidebar/people-happy.svg"; 
// Placeholder for the hosted-by avatar
import hostAvatarPlaceholder from "@/public/Sidebar/avatar.svg"; 
// Placeholder for the small attendee avatars (if available, otherwise use a default avatar)
import attendeeAvatar from "@/public/Sidebar/avatar.svg"; 

// --- Dummy Data/Placeholders ---
const DUMMY_EVENT_DATA = {
    title: "Saints pop-up",
    host: "Dilii",
    hostAvatar: hostAvatarPlaceholder,
    date: "Saturday, October 12th 2025",
    startTime: "3:00 PM",
    endTime: "5:00 PM WAT",
    location: "Shore mall, Osapa Lagos, Nigeria",
    attendeeCount: 4,
    description: "Vibes & yas — an hour where divl flips the switch on small talk and cranks up playful randomness. Think loose chatter and the kind of conversations that wander into delightful nonsense.",
};

// Function to generate the small attendee avatar stack for the details box
const AttendeeStack: React.FC<{ count: number }> = ({ count }) => {
    // Only show up to 3 avatars for the stack
    const displayCount = Math.min(count, 3);
    const remainingCount = count - displayCount;

    // Use a generic placeholder for the avatars for now
    const AvatarPlaceholder = ({ index }: { index: number }) => (
        <div 
            key={index}
            className={cn(
                "h-5 w-5 rounded-full border-2 border-white bg-gray-300",
                index > 0 && "-ml-2"
            )}
            style={{ zIndex: displayCount - index }}
        >
            <Image 
                src={attendeeAvatar} 
                alt={`Attendee ${index + 1}`} 
                width={20} 
                height={20} 
                className="rounded-full"
            />
        </div>
    );

    return (
        <div className="flex items-center">
            {Array.from({ length: displayCount }).map((_, i) => (
                <AvatarPlaceholder key={i} index={i} />
            ))}
            <span className="ml-2 text-xs font-semibold text-[#707070]">
                {remainingCount > 0 ? `+${remainingCount}` : DUMMY_EVENT_DATA.attendeeCount} going
            </span>
        </div>
    );
};


const EventPage = () => {
    // Use the route parameters
    const params = useParams();
    const eventSlug = params.eventSlug || 'event-not-found';

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center">
            {/* --- Top Header (Simulating the App Nav) --- */}
            <header className="w-full bg-white border-b border-[#E8E8E8] shadow-xs">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between h-20 px-6">
                    {/* Logo (R with placeholder font) */}
                    <div className="text-2xl font-bold text-[#6A59CE] font-bricolage">R</div> 
                    <Button className="bg-[#6A59CE] hover:bg-primary/90 px-6 py-2">
                        Sign up
                    </Button>
                </div>
            </header>

            {/* --- Main Content Area --- */}
            <main className="w-full max-w-[1200px] flex justify-center py-10 md:py-16 px-4">
                
                {/* Event Card Container (White Box with Dashed Border in image) */}
                <div className="bg-white rounded-2xl p-6 md:p-10 w-full max-w-4xl shadow-xl border border-dashed border-[#d0d0d0]">
                    
                    {/* --- Event Layout (Grid/Flex for Side-by-Side) --- */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* 1. Left Side: Image and Hosted By */}
                        <div className="lg:w-1/2 flex flex-col gap-6">
                            
                            {/* Main Event Image */}
                            <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-[#E6F3FF]">
                                
                                <Image 
                                    src={eventCoverPlaceholder} 
                                    alt={DUMMY_EVENT_DATA.title} 
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            {/* Hosted by block (at the bottom of the image area) */}
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                                    <Image src={DUMMY_EVENT_DATA.hostAvatar} alt="Host Avatar" width={32} height={32} className="object-cover" />
                                </div>
                                <span className="text-sm font-medium text-[#707070]">
                                    Hosted by <span className="font-semibold text-[#333333]">Saints\_gesos\_dilii.pop</span>
                                </span>
                            </div>
                        </div>

                        {/* 2. Right Side: Details and RSVP */}
                        <div className="lg:w-1/2 flex flex-col gap-6">
                            
                            {/* Title & Controls */}
                            <div className="flex justify-between items-start">
                                <h1 className="font-bricolage text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                                    {DUMMY_EVENT_DATA.title}
                                </h1>
                                <div className="flex gap-2 text-[#A3A3A3]">
                                    {/* Mock X Button */}
                                    <button className="p-1 hover:text-[#525252]">
                                        <X className="h-5 w-5" />
                                    </button>
                                    {/* Mock Image/Share Button (Placeholder for the image icon) */}
                                    <button className="p-1 hover:text-[#525252]">
                                        <Image src={eventCoverPlaceholder} alt="Share" width={20} height={20} className="opacity-0" /> {/* Invisible placeholder for space */}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Host (under title) */}
                            <div className="flex items-center gap-2 text-sm text-[#707070] -mt-4">
                                <User className="h-4 w-4 text-[#A3A3A3]" />
                                Hosted by <span className="font-medium text-[#333333]">{DUMMY_EVENT_DATA.host}</span>
                            </div>

                            {/* Event Info List */}
                            <div className="space-y-3 border-y border-[#E8E8E8] py-4">
                                <div className="flex items-center gap-3 text-sm text-[#333333]">
                                    <Calendar className="h-5 w-5 text-[#A3A3A3] shrink-0" />
                                    <span>{DUMMY_EVENT_DATA.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#333333]">
                                    <Clock className="h-5 w-5 text-[#A3A3A3] shrink-0" />
                                    <span>{DUMMY_EVENT_DATA.startTime} - {DUMMY_EVENT_DATA.endTime}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#333333]">
                                    <MapPin className="h-5 w-5 text-[#A3A3A3] shrink-0" />
                                    <span>{DUMMY_EVENT_DATA.location} <span className="text-[#6A59CE] font-medium text-xs">?</span></span>
                                </div>
                                
                                {/* Attendees */}
                                <div className="flex items-center gap-3 text-sm text-[#333333]">
                                    <Users className="h-5 w-5 text-[#A3A3A3] shrink-0" />
                                    <AttendeeStack count={DUMMY_EVENT_DATA.attendeeCount} />
                                </div>
                            </div>

                            {/* RSVP Button */}
                            <Button className="w-full bg-[#826EE6] hover:bg-[#7261d1] text-white font-semibold py-3 text-lg">
                                RSVP
                            </Button>
                            
                            {/* About Event */}
                            <div className="flex flex-col gap-2 pt-4">
                                <h3 className="text-lg font-semibold text-[#1A1A1A]">About event</h3>
                                <p className="text-sm text-[#525252] leading-relaxed">
                                    {DUMMY_EVENT_DATA.description}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* --- Footer (Simulating the Footer Bar) --- */}
            <footer className="w-full bg-white border-t border-[#E8E8E8] mt-auto">
                <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between h-auto py-4 px-6 text-xs text-[#707070]">
                    <div className="flex items-center gap-4">
                        <div className="text-base font-bold text-[#6A59CE] font-bricolage">R</div>
                        <span>Help</span> | <span>Privacy</span> | <span>Terms</span>
                    </div>
                    <div className="flex gap-4">
                        {/* Mock Social Links */}
                        <X className="h-4 w-4" /> 
                        <Image src={eventCoverPlaceholder} alt="Instagram" width={16} height={16} className="opacity-0" />
                        <Image src={eventCoverPlaceholder} alt="Facebook" width={16} height={16} className="opacity-0" />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EventPage;