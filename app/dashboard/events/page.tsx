'use client';
import Image from 'next/image'
import plus from '@/public/Sidebar/add_line.svg'
import newEvent from '@/public/new-event.svg'
import React from 'react'
import { Button } from '@/app/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const EventsPage = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center'>
      <div>
        <Image 
          src={newEvent}
          alt="New Event Image"
          width={80}
          height={80}
        />
      </div>
      <div className='flex flex-col gap-1 items-center text-center'>
        <h1 className='font-bricolage font-semibold text-[20px] leading-[130%] tracking-[-0.7px] text-center'>No events yet</h1>
        <p className='font-geist font-medium text-[14px] leading-[150%] tracking-[-0.1px] text-[#A3A3A3]'>Let&apos;s create your first event!</p>
      </div>
      <div>
        <Button
          onClick={() => router.push('/dashboard/events/create')}
        >
          <Image 
            src={plus}
            alt="Plus Icon"
            width={18}
            height={18}
            className='pb-0.5'
          />
          {/* <Plus className='w-[50px] h-[50px]' /> */}
          <span className='font-geist font-semibold text-[15px] leading-[150%] tracking-[-0.2px]'>Create event</span>
        </Button>
      </div>
    </div>
  )
}

export default EventsPage