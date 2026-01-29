"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ListFilter } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { EventCard } from "@/app/components/dashboard/events/eventCard";
import { cn } from "@/lib/utils"; // Assuming this is imported
import Image from "next/image";
import image1 from '@/public/Sidebar/cal-ill.svg';
import image2 from '@/public/Sidebar/link-up.webp';
import image3 from '@/public/Sidebar/sunday-ill.webp';
import image4 from '@/public/Sidebar/sip-ill.webp';

// --- MOCK DATA/STATE (MUST BE DEFINED HERE) ---
const MOCK_EVENTS = [
    {
        id: "saints-popup",
        title: "Saints pop-up",
        dateRange: "Today • 6:00 PM - 11:00 PM",
        location: "Shore mall, Osapa",
        attendees: 5,
        status: 'Live' as const,
        imageSrc: image1,
    },
    {
        id: "the-link-up",
        title: "The link up",
        dateRange: "Fri, Nov 21 • 5:30 PM - 10:30 PM",
        location: "The Garden, Ikoyi",
        attendees: 9,
        status: 'Upcoming' as const,
        imageSrc: image2,
    },
    {
        id: "sunday-brunch",
        title: "Potluck & chill",
        dateRange: "Sat, Oct 12 • 1:30 PM - 4:30 PM",
        location: "Lekki phase 1, Lekki",
        attendees: 6,
        status: 'Upcoming' as const,
        imageSrc: image3,
    },
    {
        id: "sip-yap",
        title: "Sip & yap",
        dateRange: "Sat, Oct 12 • 1:30 PM - 4:30 PM",
        location: "Lekki phase 1, Lekki",
        attendees: 0,
        status: 'Past' as const,
        imageSrc: image4,
    },
];


export const EventsDashboardContent = () => {
    // Mock state for filtering
    const [filter, setFilter] = useState('All');
    
    // Mock filtering logic
    const filteredEvents = MOCK_EVENTS.filter(event => 
        filter === 'All' ? true : event.status === filter
    );

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8 w-full">
            
            {/* Header and "Create event" Button */}
            <div className="flex justify-between items-center">
                <h1 className="font-bricolage text-3xl font-bold text-[#1A1A1A]">
                    Events
                </h1>
                <Link href="/events/create" passHref>
                    <Button className="bg-[#6A59CE] hover:bg-primary/90 px-6 py-2">
                        + Create event
                    </Button>
                </Link>
            </div>

            {/* Sub-header, Tabs, and Filter */}
            {/* ... (rest of your dashboard content: filter tabs, events grid) ... */}
            
            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} {...event} />
                ))}
                
                {filteredEvents.length < 4 && MOCK_EVENTS[3] && (
                     <EventCard key={MOCK_EVENTS[3].id} {...MOCK_EVENTS[3]} />
                )}
            </div>
            
            {filteredEvents.length === 0 && (
                <div className="text-center text-[#767676] py-10">
                    No events found for the &apos;{filter}&apos; filter.
                </div>
            )}
        </div>
    );
}