import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import payout from '@/public/Sidebar/payout.svg';

interface PayoutsEmptyStateProps {
    onCreateEvent: () => void;
}

const PayoutsEmptyState: React.FC<PayoutsEmptyStateProps> = ({ onCreateEvent }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 bg-white text-center space-y-4">
            <Image src={payout} alt="No earnings" width={80} height={80} priority={true} />
            <div className='space-y-1'>
                <h1 className="font-bricolage text-[18px] font-semibold text-[#1A1A1A] leading-[120%] tracking-[-0.6px]">No earnings yet</h1>
                <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">Host a paid event to start earning</p>
            </div>
             <button 
              onClick={onCreateEvent}
              className="flex items-center gap-1.5 bg-[#6A59CE] hover:bg-primary/90 text-white font-geist font-medium pl-4 pr-5 py-3 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className='w-5 h-5' />
              <span className='font-geist font-semibold text-sm leading-[135%] tracking-[-0.2px]'>Create event</span>
            </button>
        </div>
    );
};

export default PayoutsEmptyState;
