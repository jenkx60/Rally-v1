"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import rally from '@/public/Logo.svg';
import people from "@/public/Sidebar/people-happy.svg";
import avatar from "@/public/Sidebar/avatar.svg";
import avatar1 from "@/public/Sidebar/avatar-3eyes.svg";
import avatar2 from "@/public/Sidebar/avatar-full-hair.svg";
import avatar3 from "@/public/Sidebar/avatar-grin.svg";
import avatar4 from "@/public/Sidebar/avatar-manbun.svg";
import x from "@/public/Sidebar/x-success.svg";
import insta from "@/public/Sidebar/insta-success.svg";
import face from "@/public/Sidebar/face-success.svg";
import { Instagram, Twitter, Facebook } from "lucide-react"; 
import Notification from "@/app/components/notifications/notification";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { useRouter } from "next/navigation";
import RsvpModal from "@/app/components/dashboard/events/rsvp-modal";

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
                priority={true}
              />
          </Link>

          {/* Desktop Screen */}
          <div className="">
            <button className="bg-[#6A59CE] hover:bg-primary/90 text-white text-[14px] leading-[135%] tracking-[-0.1px] font-semibold rounded-md px-5 py-2.5 cursor-pointer" onClick={handleBackToDash}>
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
          <div className="w-full max-w-[940px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            {/* Left Column: Image */}
            <div className="w-full">
              <div className="relative aspect-square w-full h-[300px] md:h-[360px] overflow-hidden rounded-[20px] bg-[#F8F6FD]">
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
            <div className="flex flex-col gap-11">
              <div className="space-y-6 md:space-y-6">
                {/* Title & Host */}
                <div className="space-y-4">
                  <h1 className="font-bricolage text-[28px] md:text-[40px] font-bold leading-[110%] tracking-[-1px] text-[#1A1A1A]">
                    Saints pop-up
                  </h1>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-[#F0EEFA] overflow-hidden relative">
                        {/* Host Avatar */}
                        <Image src={avatar} alt="Divii" layout="fill" objectFit="cover" priority={true} /> 
                      </div>
                      <span className="text-[15px] text-[#A3A3A3] font-geist font-medium leading-[150%] tracking-[-0.2px]">
                        Hosted by <span className="text-[#333333]">Divii</span>
                      </span>
                    </div>
                    
                    {/* Socials */}
                    <div className="flex items-center gap-1.5 text-[#A3A3A3]">
                      <button className="hover:text-[#1A1A1A] transition-colors"><Link href="https://x.com/trillestdivii"><Image src={x} alt="Twitter" width={28} height={28} className="cursor-pointer" priority={true} /></Link></button>
                      <button className="hover:text-[#1A1A1A] transition-colors"><Link href="https://www.instagram.com/trillestdivii?igsh=MTE1eXJqOGk0bGVuZg%3D%3D&utm_source=qr"><Image src={insta} alt="Instagram" width={28} height={28} className="cursor-pointer" priority={true} /></Link></button>
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
                        <ArrowUpRight className="h-4 w-4 text-[#A3A3A3] hover:animate-bounce hover:scale-110 transition-all cursor-pointer" />
                    </div>
                  </div>

                  {/* Going Count */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex -space-x-2">
                        {/* Mock Avatars for attendees */}
                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#F0EEFA] overflow-hidden relative"><Image src={avatar1} alt="u1" layout="fill"/></div>
                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#FFECE5] overflow-hidden relative"><Image src={avatar2} alt="u2" layout="fill"/></div>
                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#F0EEFA] overflow-hidden relative"><Image src={avatar3} alt="u3" layout="fill"/></div>
                        <div className="h-7 w-7 rounded-full border-2 border-white bg-[#FFECE5] overflow-hidden relative"><Image src={avatar4} alt="u3" layout="fill"/></div>

                    </div>
                    <span className="text-[14px] text-[#A3A3A3] font-medium">+5 going</span>
                  </div>
                </div>
              </div>

              {/* RSVP Button */}
              <RsvpModal 
                trigger={
                  <Button className="w-full h-[52px] bg-[#6A59CE] hover:bg-primary/90 text-white text-[15px] font-semibold rounded-md transition-all shadow-sm">
                    RSVP
                  </Button>
                }
              />

              {/* Description */}
              <div className="space-y-3">
                  <h3 className="text-[14px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">About event</h3>
                  <p className="text-[15px] font-normal leading-[150%] text-[#333333] tracking-[-0.1px]">
                    Saints Pop-Up is a space to experience the brand in real life. See the pieces up close, feel the details, and soak in the energy. Good clothes, good people, no pressure.
                  </p>
              </div>

            </div>
          </div>
        </main>

        {/* --- Footer --- */}
        <footer className="w-full py-8  border-t border-[#0000000D] max-w-[900px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
                  <Link href="/dashboard">
                      <Image
                        src={rally}
                        alt="Logo"
                        width={32}
                        height={32}
                        className="group-data-[state=collapsed]:hidden"
                        priority={true}
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
                  <Image src={x} alt="Twitter" width={28} height={28} className="cursor-pointer" priority={true}/>
                  <Image src={insta} alt="Instagram" width={28} height={28} className="cursor-pointer" priority={true}/>
                  <Image src={face} alt="Facebook" width={28} height={28} className="cursor-pointer" priority={true}/>
            </div>
        </footer>
      </div>    
  );
}

export default EventDetailsPage