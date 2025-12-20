'use client';
import React, { useState } from 'react';
import payout from '@/public/Sidebar/payout.svg';
import forward from '@/public/Sidebar/share_forward_line.svg';
import image1 from "@/public/Sidebar/people-happy.svg";
import image2 from "@/public/Sidebar/link-up.svg";
import image3 from "@/public/Sidebar/sunday-ill.svg";
import image4 from "@/public/Sidebar/sip-ill.svg";
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import EditPayoutModal from '@/app/components/dashboard/payout/edit-payout-modal';


const mockPayouts = [
  { 
    id: 1, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Paid' as const, 
    image: image1 
  },
  { 
    id: 2, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Paid' as const, 
    image: image2 
  },
  { 
    id: 3, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Pending' as const, 
    image: image3 
  },
  { 
    id: 4, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Pending' as const, 
    image: image4 
  },
];

const EmptyPayoutState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-[100px] bg-white text-center space-y-4">
        <Image src={payout} alt="No attendees" width={80} height={80} />
        <div className='space-y-1'>
            <h1 className="font-bricolage text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.7px]">No earnings yet</h1>
            <p className="font-geist font-medium text-[15px] text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">Host a paid event to start earning</p>
        </div>
        <button className="flex gap-2 justify-center bg-[#6A59CE] hover:bg-[#5a4cb0] font-geist font-semibold py-3.5 px-6 text-[15px] text-white rounded-lg leading-[135%] tracking-[-0.2px] cursor-pointer">
            <Image
                src={forward}
                alt='share'
                width={18}
                height={18} 
            />
            <span>Share event</span>
        </button>
    </div>
)

const PayoutPage = () => {
  const router = useRouter();
  const [payFilter, setPayFilter] = useState('All')
  const [hasPayout, setHasPayout] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    bankName: "Zenith Bank",
    accountNumber: 1234551234,
    accountName: "Divine Mere",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleViewAll = () => {
    router.push(`payouts/pay-history`)
  }

  const filteredPayouts = mockPayouts.filter((event) => 
    payFilter === 'All' ? true : event.status === payFilter
  );

  if (mockPayouts.length === 0) {
    return (
    <div className='flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center'>
      <EmptyPayoutState />
    </div>
    )
  }

  return (
  <>
    <div className="flex flex-col gap-8 p-6 md:p-8 w-full max-w-[1200px] mx-auto">
            {/* Page Header */}
            <div className="space-y-1">
                <h1 className="font-bricolage text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">Payouts</h1>
                <p className="font-geist font-medium text-sm text-[#A3A3A3]">Track payments from your events</p>
            </div>

            {/* Top Cards Section: Total Earnings & Payout Account */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Card 1: Total Earnings */}
                <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm flex flex-col justify-between h-[180px]">
                    <div className="h-10 w-10 rounded-full bg-[#EAFBF3] flex items-center justify-center">
                        {/* Using a generic money icon or SVG directly */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#34D399" fillOpacity="0.2"/>
                            <path d="M12 6V18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 9.5C15 9.5 13.5 8.5 12 8.5C10.5 8.5 9.5 9.5 9.5 10.5C9.5 11.5 10.5 12.5 12 12.5C13.5 12.5 14.5 13.5 14.5 14.5C14.5 15.5 13.5 16.5 12 16.5C10.5 16.5 9 15.5 9 15.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <p className="font-geist text-sm text-[#767676] mb-1">From 3 events</p>
                        <h2 className="font-bricolage text-[32px] font-bold text-[#1A1A1A] tracking-[-1px]">₦240,000</h2>
                    </div>
                </div>

                {/* Card 2: Payout Account */}
                <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm flex flex-col justify-between h-[180px]">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-[#F3F0FF] flex items-center justify-center">
                             {/* Bank Icon Placeholder */}
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 21H21" stroke="#6A59CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 21V7L12 3L19 7V21" stroke="#6A59CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 10H15" stroke="#6A59CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <button onClick={() => setEditModalOpen(true)} className="text-[#6A59CE] text-sm font-semibold hover:text-[#5a4cb0] transition-colors">
                            Update
                        </button>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#1A1A1A] text-base mb-1">{bankDetails.bankName}</h3>
                        <p className="font-geist text-sm text-[#767676]">****{bankDetails.accountNumber} • {bankDetails.accountName}</p>
                    </div>
                </div>

            </div>

            {/* Recent Payouts Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bricolage text-lg font-semibold text-[#1A1A1A]">Recent payouts</h2>
                    <button className="flex items-center text-sm font-medium text-[#767676] hover:text-[#1A1A1A] transition-colors" onClick={handleViewAll}>
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>

                {/* Payouts List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mockPayouts.map((payout) => (
                        <div 
                            key={payout.id} 
                            className="bg-white p-4 rounded-xl border border-[#F5F5F5] shadow-sm flex items-start gap-4 hover:border-[#E8E8E8] transition-colors"
                        >
                            {/* Event Image / Thumbnail */}
                            <div className="h-12 w-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden relative">
                                <Image src={payout.image} alt={payout.eventName} fill className="object-cover" />
                                <div className={`w-full h-full ${payout.id === 1 ? 'bg-orange-100' : payout.id === 2 ? 'bg-blue-100' : 'bg-purple-100'}`}></div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-medium text-[#1A1A1A] text-[15px] truncate">{payout.eventName}</h3>
                                    <span className={cn(
                                        "text-[12px] font-semibold px-2 py-0.5 rounded-full",
                                        payout.status === 'Paid' 
                                            ? "bg-[#EAFBF3] text-[#10B981]" 
                                            : "bg-[#FFFBEB] text-[#F59E0B]"
                                    )}>
                                        {payout.status}
                                    </span>
                                </div>
                                <p className="text-[13px] text-[#767676] font-geist mb-1">
                                    {payout.date} • {payout.ticketSold} tickets
                                </p>
                                <p className="text-[15px] font-semibold text-[#1A1A1A] font-bricolage">
                                    {payout.amount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </div>

    <EditPayoutModal
      isOpen={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      onConfirmAdd={handleViewAll}
      initialBankName={bankDetails.bankName}
      initialAccountName={bankDetails.accountName}
      initialAccountNumber={bankDetails.accountNumber} 
    />
  </>
    
  )
}

export default PayoutPage