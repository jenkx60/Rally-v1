import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import bird from '@/public/Sidebar/envelope-bird.svg';

interface AttendeesEmptyStateProps {
    onAction: () => void;
    title?: string;
    description?: string;
    buttonText?: string;
    className?: string;
}

const AttendeesEmptyState: React.FC<AttendeesEmptyStateProps> = ({ 
    onAction, 
    title = "No attendees yet", 
    description = "They'll show up here",
    buttonText = "Create event",
    className = "flex flex-col items-center justify-center py-12 px-auto bg-white text-center space-y-4"
}) => {
    return (
        <div className={className}>
            <Image src={bird} alt="No attendees" width={80} height={80} priority={true} />
            <div className='space-y-1'>
                <h1 className="font-bricolage text-[18px] font-semibold text-[#1A1A1A] leading-[120%] tracking-[-0.6px] text-center">{title}</h1>
                <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">{description}</p>
            </div>
             <button 
                onClick={onAction}
                className="flex items-center gap-1.5 bg-[#6A59CE] hover:bg-[#5a4cb0] text-white font-geist font-medium pl-4 pr-5 py-3 rounded-lg transition-colors cursor-pointer"
            >
                <Plus className='w-5 h-5' />
                <span className='font-geist font-semibold text-sm leading-[135%] tracking-[-0.2px]'>{buttonText}</span>
            </button>
        </div>
    );
};

export default AttendeesEmptyState;
