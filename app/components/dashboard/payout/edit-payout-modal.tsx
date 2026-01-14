// import React, { useEffect, useState } from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
// import { X } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// import { Input } from '../../ui/input';
// import { Button } from '../../ui/button';

// interface EditPayoutAccountProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirmAdd: (details: { bankName: string; accountNumber: number; accountName: string; }) => void;
//   children?: React.ReactNode;
//   initialBankName: string;
//   initialAccountNumber: number;
//   initialAccountName: string;
// }

// const EditPayoutModal: React.FC<EditPayoutAccountProps> = ({
//   isOpen,
//   onClose,
//   onConfirmAdd,
//   children,
//   initialAccountName,
//   initialBankName,
//   initialAccountNumber,
// }) => {
//   const [bankName, setBankName] = useState(initialBankName);
//   const [accountNumber, setAccountNumber] = useState<number | ''>(initialAccountNumber);
//   const [accountName, setAccountName] = useState(initialAccountName);

//   const handleSave = () => {
//     // Ensure we pass a valid number back, defaulting to 0 if empty
//     const finalAccountNumber = accountNumber === '' ? 0 : accountNumber;
//     onConfirmAdd({ 
//       bankName, 
//       accountName, 
//       accountNumber: finalAccountNumber 
//     });
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       {/* {children && <DialogTrigger asChild>{children}</DialogTrigger>} */}
//       <DialogContent className='w-[500px] p-8 bg-white rounded-[20px]'>
//         <div className='space-y-8'>
//           <DialogTitle className="">
//             {/* Icon and Title Container */}
//             <div className='flex items-start gap-4'>
//               <div className="w-full flex justify-between">
//                 <h1 className='font-bricolage font-bold text-[20px] leading-[130%] tracking-[-0.7px]'>Edit payout account</h1>
//                 <button 
//                   onClick={onClose}
//                   className="text-[#A3A3A3] hover:text-[#525252] focus:outline-none cursor-pointer"
//                   aria-label="Close"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>
//           </DialogTitle>
//           {/* Body Form */}
//         <div className="space-y-5">
//              {/* Bank Name Field */}
//              <div className="space-y-2">
//                 <label className="font-geist text-[14px] font-medium text-[#1A1A1A]">Bank name</label>
//                 <Select value={bankName} onValueChange={setBankName}>
//                     <SelectTrigger className="w-full h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[15px] font-geist focus:ring-[#6A59CE] focus:ring-offset-0">
//                         <SelectValue placeholder="Select bank" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
//                         <SelectItem value="GTBank">GTBank</SelectItem>
//                         <SelectItem value="Access Bank">Access Bank</SelectItem>
//                         <SelectItem value="UBA">UBA</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//             {/* Account Number Field */}
//             <div className="space-y-2">
//                 <label className="font-geist text-[14px] font-medium text-[#1A1A1A]">Account number</label>
//                 <Input 
//                     value={accountNumber}
//                     onChange={(e) => setAccountNumber(accountNumber)}
//                     className="h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[15px] font-geist focus-visible:ring-[#6A59CE] focus-visible:ring-offset-0 placeholder:text-[#A3A3A3]"
//                     placeholder="0000000000"
//                 />
//             </div>

//             {/* Account Name Field */}
//             <div className="space-y-2">
//                 <label className="font-geist text-[14px] font-medium text-[#1A1A1A]">Account name</label>
//                 <Input 
//                     value={accountName}
//                     onChange={(e) => setAccountName(e.target.value)}
//                     className="h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[15px] font-geist focus-visible:ring-[#6A59CE] focus-visible:ring-offset-0"
//                 />
//             </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="p-6 pt-2 flex gap-3">
//             <Button 
//                 variant="outline" 
//                 onClick={onClose}
//                 className="flex-1 h-12 border-[#E5E5E5] hover:bg-[#F9F9F9] text-[#1A1A1A] font-geist font-semibold text-[15px]"
//             >
//                 Cancel
//             </Button>
//             <Button 
//                 onClick={handleSave}
//                 className="flex-1 h-12 bg-[#6A59CE] hover:bg-[#5a4cb0] text-white font-geist font-semibold text-[15px]"
//             >
//                 Add account
//             </Button>
//         </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default EditPayoutModal

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

interface EditPayoutAccountProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAdd: (details: { bankName: string; accountNumber: string; accountName: string; }) => void;
  children?: React.ReactNode;
  initialBankName: string;
  initialAccountNumber: string;
  initialAccountName: string;
}

// --- Shared Form Content ---
interface EditPayoutFormProps {
  onClose: () => void;
  handleSave: () => void;
  bankName: string;
  setBankName: (value: string) => void;
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  accountName: string;
  setAccountName: (value: string) => void;
}

