import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import React from 'react'

type ToastVariant = "success" | "error";

interface CustomToastProps {
    message: string;
    onDismiss: () => void;
    className?: string;
    variant?: ToastVariant
}

const CustomToast = ({ message, onDismiss, className, variant = "error" }: CustomToastProps) => {
    const isSuccess = variant === "success";
    const parsedVariant = isSuccess ? "success" : "error";
    const iconBgColor = isSuccess ? "bg-[#10B981]" : "bg-[#EF4444]";
    const IconImage = isSuccess ? Check : X;

  return (
    <div 
        className={cn("bg-[#1A1A1A] text-white px-4 py-3 rounded-md shadow-lg flex items-center justify-center gap-3 w-full md:min-w-fit md:max-w-fit ml-0 md:ml-14 border border-[#333] animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-bottom-0 md:slide-in-from-right-4 duration-300", className
    )}>    
        {/* <div className="bg-[#EF4444] rounded-full p-0.5 shrink-0 flex items-center justify-center">
            <X className="w-3 h-3 text-black" strokeWidth={3} />
        </div> */}
        <div 
            className={cn("rounded-full p-0.5 shrink-0 flex items-center justify-center", isSuccess ? "bg-[#10B981]" : "bg-[#EF4444]")}
        >
            {isSuccess ? (
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
            ) : (
                <X className="w-3 h-3 text-black" strokeWidth={3} />
            )}
        </div>
        <span className="font-medium text-sm font-geist whitespace-nowrap">{message}</span>
        <div className="hidden md:block w-0.5 h-6 bg-[#333333] ml-auto"></div>
        <button 
            onClick={onDismiss} 
            className="ml-auto text-white hover:text-white/80 transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Dismiss"
        >
            <X className="w-4 h-4" />
        </button>
    </div>
  )
}

export default CustomToast