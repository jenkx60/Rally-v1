"use client";

import React from "react";
import Image from "next/image";
import x from "@/public/Sidebar/x1.svg";
import instagram from "@/public/Sidebar/instagram1.svg";
import image1 from "@/public/Sidebar/people-happy.svg";
import image2 from "@/public/Sidebar/ice-cream.svg";
import avatar from "@/public/Sidebar/avatar.svg";
import Link from "next/link";

// Mock data to match your screenshot
const pastEvents = [
  {
    id: 1,
    title: "Saints pop-up",
    date: "October 12, 2025 • 12:30PM",
    attended: 24,
    image: image1, // Replace with your actual image path
    status: "paid",
  },
  {
    id: 2,
    title: "Saints pop-up",
    date: "October 12, 2025 • 12:30PM",
    attended: 24,
    image: image2, // Replace with your actual image path
    status: "pending",
  },
];


export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-0 py-10 md:p-12">
      
      {/* --- PROFILE HEADER --- */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        {/* Avatar Ring */}
        <div className="relative rounded-[28px] border-2 border-[#FA9874]">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-[28px] overflow-hidden bg-[#F8F6FD]">
            <Image
              src={avatar} 
              alt="Divine Mere"
              width={75}
              className="object-cover absolute top-5 right-2.5 md:top-7 md:right-4"
              priority={true}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <h1 className="font-geist text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.4px]">
            Divine Mere
          </h1>
          <p className="font-geist text-sm text-[#959595] font-normal leading-[150%] tracking-[-0.1px]">2 events hosted</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2.5 text-[#1A1A1A]">
          <Link href="#" className="hover:opacity-70 transition-opacity">
            <Image
                src={x}
                alt="X (twitter)"
                width={16}
                height={16}
                priority={true}
            />
          </Link>
          <a href="#" className="hover:opacity-70 transition-opacity">
            <Image 
                src={instagram}
                alt="Instagram"
                width={16}
                height={16}
                priority={true}
            />
          </a>
        </div>
      </div>

      {/* --- PAST EVENTS SECTION --- */}
      <div className="w-full space-y-4">
        <h2 className="font-bricolage text-lg font-semibold text-[#333333] self-start leading-[130%] tracking-[-0.5px]">
          Past events
        </h2>

        <div className="space-y-3">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="group flex items-center gap-4 p-5 bg-white border border-[#0000000D] rounded-xl shadow shadow-[#1A1A1A0D] transition-colors"
            >
              {/* Event Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                {/* Fallback color if no image found */}
                <div className="absolute inset-0 bg-[#FFD5B8]/30 flex items-center justify-center text-xs text-gray-400">
                  Img
                </div>
                <Image src={event.image} alt={event.title} fill  className="object-cover" priority={true} />
              </div>

              {/* Event Details */}
              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="font-geist text-[15px] font-medium text-[#333333] leading-[150%] tracking-[-0.2px] truncate">
                  {event.title}
                </h3>
                <div className="flex flex-col gap-0.5 font-geist font-normal leading-[150%] tracking-[-0.1px] text-xs text-[#959595]">
                    <p>{event.date}</p>
                    <p>{event.attended} attended</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}