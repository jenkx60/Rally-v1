'use client';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import image1 from "@/public/Sidebar/people-happy.svg";
import image2 from "@/public/Sidebar/link-up.svg";
import image3 from "@/public/Sidebar/sunday-ill.svg";
import image4 from "@/public/Sidebar/sip-ill.svg";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    image: image3 
  },
  { 
    id: 5, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Paid' as const, 
    image: image4 
  },
  { 
    id: 6, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Pending' as const, 
    image: image3 
  },
  { 
    id: 7, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Paid' as const, 
    image: image1 
  },
  { 
    id: 8, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Paid' as const, 
    image: image2 
  },
  { 
    id: 9, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Pending' as const, 
    image: image4 
  },
  { 
    id: 10, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Paid' as const, 
    image: image3 
  },
  { 
    id: 11, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Pending' as const, 
    image: image1 
  },
  { 
    id: 12, 
    eventName: 'Saints pop-up', 
    date: 'October 12, 2025', 
    ticketSold: 24, 
    amount: '₦140,000', 
    status: 'Paid' as const, 
    image: image4 
  },
];

const HistoryTabs: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab}) => {
    const tabs = ['All', 'Paid', 'Pending'];

    return (
        <div className="flex space-x-2.5 pb-8">
            {tabs.map((tabName) => (
                <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={cn(
                        "py-2 px-3.5 rounded-lg font-geist text-[15px] font-medium leading-6 tracking-normal transition-colors cursor-pointer",
                        activeTab === tabName
                            ? "bg-[#6A59CE] text-white"
                            : "bg-[#F7F7F7] text-[#767676] hover:bg-[#EAEAEA]"
                        )}
                >
                    {tabName}
                </button>
            ))}
        </div>
    );
}

const PayHistoryPage = () => {
    const router = useRouter();
    const [payFilter, setPayFilter] = useState<'All' | 'Paid' | 'Pending'>('All');
    const [visibleCount, setVisibleCount] = useState(4);
    const items_per_page = 6;

    const filteredPayouts = mockPayouts.filter((payout) => 
        payFilter === 'All' ? true : payout.status === payFilter
    );

    const displayedPayouts = filteredPayouts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPayouts.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + items_per_page);
    };

    const handleFilterChange = (option: 'All' | 'Paid' | 'Pending') => {
        setPayFilter(option);
        setVisibleCount(8);
    };

    const filteredOptions: ('All' | 'Paid' | 'Pending')[] = ['All', 'Paid', 'Pending'];

  return (
    <div className="flex flex-col gap-8 p-0 pb-10 pt-5 md:p-5">
        <div>
            {/* Back Link */}
            <Link href="/dashboard/payouts" className="flex items-center gap-2 mb-6 font-geist text-sm font-medium text-[#767676] hover:text-[#525252]">
                <ArrowLeft className="w-4 h-4" />
                Back to payouts
            </Link>

            {/* Title */}
            <h1 className="font-bricolage text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">
                Payout history
            </h1>
        </div>

        {/* Filters Tabs */}
        <div className="flex space-x-2.5">
            {filteredOptions.map((option) => (
                <button
                    key={option}
                    onClick={() => setPayFilter(option)}
                    className={cn(
                        "py-2 px-3.5 rounded-lg font-geist text-[15px] font-medium leading-6 tracking-normal transition-colors cursor-pointer",
                        payFilter === option
                            ? "bg-[#6A59CE] text-white"
                            : "bg-[#F7F7F7] text-[#767676] hover:bg-[#EAEAEA]"
                        )}
                >
                    {option}
                </button>
            ))}
        </div>

        {/* Payouts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {displayedPayouts.map((payout) => (
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
                        <p className="text-sm text-[#959595] font-geist font-normal mb-1">{payout.date} • {payout.ticketSold} tickets</p>
                        <p className="text-[15px] font-semibold text-[#1A1A1A] font-bricolage">{payout.amount}</p>
                     </div>
                </div>
            ))}
        </div>
 
        {/* Load More Button */}
        {hasMore && (
            <div className="flex justify-center pt-4">
                <button 
                    className="px-6 py-2.5 border border-[#E8E8E8] rounded-lg font-geist font-medium text-[15px] text-[#1A1A1A] hover:bg-gray-50 transition-colors cursor-pointer" 
                    onClick={handleLoadMore}
                >
                    Load more
                </button>
            </div>
        )}
        
    </div>
  )
}

export default PayHistoryPage