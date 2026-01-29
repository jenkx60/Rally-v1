import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import newEvent from "@/public/new-event.svg";

const EventsEmptyState: React.FC = () => {
    const router = useRouter();
    
    return (
      <div className="flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center">
        <div>
          <Image src={newEvent} alt="New Event Image" width={80} height={80} priority />
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <h1 className="font-bricolage font-semibold text-[18px] leading-[120%] tracking-[-0.6px] text-center">
            No events yet
          </h1>
          <p className="font-geist font-medium text-[14px] leading-[150%] tracking-[-0.1px] text-[#A3A3A3]">
            Let&apos;s create your first event!
          </p>
        </div>
        <button 
          onClick={() => router.push("/dashboard/events/create")}
          className="flex items-center gap-1.5 bg-[#6A59CE] hover:bg-primary/90 text-white font-geist font-medium pl-4 pr-5 py-3 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className='w-5 h-5' />
          <span className='font-geist font-semibold text-[15px] leading-[135%] tracking-[-0.2px]'>Create event</span>
        </button>
      </div>
    );
};

export default EventsEmptyState;
