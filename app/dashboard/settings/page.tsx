'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import AccountTab from '@/app/components/dashboard/settings/account-tab';
import PaymentTab from '@/app/components/dashboard/settings/payment-tab';
import PreferencesTab from '@/app/components/dashboard/settings/preferences-tab';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'payment' | 'preferences'>('account');

  // Helper for tab capitalization
  const getTabLabel = (tab: string) => tab.charAt(0).toUpperCase() + tab.slice(1);

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto p-0 md:py-10 md:p-12 space-y-12">
      <div className='space-y-8'>
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="font-bricolage text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">
            Settings
          </h1>
          <p className="font-geist text-[15px] text-[#A3A3A3]">
            {activeTab === 'account' && "Keep your account and payments in sync"}
            {activeTab === 'payment' && "Manage your account, payments, and preferences all in one place"}
            {activeTab === 'preferences' && "Keep your account and payments in sync"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-transparent">
          {(['account', 'payment', 'preferences'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "font-geist text-[15px] font-medium px-3.5 py-2 rounded-md leading-6 transition-colors cursor-pointer",
                activeTab === tab
                  ? "text-white bg-[#6A59CE]" 
                  : "text-[#959595] bg-[#F7F7F7] hover:text-[#959595]"
              )}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-2">
        {activeTab === 'account' && <AccountTab />}
        {activeTab === 'payment' && <PaymentTab />}
        {activeTab === 'preferences' && <PreferencesTab />}
      </div>
    </div>
  );
};

export default SettingsPage;