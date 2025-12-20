import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface EditPayoutAccountProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAdd: (details: { bankName: string; accountNumber: number; accountName: string; }) => void;
  children?: React.ReactNode;
  initialBankName: string;
  initialAccountNumber: number;
  initialAccountName: string;
}

const EditPayoutModal: React.FC<EditPayoutAccountProps> = ({
  isOpen,
  onClose,
  onConfirmAdd,
  children,
  initialAccountName,
  initialBankName,
  initialAccountNumber,
}) => {
  const [bankName, setBankName] = useState(initialBankName);
  const [accountNumber, setAccountNumber] = useState<number | ''>(initialAccountNumber);
  const [accountName, setAccountName] = useState(initialAccountName);

  const handleSave = () => {
    // Ensure we pass a valid number back, defaulting to 0 if empty
    const finalAccountNumber = accountNumber === '' ? 0 : accountNumber;
    onConfirmAdd({ 
      bankName, 
      accountName, 
      accountNumber: finalAccountNumber 
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* {children && <DialogTrigger asChild>{children}</DialogTrigger>} */}
      <DialogContent className='w-[500px] p-8 bg-white rounded-[20px]'>
        <div className='space-y-8'>
          <DialogTitle className="">
            {/* Icon and Title Container */}
            <div className='flex items-start gap-4'>
              <div className="w-full flex justify-between">
                <h1 className='font-bricolage font-bold text-[20px] leading-[130%] tracking-[-0.7px]'>Edit payout account</h1>
                <button 
                  onClick={onClose}
                  className="text-[#A3A3A3] hover:text-[#525252] focus:outline-none cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
          </DialogTitle>
          {/* Body Form */}
        <div className="space-y-5">
             {/* Bank Name Field */}
             <div className="space-y-2">
                <label className="font-geist text-[14px] font-medium text-[#1A1A1A]">Bank name</label>
                <Select value={bankName} onValueChange={setBankName}>
                    <SelectTrigger className="w-full h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[15px] font-geist focus:ring-[#6A59CE] focus:ring-offset-0">
                        <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                        <SelectItem value="GTBank">GTBank</SelectItem>
                        <SelectItem value="Access Bank">Access Bank</SelectItem>
                        <SelectItem value="UBA">UBA</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Account Number Field */}
            <div className="space-y-2">
                <label className="font-geist text-[14px] font-medium text-[#1A1A1A]">Account number</label>
                <Input 
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(accountNumber)}
                    className="h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[15px] font-geist focus-visible:ring-[#6A59CE] focus-visible:ring-offset-0 placeholder:text-[#A3A3A3]"
                    placeholder="0000000000"
                />
            </div>

            {/* Account Name Field */}
            <div className="space-y-2">
                <label className="font-geist text-[14px] font-medium text-[#1A1A1A]">Account name</label>
                <Input 
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="h-[46px] rounded-lg border-[#E5E5E5] bg-white text-[15px] font-geist focus-visible:ring-[#6A59CE] focus-visible:ring-offset-0"
                />
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 flex gap-3">
            <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1 h-12 border-[#E5E5E5] hover:bg-[#F9F9F9] text-[#1A1A1A] font-geist font-semibold text-[15px]"
            >
                Cancel
            </Button>
            <Button 
                onClick={handleSave}
                className="flex-1 h-12 bg-[#6A59CE] hover:bg-[#5a4cb0] text-white font-geist font-semibold text-[15px]"
            >
                Add account
            </Button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPayoutModal