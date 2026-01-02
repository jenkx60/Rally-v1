"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListFilter, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { EventCard } from "@/app/components/dashboard/events/eventCard";
import plus from "@/public/Sidebar/add_line.svg";
import newEvent from "@/public/new-event.svg";
import image1 from "@/public/Sidebar/people-happy.svg";
import image2 from "@/public/Sidebar/link-up.svg";
import image3 from "@/public/Sidebar/sunday-ill.svg";
import image4 from "@/public/Sidebar/sip-ill.svg";
import EventsFilterPopover from "@/app/components/dashboard/events/event-filter-popover";

type FilterState = {
  date: 'All' | 'Today' | 'This week' | 'This month';
  locationType: 'All' | 'Physical' | 'Virtual';
  freeEventsOnly: boolean;
};

const initialFilterState: FilterState = {
  date: 'All',
  locationType: 'All',
  freeEventsOnly: false,
};

// --- MOCK DATA ---
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
        title: "Sunday brunch club",
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

const EventsPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [currentModalFilters, setCurrentModalFilters] = useState<FilterState>(initialFilterState);

  const handlePopFilter = (filters : FilterState) => {
    setCurrentModalFilters(filters)
  };

  const activeFilterCount = useMemo(() => {
    let count = 0; 
    if (currentModalFilters.date !== 'All') count++;
    if (currentModalFilters.locationType !== 'All') count++;
    if (currentModalFilters.freeEventsOnly) count++;
    return count;
  }, [currentModalFilters])

  // Filter logic for the dashboard view
  const filteredEvents = MOCK_EVENTS.filter((event) =>
    filter === "All" ? true : event.status === filter
  );

  // --- CONDITIONAL RENDER LOGIC ---
  
  // 1. If NO events exist, show the "Empty State" (First code snippet)
  if (MOCK_EVENTS.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center bg-red-300">
        <div>
          <Image src={newEvent} alt="New Event Image" width={80} height={80} />
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <h1 className="font-bricolage font-semibold text-[20px] leading-[130%] tracking-[-0.7px] text-center">
            No events yet
          </h1>
          <p className="font-geist font-medium text-[14px] leading-[150%] tracking-[-0.1px] text-[#A3A3A3]">
            Let&apos;s create your first event!
          </p>
        </div>
        <div>
          <Button onClick={() => router.push("/dashboard/events/create")}>
            <Image
              src={plus}
              alt="Plus Icon"
              width={18}
              height={18}
              className="pb-0.5"
            />
            <span className="font-geist font-semibold text-[15px] leading-[150%] tracking-[-0.2px]">
              Create event
            </span>
          </Button>
        </div>
      </div>
    );
  }

  // 2. If events DO exist, show the "Dashboard View" (Second code snippet)
  return (
    <div className="relative flex flex-col gap-8 p-0 pb-10 pt-5 md:p-5 w-full">
      {/* Header and "Create event" Button */}
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <h1 className="font-bricolage text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">My events</h1>
          <p className="font-geist font-medium text-sm leading-[150%] tracking-[-0.1px] text-[#A3A3A3]">Stay on top of your events, all in one place</p>
        </div>
        <Link href="/dashboard/events/create" passHref className="hidden md:block">
          <Button className="bg-[#6A59CE] hover:bg-primary/90 px-6 py-2">
            <Image
              src={plus}
              alt="Plus Icon"
              width={18}
              height={18}
              className="pb-0.5"
            />
            <span className="font-geist font-semibold text-[15px] leading-[150%] tracking-[-0.2px]">
              Create event
            </span>
          </Button>
        </Link>
      </div>

      {/* Sub-header, Tabs, and Filter */}
      <div className="flex flex-col gap-4">
        {/* You can add your subheader text here if needed from the previous designs */}
        
        <div className="flex justify-between items-center pb-4">
            <div className="flex gap-2">
                {['All', 'Upcoming', 'Past'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={cn(
                            "font-geist text-[15px] font-medium px-3.5 py-2 rounded-md leading-6  transition-colors cursor-pointer",
                            filter === tab 
                                ? "text-white bg-[#6A59CE]" 
                                : "text-[#959595] bg-[#F7F7F7] hover:text-[#959595]"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <EventsFilterPopover onApplyFilters={handlePopFilter}>
              <button className="flex items-center gap-2 py-1 font-geist font-medium text-[15px] cursor-pointer">
                  <ListFilter className="h-4 w-4 text-[#1A1A1A]" />
                  <span className="text-[#1A1A1A]">Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="text-[#6A59CE]">({activeFilterCount})</span>
                  )}
              </button>
            </EventsFilterPopover>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center text-[#767676] py-10">
          No events found for the &apos;{filter}&apos; filter.
        </div>
      )}

      {/* Moblie Floating action button */}
      <Link href="/dashboard/events/create" passHref className="md:hidden fixed bottom-6 right-6 z-50">
        <div className="bg-[#6A59CE] w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0px_8px_16px_rgba(106,89,206,0.25)] active:scale-95 transition-transform">
          <Plus className="text-white w-7 h-7" strokeWidth={2.5} />
        </div>
      </Link>
    </div>
  );
};

export default EventsPage;

// use this template when you are home