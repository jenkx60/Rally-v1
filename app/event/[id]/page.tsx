"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import rally from '@/public/Logo.svg';
import people from "@/public/Sidebar/people-happy.svg"; // The event image
import avatar1 from "@/public/Sidebar/avatar.svg"; // Mock avatar
import avatar2 from "@/public/Sidebar/avatar-kill.svg"; // Mock avatar
import x from "@/public/Sidebar/x-success.svg";
import insta from "@/public/Sidebar/insta-success.svg";
import face from "@/public/Sidebar/face-success.svg";
import { Instagram, Twitter, Facebook } from "lucide-react"; 
import Notification from "@/app/components/notifications/notification";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { useRouter } from "next/navigation";

const EventDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const handleBackToDash = () => {
    router.push("/dashboard/events")
  } 
  // In a real app, you would use params.id to fetch event data

  
  return (
      <div className="h-screen bg-white flex flex-col font-geist w-full">
        {/* Navbar */}
        <header className="w-full py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 bg-white z-50">
          <Link href="/dashboard">
              <Image
                src={rally}
                alt="Logo"
                width={32}
                height={32}
              />
          </Link>

          {/* Desktop Screen */}
          <div className="">
            <button className="bg-[#6A59CE] hover:bg-primary/90 text-white text-[14px] leading-[135%] tracking-[-0.2px] font-semibold rounded-xl px-6 py-3 cursor-pointer" onClick={handleBackToDash}>
              {/* Sign up */}
              Dashboard
            </button>
          </div>

          {/* Mobile Screen */}
          {/* <div className="block md:hidden">
              <div className="flex items-center gap-3 sm:gap-4">
                  <Notification />
                  <SidebarTrigger className="text-[#1A1A1A] hover:bg-transparent" />
              </div>
          </div> */}
        </header>

        {/* Main Content */}
        <main className="grow flex justify-center py-10 px-4">
          <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            {/* Left Column: Image */}
            <div className="w-full">
              <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#F8F6FD]">
                <Image
                  src={people}
                  alt="Event Cover"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col gap-8">
              {/* Title & Host */}
              <div className="space-y-4">
                <h1 className="font-bricolage text-[28px] md:text-[40px] font-bold leading-[110%] tracking-[-1px] text-[#1A1A1A]">
                  Saints pop-up
                </h1>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-[#F0EEFA] overflow-hidden relative">
                      {/* Host Avatar */}
                      <Image src={avatar1} alt="Divii" layout="fill" objectFit="cover" /> 
                    </div>
                    <span className="text-[15px] text-[#A3A3A3] font-geist font-medium leading-[150%] tracking-[-0.2px]">
                      Hosted by <span className="text-[#333333]">Divii</span>
                    </span>
                  </div>
                  
                  {/* Socials */}
                  <div className="flex items-center gap-1.5 text-[#A3A3A3]">
                    <button className="hover:text-[#1A1A1A] transition-colors"><Image src={x} alt="Twitter" width={28} height={28} className="cursor-pointer" /></button>
                    <button className="hover:text-[#1A1A1A] transition-colors"><Image src={insta} alt="Instagram" width={28} height={28} className="cursor-pointer" /></button>
                  </div>
                </div>
              </div>

              {/* Date, Time, Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#767676]">
                  <Calendar className="h-5 w-5 text-[#A3A3A3]" />
                  <span className="text-[15px] font-medium font-geist leading-[150%] tracking-[-0.2px]">Saturday, October 12th 2025</span>
                </div>
                
                <div className="flex items-center gap-2 text-[#767676]">
                  <Clock className="h-5 w-5 text-[#A3A3A3]" />
                  <span className="text-[15px] font-medium font-geist leading-[150%] tracking-[-0.2px]">3:00 PM - 5:00 PM WAT</span>
                </div>

                <div className="flex items-center gap-2 text-[#767676]">
                  <MapPin className="h-5 w-5 text-[#A3A3A3]" />
                  <div className="flex items-center gap-1.5">
                      <span className="text-[15px] font-medium font-geist leading-[150%] tracking-[-0.2px]">Shore mall, Osapa Lagos, Nigeria</span>
                      <ArrowUpRight className="h-4 w-4 text-[#A3A3A3]" />
                  </div>
                </div>

                {/* Going Count */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex -space-x-2">
                      {/* Mock Avatars for attendees */}
                      <div className="h-7 w-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative"><Image src={avatar1} alt="u1" layout="fill"/></div>
                      <div className="h-7 w-7 rounded-full border-2 border-white bg-gray-300 overflow-hidden relative"><Image src={avatar2} alt="u2" layout="fill"/></div>
                      <div className="h-7 w-7 rounded-full border-2 border-white bg-gray-400 overflow-hidden relative"><Image src={avatar1} alt="u3" layout="fill"/></div>
                  </div>
                  <span className="text-[14px] text-[#A3A3A3] font-medium">+5 going</span>
                </div>
              </div>

              {/* RSVP Button */}
              <Button className="w-full h-[52px] bg-[#6A59CE] hover:bg-primary/90 text-white text-[15px] font-semibold rounded-xl transition-all shadow-sm">
                RSVP
              </Button>

              {/* Description */}
              <div className="space-y-3">
                  <h3 className="text-[14px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">About event</h3>
                  <p className="text-[15px] font-normal leading-[150%] text-[#333333] tracking-[-0.2px]">
                      Vibes & yap — an hour where divii flips the switch on small talk and cranks up playful randomness. Think loose chatter and the kind of conversations that wander into delightful nonsense.
                  </p>
              </div>

            </div>
          </div>
        </main>

        {/* --- Footer --- */}
        <footer className="w-full py-8 border-t border-[#0000000D] max-w-[900px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
                  <Link href="/dashboard">
                      <Image
                        src={rally}
                        alt="Logo"
                        width={32}
                        height={32}
                        className="group-data-[state=collapsed]:hidden"
                      />
                  </Link>
                  <div className="flex gap-2 text-[13px] text-[#959595] font-medium">
                      <Link href="#" className="hover:text-[#1A1A1A]">Help</Link>
                      <span className="text-[#E5E5E5]">|</span>
                      <Link href="#" className="hover:text-[#1A1A1A]">Privacy</Link>
                      <span className="text-[#E5E5E5]">|</span>
                      <Link href="#" className="hover:text-[#1A1A1A]">Terms</Link>
                  </div>
            </div>
            <div className="flex gap-4 text-[#A3A3A3]">
                  <Image src={x} alt="Twitter" width={28} height={28} className="cursor-pointer"/>
                  <Image src={insta} alt="Instagram" width={28} height={28} className="cursor-pointer" />
                  <Image src={face} alt="Facebook" width={28} height={28} className="cursor-pointer" />
            </div>
        </footer>
      </div>    
  );
}

export default EventDetailsPage