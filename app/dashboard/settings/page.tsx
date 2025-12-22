'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';

// We will define these components in the same file for simplicity, 
// or you can split them into app/components/dashboard/settings/... 
// based on your preference. For this response, I will include them here 
// to ensure you have the full working code in one copy-pasteable block 
// but logically separated.

import AccountTab from '@/app/components/dashboard/settings/account-tab';
import PaymentTab from '@/app/components/dashboard/settings/payment-tab';
import PreferencesTab from '@/app/components/dashboard/settings/preferences-tab';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'payment' | 'preferences'>('account');

  // Helper for tab capitalization
  const getTabLabel = (tab: string) => tab.charAt(0).toUpperCase() + tab.slice(1);

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto p-6 md:p-8 space-y-8">
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
      <div className="flex gap-1 bg-transparent">
        {(['account', 'payment', 'preferences'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-lg font-geist font-medium text-[14px] transition-all",
              activeTab === tab
                ? "bg-[#6A59CE] text-white shadow-sm"
                : "bg-[#F5F5F5] text-[#767676] hover:bg-[#E8E8E8]"
            )}
          >
            {getTabLabel(tab)}
          </button>
        ))}
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