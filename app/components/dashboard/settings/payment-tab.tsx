"use client";
import { Plus } from 'lucide-react';
import Image from 'next/image';
import payout from '@/public/Sidebar/payout-account.svg';
import payoutill from '@/public/Sidebar/payout-ill.svg';
import paystack from '@/public/Sidebar/paystack_logo.svg';
import React, { useState } from 'react'
import PayoutAccountModal from './payout-account-modal';

const PaymentTab = () => {
    const [hasAccount, setHasAccount] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveAccount = () => {
        setHasAccount(true);
        setIsModalOpen(false);
    };

  return (
    <>
      <div className="space-y-6 min-h-[400px]">
        {!hasAccount ? (
            // EMPTY STATE
            <div className="flex flex-col items-center justify-center py-28 bg-white gap-4">
                 <div className="w-16 h-16 bg-[#F9F9F9] rounded-2xl flex items-center justify-center mb-2">
                    <Image src={payout} alt='Payout Illustration' width={80} height={80} />
                 </div>
                 <div className="text-center space-y-1">
                    <h3 className="font-bricolage text-[18px] font-semibold text-[#1A1A1A] leading-[120%] tracking-[-0.6px]">No payout account yet</h3>
                    <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">Add your bank account to get paid</p>
                 </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 bg-[#6A59CE] hover:bg-primary/90 text-white font-geist font-medium pl-4 pr-5 py-4 rounded-md transition-colors cursor-pointer"
                >
                    <Plus className='w-5 h-5' />
                    <span className='font-geist font-semibold text-[15px] leading-[135%] tracking-[-0.2px]'>Add account</span>
                 </button>
            </div>
        ) : (
            // ACTIVE STATE
            <div className="border border-[#0000000D] rounded-2xl p-5 md:p-6 space-y-6 bg-white shadow shadow-[#1A1A1A0D]">
                <div className="flex justify-between items-center">
                    <h2 className="font-bricolage text-[18px] font-semibold text-[#333333] leading-[130%] tracking-[-0.5px]">Payout account</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#6A59CE] text-sm md:text-[15px] font-semibold leading-[135%] tracking-[-0.2px] hover:underline"
                    >
                        Update
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-start">
                        <Image src={payoutill} alt='Payout Illustration' width={40} height={40} />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 leading-[150%] tracking-[-0.1px]">
                        <div className='flex flex-col gap-1'>
                             <p className="font-geist text-xs font-medium text-[#959595] uppercase">ACCOUNT NAME</p>
                             <p className="font-geist text-[15px] font-medium text-[#333333]">Divine Mere</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                             <p className="font-geist text-xs font-medium text-[#959595] uppercase">BANK NAME</p>
                             <p className="font-geist text-sm font-medium text-[#333333]">Zenith Bank</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                             <p className="font-geist text-xs font-medium text-[#959595] uppercase">ACCOUNT NUMBER</p>
                             <p className="font-geist text-sm font-medium text-[#333333]">**** **** 1234</p>
                        </div>
                    </div>
                </div>

                <hr className='border-[#0000000D]'/>

                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <span className="font-geist text-xs md:text-[13px] text-[#959595] leading-[150%] tracking-[-0.1px]">Payouts arrive here 2-3 business days after each event via</span>
                    <Image src={paystack} alt='paystake logo' width={60} height={10.6} />
                </div>
            </div>
        )}
      </div>

      <PayoutAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAccount}
        isEditing={hasAccount} 
      />
    </>
  );
}

export default PaymentTab