const EditPayoutForm: React.FC<EditPayoutFormProps> = ({
  onClose,
  handleSave,
  bankName,
  setBankName,
  accountNumber,
  setAccountNumber,
  accountName,
  setAccountName,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Bank Name Field */}
        <div className="flex flex-col gap-1.5">
          <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Bank name</label>
          <Select value={bankName} onValueChange={setBankName}>
            <SelectTrigger className="w-full h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[15px] font-geist focus:ring-[#6A59CE] focus:ring-offset-0">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                    <SelectItem value="GTBank">GTBank</SelectItem>
                    <SelectItem value="Access Bank">Access Bank</SelectItem>
                    <SelectItem value="UBA">UBA</SelectItem>
                    <SelectItem value="OPAY">OPAY</SelectItem>
                    <SelectItem value="Kuda">Kuda Mfb</SelectItem>
                    <SelectItem value="9PSB">9 Payment Service Bank</SelectItem>
                    <SelectItem value="moniepoint">Moniepoint Mfb</SelectItem>
                    <SelectItem value="paystack">Paystack Titan</SelectItem>
                    <SelectItem value="firstbank">First Bank</SelectItem>
                </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Account Number Field */}
        <div className="flex flex-col gap-1.5">
          <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Account number</label>
          <Input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="0123456789"
            className="h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px] placeholder:text-[#A3A3A3]"
          />
        </div>

        {/* Account Name Field */}
        <div className="flex flex-col gap-1.5">
          <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Account name</label>
          <Input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="h-[46px] rounded-lg border-[#E5E5E5] bg-[#FAFAFA] text-[#BFBFBF] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 w-full md:w-[250px] md:ml-auto">
        <button
          onClick={onClose}
          className="w-full md:flex-1 px-5 py-4 rounded-lg border border-[#E5E5E5] font-geist font-medium text-[#959595] text-[15px] hover:bg-[#F9F9F9] cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full px-5 py-4 rounded-lg bg-[#6A59CE] font-geist font-medium text-white hover:bg-[#5a4cb0] text-[15px] transition-colors cursor-pointer"
        >
          Add account
        </button>
      </div>
    </div>
  );
};

// --- Shared Header Component ---
const CustomHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className='font-bricolage font-bold text-[20px] leading-[130%] tracking-[-0.7px] text-[#1A1A1A]'>
        Edit payout account
    </h1>
    {/* Hidden on mobile, visible on desktop */}
    <button
      onClick={onClose}
      className="hidden md:block text-[#A3A3A3] hover:text-[#525252] focus:outline-none cursor-pointer"
      aria-label="Close"
    >
      <X size={20} />
    </button>
  </div>
);

// --- Main Component ---
const EditPayoutModal: React.FC<EditPayoutAccountProps> = ({
  isOpen,
  onClose,
  onConfirmAdd,
  initialAccountName,
  initialBankName,
  initialAccountNumber,
}) => {
  const isMobile = useIsMobile();
  
  // State Management
  const [bankName, setBankName] = useState(initialBankName);
  const [accountNumber, setAccountNumber] = useState<string>(initialAccountNumber);
  const [accountName, setAccountName] = useState(initialAccountName);

  const handleSave = () => {
    // Ensure we pass a valid number back, defaulting to 0 if empty
    const finalAccountNumber = accountNumber === '' ? '' : accountNumber;
    onConfirmAdd({
      bankName,
      accountName,
      accountNumber: finalAccountNumber,
    });
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  // 1. MOBILE VIEW (Drawer)
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <VisuallyHidden.Root>
            <DrawerTitle>Edit payout account</DrawerTitle>
            <DrawerDescription>Edit your bank details</DrawerDescription>
          </VisuallyHidden.Root>

          <div className="p-6">
            <CustomHeader onClose={onClose} />
            <EditPayoutForm 
                onClose={onClose} 
                handleSave={handleSave}
                bankName={bankName}
                setBankName={setBankName}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                accountName={accountName}
                setAccountName={setAccountName}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // 2. DESKTOP VIEW (Dialog)
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[500px] p-8 bg-white rounded-[20px] gap-0 block [&>button]:hidden">
        <VisuallyHidden.Root>
          <DialogTitle>Edit payout account</DialogTitle>
          <DialogDescription>Edit your bank details</DialogDescription>
        </VisuallyHidden.Root>

        <CustomHeader onClose={onClose} />
        <EditPayoutForm 
            onClose={onClose} 
            handleSave={handleSave}
            bankName={bankName}
            setBankName={setBankName}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            accountName={accountName}
            setAccountName={setAccountName}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditPayoutModal;