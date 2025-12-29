"use client";
import React from 'react';
import { AlertTriangle, Mail, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/app/components/ui/drawer';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"; // To satisfy accessibility requirements without altering your UI
import { Input } from '../../ui/input';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Shared Form Content Component
const DeleteAccountForm = ({ 
  onClose, 
  handleDelete 
}: { 
  onClose: () => void; 
  handleDelete: () => void; 
}) => {
  return (
    <div className="space-y-6">
      {/* Support Link */}
      <div className="bg-[#F8F6FD] p-3 rounded-lg flex justify-center text-center gap-2 border border-[#E1DEF5] leading-[150%] tracking-[-0.1px]">
        <Mail className='w-5 h-5 text-[#6A59CE]' />
        <span className="font-geist text-sm text-[#6A59CE] font-medium cursor-pointer">
          Need help? Contact support instead
        </span>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-geist font-medium text-sm text-[#484848] leading-[150%] tracking-[-0.1px]">
            Why are you leaving? <span className="text-[#AAAAAA] font-normal">(Optional)</span>
          </label>
          <textarea
            className="w-full h-24 p-3 rounded-xl border border-[#E8E8E8] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE] placeholder:text-[15px] placeholder:text-[#BFBFBF] resize-none"
            placeholder="Help us improve Rally..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">
            Confirm your email address
          </label>
          <Input
            type="text"
            placeholder="Enter email address"
            className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">
            Type “delete my account” to confirm
          </label>
          <Input
            type="text"
            placeholder="Type here..."
            className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 w-full md:w-[300px] md:ml-auto">
        <button
          onClick={onClose}
          className="w-full md:flex-1 px-5 py-4 rounded-lg border border-[#E8E8E8] font-geist font-medium text-[#959595] text-[15px] hover:bg-[#F9F9F9] cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="w-full px-5 py-4 rounded-lg bg-[#F5F5F5] font-geist font-medium text-[#A3A3A3] text-[15px] hover:bg-[#EF4444] hover:text-white transition-colors cursor-pointer"
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

// --- Shared Header Component ---
const CustomHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-between items-start mb-6">
    <div className="space-y-4">
        <div className='flex justify-between'>
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0">
                <AlertTriangle className="text-[#EF4444] w-5 h-5" />
            </div>
            {/* <div> */}
                <button onClick={onClose} className="text-[#A3A3A3] hover:text-[#1A1A1A] md:block hidden">
                    <X size={20} />
                </button>
            {/* </div> */}
        </div>
        <div className="space-y-1">
            <h2 className="font-bricolage text-xl md:text-[22px] font-bold text-[#1A1A1A] leading-[120%] tracking-[0.5px]">Sure you want to leave?</h2>
            <p className="font-geist font-medium text-[13px] md:text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">You&apos;ll permanently lose all events, attendee data, and pending payouts</p>
        </div>
    </div>
  </div>
);


// --- Main Modal Component ---
const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleDelete = () => {
    router.push('/signup');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  // 1. MOBILE VIEW (Drawer)
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent>
           {/* Accessibility Hidden Title for Screen Readers to avoid warnings */}
           <VisuallyHidden.Root>
             <DrawerTitle>Delete Account</DrawerTitle>
             <DrawerDescription>Confirm deletion of account</DrawerDescription>
           </VisuallyHidden.Root>

          <div className="p-6">
             <CustomHeader onClose={onClose} />
             <DeleteAccountForm onClose={onClose} handleDelete={handleDelete} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // 2. DESKTOP VIEW (Dialog)
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="max-w-[600px] p-5 rounded-2xl gap-0 block [&>button]:hidden" 
      >
         {/* Accessibility Hidden Title */}
         <VisuallyHidden.Root>
             <DialogTitle>Delete Account</DialogTitle>
             <DialogDescription>Confirm deletion of account</DialogDescription>
         </VisuallyHidden.Root>

        <CustomHeader onClose={onClose} />
        <DeleteAccountForm onClose={onClose} handleDelete={handleDelete} />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;