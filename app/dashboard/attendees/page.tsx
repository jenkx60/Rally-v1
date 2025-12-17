'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, UserPlus } from 'lucide-react';
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

// Mock Attendee Data
const mockAttendees = [
    { id: 1, name: "Divii", email: "divii@example.com", ticketType: "Regular", price: "Free", joined: "Jan 8, 2025", avatar: avatard, eventName: "Saints pop-up" },
    { id: 2, name: "Jessica Smith", email: "jessica@example.com", ticketType: "VIP", price: "₦15,000", joined: "Jan 4, 2025", avatar: avatarkill, eventName: "Games night" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", ticketType: "VIP", price: "₦5,000", joined: "Jan 2, 2025", avatar: avatarglass, eventName: "Taco tuesdayy" },
    { id: 4, name: "Jenkx", email: "jenkx@example.com", ticketType: "VIP", price: "₦5,000", joined: "Jan 3, 2025", avatar: avatarman, eventName: "Sip & yap." },
];

const EmptyAttendeesState: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-12 px-[100px] bg-white text-center space-y-4">
        <Image src={bird} alt="No attendees" width={80} height={80} />
        <div className='space-y-1'>
            <h1 className="font-bricolage text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.7px]">No attendees yet</h1>
            <p className="font-geist font-medium text-[15px] text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">They&apos;ll show up here</p>
        </div>
        <button className="flex gap-2 justify-center bg-[#6A59CE] hover:bg-[#5a4cb0] font-geist font-semibold py-3.5 px-6 text-[15px] text-white rounded-lg leading-[135%] tracking-[-0.2px] cursor-pointer">
            <Image
                src={forward}
                alt='share'
                width={18}
                height={18} 
            />
            <span>Share event</span>
        </button>
    </div>
);


const AttendeesPage = () => {
    const [hasAttendees, setHasAttendees] = useState(true); 

    if (!hasAttendees) {
        return (
          <div className='flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center'>
            <EmptyAttendeesState />
          </div>
        )
    }

    return (
        <div className="bg-white p-10 space-y-4">
            <h2 className="font-bricolage text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">Attendees <span className='text-[#A3A3A3] font-bricolage font-bold text-[15px] tracking-[-0.6px]'>({mockAttendees.length})</span></h2>
            {/* Search and Filter Row */}
            <div className="grid grid-cols-12 gap-3">
                <div className="relative grow col-span-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                    <Input 
                        placeholder="Search by name and email" 
                        className="font-geist text-sm border-[#E8E8E8] focus:border-[#6A59CE] py-[11px] px-3.5 placeholder:pl-5 rounded-lg" 
                    />
                </div>
                <div className='col-span-2'>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='All events'/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='regular'>Regular</SelectItem>
                                <SelectItem value='vip'>VIP</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='col-span-2'>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='All types' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='regular'>Regular</SelectItem>
                                <SelectItem value='vip'>VIP</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='col-span-2'>
                    <button
                      className='border border-[#E8E8E8] rounded-lg py-2.5 px-3.5 text-[#333333] font-geist font-medium text-sm leading-[150%] tracking-[-0.1px]'
                    >
                      Download CSV
                    </button>
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
                    {mockAttendees.map((attendee) => (
                        <TableRow key={attendee.id} className='text-[#1A1A1A] font-medium font-geist text-sm'>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={attendee.avatar}
                                        alt={attendee.name}
                                        width={32}
                                        height={32} 
                                        className='h-8 w-8 rounded-full border'
                                    />
                                    <div className='flex flex-col gap-0.5 font-geist text-sm leading-[100%]'>
                                        <h1 className='font-medium text-[#333333]'>{attendee.name}</h1>
                                        <p className='font-normal text-[#959595]'>{attendee.email}</p>
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
    );
}

export default AttendeesPage;