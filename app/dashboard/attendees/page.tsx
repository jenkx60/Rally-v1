'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Plus, Search, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/components/ui/table'; 
import { Input } from '@/app/components/ui/input';
import bird from '@/public/Sidebar/envelope-bird.svg'; 
import forward from '@/public/Sidebar/share_forward_line.svg';
import avatard from '@/public/Sidebar/avatar.svg';
import avatarkill from '@/public/Sidebar/avatar-kill.svg';
import avatarman from '@/public/Sidebar/avatar-man.svg';
import avatarglass from '@/public/Sidebar/avatar-glass.svg';
import avatarhat from '@/public/Sidebar/avatar-hat.svg';
import avatarwomanbun from '@/public/Sidebar/avatar-womanbun.svg';
import avatarstrip from '@/public/Sidebar/avatar-strip.svg';
import avatareyes from '@/public/Sidebar/avatar-3eyes.svg';
import avatarmanbun from '@/public/Sidebar/avatar-manbun.svg';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

// Mock Attendee Data
const mockAttendees = [
    { id: 1, name: "Divii", email: "divii@example.com", ticketType: "Regular", price: "Free", joined: "Jan 8, 2026", avatar: avatard, eventName: "Saints pop-up" },
    { id: 2, name: "Jessica Smith", email: "jessica@example.com", ticketType: "VIP", price: "₦16,000", joined: "Jan 4, 2026", avatar: avatarkill, eventName: "Games night" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", ticketType: "VIP", price: "₦6,000", joined: "Jan 2, 2026", avatar: avatarhat, eventName: "Taco tuesdayy" },
    { id: 4, name: "Jenkx", email: "jenkx@example.com", ticketType: "VIP", price: "₦6,000", joined: "Jan 3, 2026", avatar: avatarmanbun, eventName: "Potluck & chill" },
    { id: 5, name: "Uchy", email: "u.kimberly@example.com", ticketType: "VIP", price: "₦16,000", joined: "Jan 3, 2026", avatar: avatarkill, eventName: "Saints pop-up" },
    { id: 6, name: "Nneoms", email: "n.annette@rocketmail..com", ticketType: "VIP", price: "₦30,000", joined: "Dec 3, 2026", avatar: avatarwomanbun, eventName: "Games night" },
    { id: 7, name: "Nkem", email: "realsaints@gmail.com", ticketType: "VIP", price: "₦1,000", joined: "Jan 12, 2026", avatar: avatarstrip, eventName: "Taco tuesdayy" },
    { id: 8, name: "Mike Johnson", email: "mike@example.com", ticketType: "VIP", price: "₦6,000", joined: "Jan 2, 2026", avatar: avatarhat, eventName: "Taco tuesdayy" },
    { id: 9, name: "Jessica Smith", email: "jessica@example.com", ticketType: "Regular", price: "Free", joined: "Jan 11, 2026", avatar: avatareyes, eventName: "Saints pop-up" },
    { id: 10, name: "Mike Johnson", email: "mike@example.com", ticketType: "VIP", price: "₦6,000", joined: "Jan 19, 2026", avatar: avatarhat, eventName: "The link up" },
    { id: 11, name: "Uchy", email: "u.kimberly@example.com", ticketType: "Regular", price: "Free", joined: "Jan 1, 2026", avatar: avatarglass, eventName: "Sip & yap" },
    { id: 12, name: "Mike Johnson", email: "mike@example.com", ticketType: "VIP", price: "₦6,000", joined: "Jan 2, 2026", avatar: avatarhat, eventName: "Taco tuesdayy" },

];

const EmptyAttendeesState: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-12 px-[100px] bg-white text-center space-y-4">
        <Image src={bird} alt="No attendees" width={80} height={80} priority={true} />
        <div className='space-y-1'>
            <h1 className="font-bricolage text-[18px] font-semibold text-[#1A1A1A] leading-[120%] tracking-[-0.6px]">No attendees yet</h1>
            <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">They&apos;ll show up here</p>
        </div>
        <button className="flex gap-2 justify-center bg-[#6A59CE] hover:bg-primary/90 font-geist font-semibold py-3.5 px-6 text-[15px] text-white rounded-lg leading-[135%] tracking-[-0.2px] cursor-pointer">
            <Plus className='w-5 h-5' />
            <span className="font-geist font-semibold text-[15px] leading-[135%] tracking-[-0.2px]">Share event</span>
        </button>
    </div>
);


