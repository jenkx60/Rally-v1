"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
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
  DrawerTitle,
  DrawerDescription,
} from '@/app/components/ui/drawer';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';

interface PayoutAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  isEditing: boolean;
}

// --- Shared Form Content ---
const PayoutAccountForm = ({ 
  onClose, 
  onSave, 
  isEditing 
}: { 
  onClose: () => void; 
  onSave: () => void; 
  isEditing: boolean; 
}) => {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const isFormVaild = bank.length > 0 && accountNumber.length >= 10;

  return (
    <div className="space-y-6">
       <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
                <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Bank name</label>
                <Select onValueChange={setBank}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                            <SelectItem value="GTBank">GTBank</SelectItem>
                            <SelectItem value="Access Bank">Access Bank</SelectItem>
                            <SelectItem value="UBA">UBA</SelectItem>
                            <SelectItem value="OPAY">OPAY</SelectItem>
                            <SelectItem value="Kuda">Kuda Microfinance Bank</SelectItem>
                            <SelectItem value="9PSB">9 Payment Service Bank</SelectItem>
                            <SelectItem value="monniepoint">Monniepoint</SelectItem>
                            <SelectItem value="paystack">Paystack Titan</SelectItem>
                            <SelectItem value="firstbank">First Bank</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Account number</label>
                <Input
                    type="text" 
                    placeholder="0123456789" 
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Account name</label>
                <Input 
                    type="text" 
                    placeholder="Divine Mere" 
                    disabled
                    className="text-[#333333] text-[15px] bg-[#FAFAFA] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                />
            </div>
        </div>

      {/* Actions: Full width stack on mobile, Right aligned 50% width split on desktop */}
      <div className="flex gap-2 w-full md:w-[250px] md:ml-auto">
        <button
          onClick={onClose}
          className="w-full md:flex-1 px-5 py-4 rounded-lg border border-[#E5E5E5] font-geist font-semibold text-[#959595] text-[15px] hover:bg-[#F9F9F9] cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!isFormVaild}
          className={cn(
            "w-full px-5 py-4 rounded-lg font-geist font-semibold text-[15px] transition-colors",
            isFormVaild
                ? "bg-[#6A59CE] text-white hover:bg-primary/90 cursor-pointer"
                : "bg-[#F5F5F5] text-[#A3A3A3] cursor-not-allowed"
          )}
        >
          {isEditing ? 'Save changes' : 'Add account'}
        </button>
      </div>
    </div>
  );
};

// --- Shared Header Component ---
const CustomHeader = ({ onClose, isEditing }: { onClose: () => void, isEditing: boolean }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="font-bricolage text-[20px] font-bold text-[#1A1A1A]">
        {isEditing ? 'Edit payout account' : 'Add payout account'}
    </h2>
    {/* Hidden on mobile, visible on desktop */}
    <button 
      onClick={onClose} 
      className="hidden md:block text-[#A3A3A3] hover:text-[#1A1A1A]"
    >
      <X size={20} />
    </button>
  </div>
);

// --- Main Component ---
const PayoutAccountModal: React.FC<PayoutAccountModalProps> = ({ isOpen, onClose, onSave, isEditing }) => {
  const isMobile = useIsMobile();

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  // 1. MOBILE VIEW (Drawer)
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent>
           <VisuallyHidden.Root>
             <DrawerTitle>{isEditing ? 'Edit payout account' : 'Add payout account'}</DrawerTitle>
             <DrawerDescription>Enter bank details</DrawerDescription>
           </VisuallyHidden.Root>

          <div className="p-6">
             <CustomHeader onClose={onClose} isEditing={isEditing} />
             <PayoutAccountForm onClose={onClose} onSave={onSave} isEditing={isEditing} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // 2. DESKTOP VIEW (Dialog)
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[450px] p-6 rounded-2xl gap-0 block [&>button]:hidden">
         <VisuallyHidden.Root>
             <DialogTitle>{isEditing ? 'Edit payout account' : 'Add payout account'}</DialogTitle>
             <DialogDescription>Enter bank details</DialogDescription>
         </VisuallyHidden.Root>

        <CustomHeader onClose={onClose} isEditing={isEditing} />
        <PayoutAccountForm onClose={onClose} onSave={onSave} isEditing={isEditing} />
      </DialogContent>
    </Dialog>
  );
};

export default PayoutAccountModal;