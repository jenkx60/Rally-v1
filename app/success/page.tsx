"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { 
  Calendar, MapPin, Share2, ArrowRight, Copy, LayoutDashboard, 
  LinkIcon
} from "lucide-react";
import globe from "@/public/Sidebar/globe_success.svg";
import people from "@/public/Sidebar/people-happy.svg";
import forward from "@/public/Sidebar/share_forward_line.svg";
import group from "@/public/Sidebar/group_3_line_o.svg";
import ShareEventDialog from "../components/dashboard/events/share-event-dialog";

// Inner component to handle Search Params logic
const SuccessContent = () => {
    const searchParams = useSearchParams();

    // mock event link
    const MOCK_EVENT_LINK = "https://rally.com/yup2ibi6g6";

    // Determine the public path based on the mock link
    const EVENT_SLUG = "yup2ibi6g6"; 
    const EVENT_PAGE_PATH = `/events/${EVENT_SLUG}`; // Example: /events/yup2ibi6g6

    // Retrieve data passed via URL
    const title = searchParams.get("title") || "Event Name";
    const date = searchParams.get("date") || "Date not set";
    const startTime = searchParams.get("startTime") || "";
    const endTime = searchParams.get("endTime") || "";
    const location = searchParams.get("location") || "Location";
    
    // In a real app, you'd fetch the image from a server URL. 
    // For now, we use the default static image.
    const eventImageURL = people; 

    return (
        <div className="w-full max-w-[640px] flex flex-col gap-12 items-center justify-center">
            <div className="flex flex-col justify-center items-center gap-8">
                {/* Celebration Icon */}
                <Image
                    src={globe} 
                    alt="Globe Ill"
                    width={60}
                    height={60}
                /> 
                <div className="flex flex-col gap-2">
                    <h1 className="text-[40px] font-bricolage font-bold text-[#1A1A1A] leading-[110%] tracking-[-1px] text-center">
                        Your event is live!
                    </h1>
                    <p className="text-[#A3A3A3] font-geist text-sm text-center">
                        Time to rally your people
                    </p>
                </div>
            </div>

            {/* Event Card Preview */}
            <div className="flex flex-col gap-6 bg-white border border-[#0000000D] rounded-2xl p-6 w-full shadow-sm shadow-[#1A1A1A0D]">
                {/* Event Image */}
                <div className="relative w-full h-[200px] rounded-[10px] overflow-hidden">
                    <Image 
                        src={eventImageURL} 
                        alt="Event Cover" 
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                {/* Event Details */}
                <div className="space-y-5">
                    <h2 className="font-bricolage text-[22px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-0.5px]">
                        {title}
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#767676] font-geist font-medium text-[15px] leading-[150%] tracking-[-0.2px]">
                            <Calendar className="h-4 w-4 text-[#A3A3A3]" />
                            <span>{date} • {startTime} - {endTime} WAT</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#767676] font-geist font-medium text-[15px] leading-[150%] tracking-[-0.2px]">
                            <MapPin className="h-4 w-4 text-[#A3A3A3]" />
                            <span>{location}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[14px] text-[#767676] font-geist font-medium leading-[150%] tracking-[-0.1px]">Event link</p>
                        <div className="flex items-center justify-between bg-[#FDFDFD] border border-[#FAFAFA] rounded-xl px-4 py-3.5">
                            <span className="font-geist font-medium text-[14px] text-[#A3A3A3] leading-[100%] tracking-[-0.1px] truncate">
                                https://rally.com/yup2ibi6g6
                            </span>
                            <button className="flex items-center gap-1.5 text-[#6A59CE] hover:text-[#5a4cb0] text-sm font-medium font-geist leading-[100%] tracking-[-0.2px] transition-colors cursor-pointer">
                                <LinkIcon className="h-4 w-4" />
                                <span className="">Copy link</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <ShareEventDialog
                            eventLink={MOCK_EVENT_LINK}
                            trigger={
                                <Button className="bg-[#6A59CE] hover:bg-primary/90 text-white font-geist font-semibold text-[15px] px-6 py-4 leading-[135%] tracking-[-0.2px]">
                                    <Image
                                        src={forward}
                                        alt="Forward Logo"
                                        width={20}
                                        height={20} 
                                    />
                                    Share event
                                </Button>
                            }
                        />

                            <Button variant="outline" className="font-geist font-semibold hover:bg-[#F9F9F9] px-6 py-4 leading-[135%] tracking-[-0.2px]">
                                <Link href={EVENT_PAGE_PATH} passHref>
                                    View event page
                                </Link>
                            </Button>
                    </div>
                </div>
            </div>

            {/* Next Steps */}
            <div className="w-full space-y-2">
                <p className="text-[15px] text-[#767676] font-geist font-medium leading-[150%] tracking-[-0.2px]">What happens next?</p>
                <div className="flex flex-col gap-6 border border-[#0000000D] rounded-2xl p-6 bg-white shadow-sm shadow-[#1A1A1A0D]">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-3">
                            <div className="h-8 w-8 bg-[#FFF5EB] rounded-lg flex items-center justify-center shrink-0">
                                <Image
                                    src={group}
                                    alt="Group Icon"
                                    width={20}
                                    height={20} 
                                    className="text-[#FA9874]"
                                />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-[15px] font-medium text-[#333333] font-geist leading-[150%] tracking-[-0.2px]">Watch RSVPs roll in</h4>
                                <p className="text-xs text-[#959595] font-geist font-normal leading-[150%] tracking-[-0.1px]">We&apos;ll notify you when people RSVP</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-8 w-8 bg-[#F5F3FF] rounded-lg flex items-center justify-center shrink-0">
                                <LayoutDashboard className="h-4 w-4 text-[#6A59CE]" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-[15px] font-medium text-[#333333] font-geist leading-[150%] tracking-[-0.2px]">Manage from your dashboard</h4>
                                <p className="text-xs text-[#959595] font-geist font-normal leading-[150%] tracking-[-0.1px]">Update details, view guests, and track your sales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link 
                href="/dashboard/events" 
                className="flex items-center gap-2 text-[#6A59CE] font-geist font-semibold text-[15px] leading-[135%] tracking-[-0.2px] hover:underline"
            >
                Go to dashboard <ArrowRight className="h-4 w-4 animate-out" />
            </Link>
        </div>
    );
}

// Main Page Component Wrapper
const EventSuccessPage = () => {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center py-10 px-4 animate-in fade-in zoom-in-95 duration-500">
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    )
}

export default EventSuccessPage;