'use client';
import React, { useEffect, useState } from 'react';
import payout from '@/public/Sidebar/payout.svg';
import forward from '@/public/Sidebar/share_forward_line.svg';
import image1 from "@/public/Sidebar/people-happy.webp";
import image2 from "@/public/Sidebar/link-up.webp";
import image3 from "@/public/Sidebar/sunday-ill.webp";
import image4 from "@/public/Sidebar/sip-ill.webp";
import earnings from "@/public/Sidebar/earnings.svg";
import bankHouse from "@/public/Sidebar/banking-fill.svg";
import Image from 'next/image';
import { ChevronRight, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import EditPayoutModal from '@/app/components/dashboard/payout/edit-payout-modal';
import PayoutsEmptyState from '@/app/components/dashboard/empty-states/payouts-empty-state';
import { useAuthStore } from "@/src/store/auth.store";
import { useDataStore } from "@/src/store/data.store";
import { PayoutData } from "@/src/types";

const PayoutPage = () => {
  const router = useRouter();
  const { user, userEventCount } = useAuthStore();
  const { payouts, isLoading: isDataLoading, fetchData } = useDataStore();
  const [payFilter, setPayFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    bankName: "Zenith Bank",
    accountNumber: "1234",
    accountName: "Divine Mere",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
     setIsLoading(isDataLoading);
  }, [isDataLoading]);


  const handleViewAll = () => {
    router.push(`payouts/pay-history`);
  };

  const filteredPayouts = payouts.filter((event) => 
    payFilter === 'All' ? true : event.status === payFilter
  );

  // if (mockPayouts.length === 0) {}
  if (isLoading) {
    return (
        <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#6A59CE]" />
        </div>
    )
  }

  if (payouts.length === 0) {
    return (
    <div className='flex flex-col gap-4 h-[calc(100vh-100px)] w-full items-center justify-center'>
      <PayoutsEmptyState onCreateEvent={() => router.push('/dashboard/events/create')} />
    </div>
    )
  }

  return (
  <>
    <div className="flex flex-col gap-12 p-0 pb-10 pt-5 md:p-5 w-full max-w-[1200px] mx-auto">
            {/* Page Header */}
            <div className="space-y-1">
                <h1 className="font-bricolage text-[28px] md:text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">Payouts</h1>
                <p className="font-geist font-medium text-sm text-[#A3A3A3]">Track payments from your events</p>
            </div>

            {/* Top Cards Section: Total Earnings & Payout Account */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Card 1: Total Earnings */}
                <div className='flex flex-col gap-2'>
                    <h2 className='font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]'>Total earnings</h2>
                    <div className="bg-white p-6 rounded-2xl border border-[#0000000D] flex flex-col gap-8 justify-between md:h-[187px]">
                        <Image src={earnings} alt='Earning Ill' width={48} height={48} priority={true} />
                        <div className='flex flex-col gap-1'>
                            <p className="font-geist text-sm text-[#A3A3A3]">From 3 events</p>
                            <h2 className="font-bricolage text-[24px] font-bold text-[#1A1A1A] tracking-[-0.5px] leading-[120%]">₦240,000</h2>
                        </div>
                    </div>
                </div>

                {/* Card 2: Payout Account */}
                <div className='flex flex-col gap-2'>
                    <h2 className='font-geist font-medium text-[15px] text-[#767676] leading-[150%] tracking-[-0.2px]'>Payout account</h2>
                    <div className="bg-white p-6 rounded-2xl border border-[#0000000D] flex flex-col gap-8 justify-between md:h-[187px]">
                        <div className="flex justify-between items-center">
                            <Image src={bankHouse} alt='Earning Ill' width={48} height={48} priority={true} />
                            <button onClick={() => setEditModalOpen(true)} className="text-[#6A59CE] text-sm font-semibold font-geist hover:text-[#5a4cb0] transition-colors cursor-pointer">
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
                    {filteredPayouts.map((payout) => (
                        <div 
                            key={payout.id} 
                            className="bg-white p-5 rounded-2xl border border-[#0000000D] flex items-start gap-4 shadow shadow-[#E8E8E81A] transition-colors"
                        >
                            {/* Event Image / Thumbnail */}
                            <div className="h-12 w-12 rounded-[6px] bg-gray-100 shrink-0 overflow-hidden relative">
                                <Image src={payout.image} alt={payout.eventName} fill className="object-cover" priority={true} />
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
  );
};

export default PayoutPage;