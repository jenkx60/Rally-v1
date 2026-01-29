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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useDataStore } from '@/src/store/data.store';
import { AttendeeData } from '@/src/types';
import AttendeesEmptyState from '@/app/components/dashboard/empty-states/attendees-empty-state';

// Empty state logic now handles the state below using the reusable component



const EventAttendeesContent = () => {
    const { attendees, fetchData } = useDataStore();
    const hasAttendees = attendees.length > 0; 

    if (!hasAttendees) {
        return (
            <AttendeesEmptyState 
                onAction={() => {}} 
                title="No RSVPs yet" 
                description="Time to spread the word" 
                className="flex flex-col items-center justify-center py-12 px-[100px] mt-12 bg-white text-center space-y-4"
            />
        );
    }

    return (
        <div className="bg-white space-y-4">
            <h2 className="font-bricolage text-xl font-semibold leading-[130%] tracking-[-0.5px] text-[#1A1A1A]">Attendees list</h2>
            
            {/* Search and Filter Row */}
            <div className="flex flex-col md:flex-row gap-3 justify-between">
                {/* <div className="relative grow col-span-9">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                    <Input 
                        placeholder="Search by name and email" 
                        className="font-geist text-sm border-[#E8E8E8] focus:border-[#6A59CE] py-[11px] px-3.5 placeholder:pl-5 rounded-lg" 
                    />
                </div> */}
                <div className="relative md:w-[80%]">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                    <Input 
                        placeholder="Search by name and email" 
                        className="font-geist text-sm border-[#E8E8E8]  h-11 pl-10 pr-3.5 rounded-lg" 
                    />
                </div>
                <div className='flex gap-3 w-full md:w-[20%]'>
                    <div className='flex-1'>
                        <Select>
                            <SelectTrigger className='h-11'>
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
                </div>
            </div>

            {/* Attendees Table */}
            <Table>
                <TableHeader>
                    <TableRow className='bg-[#F7F7F7] hover:bg-[#F7F7F7] text-[#A3A3A3] font-geist'>
                        <TableHead className="w-[40%]">Attendee</TableHead>
                        <TableHead className="w-[30%]">Ticket type</TableHead>
                        <TableHead className="w-[15%]">Price</TableHead>
                        <TableHead className="w-[15%]">Joined on</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {attendees.slice(0, 4).map((attendee: AttendeeData) => (
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
                            <TableCell className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.1px]'>{attendee.ticketType}</TableCell>
                            <TableCell className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.1px]'>{attendee.price}</TableCell>
                            <TableCell className='text-[#333333] text-[15px] font-normal leading-[150%] tracking-[-0.1px]'>{attendee.joined}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default EventAttendeesContent;