const AttendeesPage = () => {
    const [hasAttendees, setHasAttendees] = useState(true); 
    const [searchQuery, setSearchQuery] = useState('');
    const [eventFilter, setEventFilter] = useState('all');
    const [ticketFilter, setTicketFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(4);
    
    const items_per_table = 2;

    // to  extract unique events and ticket types for dropdowns
    const uniqueEvents = Array.from(new Set(mockAttendees.map(a => a.eventName)));
    const uniqueTicketTypes = Array.from(new Set(mockAttendees.map(a => a.ticketType)));

    // Filtering Logic
    const filteredAttendees = useMemo(() => {
        return mockAttendees.filter((attendee) => {
            // Search Filter (Name or Email)
            const matchesSearch = 
                attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                attendee.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesEvent = eventFilter === 'all' || attendee.eventName === eventFilter;
            const matchesTicket = ticketFilter === 'all' || attendee.ticketType === ticketFilter;

            return matchesSearch && matchesEvent && matchesTicket;
        });
    }, [searchQuery, eventFilter, ticketFilter]);

    // Pagination Logic
    const displayedAttendees = filteredAttendees.slice(0, visibleCount);
    const hasMore = visibleCount < filteredAttendees.length;

    const bgColors = ["bg-[#F0EEFA]", "bg-[#FFECE5]"];

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + items_per_table);
    }

    if (!hasAttendees) {
        return (
          <div className='flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center'>
            <EmptyAttendeesState />
          </div>
        )
    }

    return (
        <div className="bg-white flex flex-col gap-12 p-0 pb-10 pt-5 md:p-5 w-full max-w-[1200px] mx-auto">
            <div>
                <h2 className="font-bricolage text-[28px] md:text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">Attendees <span className='text-[#A3A3A3] font-bricolage font-bold text-[15px] tracking-[-0.6px]'>({mockAttendees.length})</span></h2>
                <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">Guest list for all your events in one place</p>
            </div>

            <div className='space-y-6'>
                {/* Search and Filter Row */}
                <div className="flex flex-col md:flex-row gap-3 justify-between">
                    <div className="relative md:w-[518px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                        <Input 
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setVisibleCount(4)
                            }}
                            placeholder="Search by name and email" 
                            className="font-geist text-sm border-[#E8E8E8]  h-11 pl-10 pr-3.5 rounded-lg" 
                        />
                    </div>
                    <div className='flex gap-3 md:w-[300px]'>
                        <div className='flex-1'>
                            <Select 
                                value={eventFilter} 
                                onValueChange={(val) => {
                                    setEventFilter(val)
                                    setVisibleCount(4)
                                }}
                            >
                                <SelectTrigger className='w-full h-11 px-3.5 rounded-lg border-[#E8E8E8] text-[#333333] font-geist'>
                                    <SelectValue placeholder='All events' className='placeholder:text-[#333333]'>
                                        {eventFilter === 'all' ? 'All events' : (eventFilter.length > 9 ? `${eventFilter.slice(0, 9)}...` : eventFilter)}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='all'>All events</SelectItem>
                                        {uniqueEvents.map((event) => (
                                            <SelectItem key={event} value={event} className='truncate'>{event}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex-1'>
                            <Select
                                value={ticketFilter}
                                onValueChange={(val) => {
                                    setTicketFilter(val)
                                    setVisibleCount(4)
                                }}
                            >
                                <SelectTrigger className='w-full h-11 px-3.5 rounded-lg border-[#E8E8E8] text-[#333333] font-geist'>
                                    <SelectValue placeholder='All types' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='all'>All types</SelectItem>
                                        {uniqueTicketTypes.map((type) => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Attendees Table */}
                <Table>
                    <TableHeader>
                        <TableRow className='bg-[#F7F7F7] hover:bg-[#F7F7F7] text-[#A3A3A3] font-geist'>
                            <TableHead className="w-[40%]">Attendee</TableHead>
                            <TableHead className="w-[30%]">Event</TableHead>
                            <TableHead className="w-[30%]">Ticket type</TableHead>
                            <TableHead className="w-[15%]">Price</TableHead>
                            <TableHead className="w-[15%]">Joined on</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedAttendees.map((attendee) => (
                                <TableRow key={attendee.id} className='text-[#1A1A1A] font-medium font-geist text-sm'>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center overflow-hidden p-0.5", ["bg-[#F0EEFA]", "bg-[#FFECE5]"][attendee.id % 2])}>
                                                <Image
                                                    src={attendee.avatar}
                                                    alt={attendee.name}
                                                    width={32}
                                                    height={32} 
                                                    className='h-8 w-full object-cover rounded-full'
                                                    priority={true}
                                                />
                                            </div>
                                            <div className='flex flex-col font-geist text-sm leading-[150%]'>
                                                <h1 className='font-medium text-[#333333]'>{attendee.name}</h1>
                                                <p className='font-normal text-[#A3A3A3]'>{attendee.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "text-sm ",
                                        )}>
                                            {attendee.eventName}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "text-sm ",
                                        )}>
                                            {attendee.ticketType}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "text-sm",
                                        )}>
                                            {attendee.price}
                                        </span>
                                    </TableCell>
                                    <TableCell className="">{attendee.joined}</TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center pt-4">
                    <button 
                        className="px-6 py-2.5 border border-[#E8E8E8] rounded-lg font-geist font-medium text-[15px] text-[#1A1A1A] hover:bg-gray-50 transition-colors cursor-pointer" 
                        onClick={handleLoadMore}
                    >
                        Load more
                    </button>
                </div>
            )}
        </div>
    );
}

export default AttendeesPage;