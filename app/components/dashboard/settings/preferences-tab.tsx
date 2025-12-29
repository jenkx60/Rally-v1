'use client';

import React, { useState } from 'react';
import { Switch } from '@/app/components/ui/switch';

const SimpleSwitch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) => (
    <button 
        onClick={() => onCheckedChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-[#6A59CE]' : 'bg-[#E5E5E5]'}`}
    >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

const PreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    eventUpdates: true,
    ticketSales: false,
    payoutReceived: false,
    weeklySummary: false,
    featureLaunches: false
  });

  const toggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
        {/* Activity Section */}
        <div className="space-y-2">
             <h3 className="font-geist text-sm md:text-[15px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">Activity</h3>
             <div className="border border-[#0000000D] rounded-2xl bg-white shadow shadow-[#1A1A1A0D] p-5 md:p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="font-geist font-medium text-[#333333] text-[15px] leading-[150%] tracking-[-0.2px]">Event updates</p>
                        <p className="font-geist font-normal text-[13px] text-[#959595] leading-[150%] tracking-[-0.1px]">New attendees, event changes</p>
                    </div>
                    <Switch checked={preferences.eventUpdates} onCheckedChange={() => toggle('eventUpdates')} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="font-geist font-medium text-[#333333] text-[15px] leading-[150%] tracking-[-0.2px]">Ticket sales</p>
                        <p className="font-geist font-normal text-[13px] text-[#959595] leading-[150%] tracking-[-0.1px]">Real-time notifications</p>
                    </div>
                    <Switch checked={preferences.ticketSales} onCheckedChange={() => toggle('ticketSales')} />
                </div>
             </div>
        </div>

        {/* Financial Section */}
        <div className="space-y-2">
             <h3 className="font-geist text-sm md:text-[15px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">Financial</h3>
             <div className="border border-[#0000000D] rounded-2xl bg-white shadow shadow-[#1A1A1A0D] p-5 md:p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="font-geist font-medium text-[#333333] text-[15px] leading-[150%] tracking-[-0.2px]">Payout received</p>
                        <p className="font-geist font-normal text-[13px] text-[#959595] leading-[150%] tracking-[-0.1px]">Get notified when a payout lands</p>
                    </div>
                    <Switch checked={preferences.payoutReceived} onCheckedChange={() => toggle('payoutReceived')} />
                </div>
             </div>
        </div>

        {/* News & Updates Section */}
        <div className="space-y-2">
             <h3 className="font-geist text-sm md:text-[15px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">News & updates</h3>
             <div className="border border-[#0000000D] rounded-2xl bg-white shadow shadow-[#1A1A1A0D] p-5 md:p-6 space-y-5">
                
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="font-geist font-medium text-[#333333] text-[15px] leading-[150%] tracking-[-0.2px]">Weekly summary</p>
                        <p className="font-geist font-normal text-[13px] text-[#959595] leading-[150%] tracking-[-0.1px]">Get a recap every Sunday</p>
                    </div>
                    <Switch checked={preferences.weeklySummary} onCheckedChange={() => toggle('weeklySummary')} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="font-geist font-medium text-[#333333] text-[15px] leading-[150%] tracking-[-0.2px]">Feature launches</p>
                        <p className="font-geist font-normal text-[13px] text-[#959595] leading-[150%] tracking-[-0.1px]">Stay in the loop when we drop new stuff</p>
                    </div>
                    <Switch checked={preferences.featureLaunches} onCheckedChange={() => toggle('featureLaunches')} />
                </div>
             </div>
        </div>

    </div>
  );
};

export default PreferencesTab;