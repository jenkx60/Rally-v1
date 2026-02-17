'use client';

import EventAttendeesContent from '@/app/components/dashboard/events/event-attendees-content'
import EventOverviewContent from '@/app/components/dashboard/events/event-overview-content'
import EventSettingsContent from '@/app/components/dashboard/events/event-settings-content'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const EventTabs: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = ['Overview', 'Attendees', 'Settings'];

    return (
        <div className="flex space-x-2.5 pb-12">
            {tabs.map((tabName) => (
                <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={cn(
                        "font-geist text-[15px] font-medium px-3.5 py-2 rounded-md leading-6 transition-colors cursor-pointer",
                        activeTab === tabName
                            ? "text-white bg-[#6A59CE]" 
                            : "text-[#959595] bg-[#F7F7F7] hover:text-[#959595]"
                    )}
                >
                    {tabName}
                </button>
            ))}
        </div>
    );
}

// Main Event Page
const MangeEvent = () => {
    const [activeTab, setActiveTab] = useState('Overview')

    const eventTitle = "Saints pop-up"

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <EventOverviewContent onViewAttendees={() => setActiveTab('Attendees')} />;
            case 'Attendees':
                return <EventAttendeesContent />;
            case 'Settings':
                return <EventSettingsContent />;
            default:
                return null;
        }
    }
  return (
    <div className="flex flex-col p-0 pb-10 pt-5 md:p-5 max-w-[1200px] mx-auto">
        {/* Back Link */}
        <Link href="/dashboard/events" className="flex items-center gap-2 mb-6 font-geist text-sm font-medium text-[#767676] hover:text-[#525252]">
            <ArrowLeft className="w-4 h-4" />
            Back to events
        </Link>

        {/* Title */}
        <h1 className="font-bricolage text-[28px] md:text-[32px] font-bold leading-[120%] tracking-[-0.8px] text-[#1A1A1A] mb-8">
            {eventTitle}
        </h1>

        {/* Tabs */}
        <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <main>
            {renderContent()}
        </main>
    </div>
  )
}

export default MangeEvent