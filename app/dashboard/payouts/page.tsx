'use client';
import React, { useState } from 'react';
import payout from '@/public/Sidebar/payout.svg';
import forward from '@/public/Sidebar/share_forward_line.svg';
import image1 from "@/public/Sidebar/people-happy.svg";
import image2 from "@/public/Sidebar/link-up.svg";
import image3 from "@/public/Sidebar/sunday-ill.svg";
import image4 from "@/public/Sidebar/sip-ill.svg";
import earnings from "@/public/Sidebar/earnings.svg";
import bankHouse from "@/public/Sidebar/banking-fill.svg";
import Image from 'next/image';
import { ChevronRight, Plus } from 'lucide-react';
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
  <div className="flex flex-col items-center justify-center py-12 bg-white text-center space-y-4">
        <Image src={payout} alt="No attendees" width={80} height={80} />
        <div className='space-y-1'>
            <h1 className="font-bricolage text-[18px] font-semibold text-[#1A1A1A] leading-[120%] tracking-[-0.6px]">No earnings yet</h1>
            <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">Host a paid event to start earning</p>
        </div>
         <button 
          className="flex items-center gap-1.5 bg-[#6A59CE] hover:bg-primary/90 text-white font-geist font-medium pl-4 pr-5 py-3 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className='w-5 h-5' />
          <span className='font-geist font-semibold text-[15px] leading-[135%] tracking-[-0.2px]'>Create eventssss</span>
        </button>
    </div>
)

const PayoutPage = () => {
  const router = useRouter();
  const [payFilter, setPayFilter] = useState('All')
  const [hasPayout, setHasPayout] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    bankName: "Zenith Bank",
    accountNumber: 1234,
    accountName: "Divine Mere",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleViewAll = () => {
    router.push(`payouts/pay-history`)
  }

  const filteredPayouts = mockPayouts.filter((event) => 
    payFilter === 'All' ? true : event.status === payFilter
  );

  if (mockPayouts.length !== 0) {
    return (
    <div className='flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center'>
      <EmptyPayoutState />
    </div>
    )
  }

  return (
  <>
    <div className="flex flex-col gap-8 p-0 pb-10 pt-5 md:p-5 w-full">
            {/* Page Header */}
            <div className="space-y-1">
                <h1 className="font-bricolage text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">Payouts</h1>
                <p className="font-geist font-medium text-sm text-[#A3A3A3]">Track payments from your events</p>
            </div>

            {/* Top Cards Section: Total Earnings & Payout Account */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Card 1: Total Earnings */}
                <div className='flex flex-col gap-2'>
                    <h2 className='font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]'>Total earnings</h2>
                    <div className="bg-white p-6 rounded-2xl border border-[#0000000D] flex flex-col gap-8 justify-between md:h-[187px]">
                        <Image src={earnings} alt='Earning Ill' width={48} height={48} />
                        <div className='flex flex-col gap-1'>
                            <p className="font-geist text-sm text-[#767676]">From 3 events</p>
                            <h2 className="font-bricolage text-[28px] font-bold text-[#1A1A1A] tracking-[-1px]">₦240,000</h2>
                        </div>
                    </div>
                </div>

                {/* Card 2: Payout Account */}
                <div className='flex flex-col gap-2'>
                    <h2 className='font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]'>Payout account</h2>
                    <div className="bg-white p-6 rounded-2xl border border-[#0000000D] flex flex-col gap-8 justify-between md:h-[187px]">
                        <div className="flex justify-between items-center">
                            <Image src={bankHouse} alt='Earning Ill' width={48} height={48} />
                            <button onClick={() => setEditModalOpen(true)} className="text-[#6A59CE] text-sm font-semibold hover:text-[#5a4cb0] transition-colors cursor-pointer">
                                Update
                            </button>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h3 className="font-geist font-medium text-[#1A1A1A] text-[15px] leading-[150%] tracking-[-0.2px]">{bankDetails.bankName}</h3>
                            <p className="font-geist font-normal text-sm text-[#333333] leading-[150%] tracking-[-0.1px]">****{bankDetails.accountNumber} • {bankDetails.accountName}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Payouts Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between text-[15px] leading-[150%] tracking-[-0.2px] font-geist font-medium text-[#767676]">
                    <h2>Recent payouts</h2>
                    <button className="flex items-center transition-colors cursor-pointer" onClick={handleViewAll}>
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>

                {/* Payouts List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {mockPayouts.map((payout) => (
                        <div 
                            key={payout.id} 
                            className="bg-white p-5 rounded-2xl border border-[#0000000D] flex items-start gap-4 shadow shadow-[#1A1A1A0D] transition-colors"
                        >
                            {/* Event Image / Thumbnail */}
                            <div className="h-12 w-12 rounded-[6px] bg-gray-100 shrink-0 overflow-hidden relative">
                                <Image src={payout.image} alt={payout.eventName} fill className="object-cover" />
                                <div className={`w-full h-full ${payout.id === 1 ? 'bg-orange-100' : payout.id === 2 ? 'bg-blue-100' : 'bg-purple-100'}`}></div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-geist font-medium text-[#333333] text-[15px] truncate">{payout.eventName}</h3>
                                    <span className={cn(
                                        "text-[12px] font-semibold px-2 py-0.5 rounded-full",
                                        payout.status === 'Paid' 
                                            ? "bg-[#EAFBF3] text-[#10B981]" 
                                            : "bg-[#FFFBEB] text-[#F59E0B]"
                                    )}>
                                        {payout.status}
                                    </span>
                                </div>
                                <p className="text-sm text-[#959595] font-geist font-normal mb-1">
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