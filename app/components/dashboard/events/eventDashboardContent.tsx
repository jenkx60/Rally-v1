"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ListFilter } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { EventCard } from "@/app/components/dashboard/events/eventCard";
import { cn } from "@/lib/utils";
import { useDataStore } from '@/src/store/data.store';


export const EventsDashboardContent = () => {
    const { events } = useDataStore();
    // Mock state for filtering
    const [filter, setFilter] = useState('All');
    
    // Mock filtering logic
    const filteredEvents = events.filter(event => 
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
                
                {filteredEvents.length < 4 && events[3] && (
                     <EventCard key={events[3].id} {...events[3]} />
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