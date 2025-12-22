'use client';

import React, { useState } from 'react';
import { Switch } from '@/app/components/ui/switch';

// Simple Switch Component if you don't have shadcn installed yet
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
        <div className="space-y-4">
             <h3 className="font-geist text-sm font-medium text-[#525252]">Activity</h3>
             <div className="border border-[#E5E5E5] rounded-xl bg-white divide-y divide-[#F5F5F5]">
                
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-geist font-medium text-[#1A1A1A]">Event updates</p>
                        <p className="font-geist text-sm text-[#767676]">New attendees, event changes</p>
                    </div>
                    <SimpleSwitch checked={preferences.eventUpdates} onCheckedChange={() => toggle('eventUpdates')} />
                </div>

                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-geist font-medium text-[#1A1A1A]">Ticket sales</p>
                        <p className="font-geist text-sm text-[#767676]">Real-time notifications</p>
                    </div>
                    <SimpleSwitch checked={preferences.ticketSales} onCheckedChange={() => toggle('ticketSales')} />
                </div>
             </div>
        </div>

        {/* Financial Section */}
        <div className="space-y-4">
             <h3 className="font-geist text-sm font-medium text-[#525252]">Financial</h3>
             <div className="border border-[#E5E5E5] rounded-xl bg-white">
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-geist font-medium text-[#1A1A1A]">Payout received</p>
                        <p className="font-geist text-sm text-[#767676]">Get notified when a payout lands</p>
                    </div>
                    <SimpleSwitch checked={preferences.payoutReceived} onCheckedChange={() => toggle('payoutReceived')} />
                </div>
             </div>
        </div>

        {/* News & Updates Section */}
        <div className="space-y-4">
             <h3 className="font-geist text-sm font-medium text-[#525252]">News & updates</h3>
             <div className="border border-[#E5E5E5] rounded-xl bg-white divide-y divide-[#F5F5F5]">
                
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-geist font-medium text-[#1A1A1A]">Weekly summary</p>
                        <p className="font-geist text-sm text-[#767676]">Get a recap every Sunday</p>
                    </div>
                    <SimpleSwitch checked={preferences.weeklySummary} onCheckedChange={() => toggle('weeklySummary')} />
                </div>

                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-geist font-medium text-[#1A1A1A]">Feature launches</p>
                        <p className="font-geist text-sm text-[#767676]">Stay in the loop when we drop new stuff</p>
                    </div>
                    <SimpleSwitch checked={preferences.featureLaunches} onCheckedChange={() => toggle('featureLaunches')} />
                </div>
             </div>
        </div>

    </div>
  );
};

export default PreferencesTab;