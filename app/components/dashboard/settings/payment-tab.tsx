import { Plus, X } from 'lucide-react';
import React, { useState } from 'react'

const PaymentTab = () => {
    const [hasAccount, setHasAccount] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddAccount = () => {
        setHasAccount(true);
        setIsModalOpen(false);
    };


  return (
    <>
      <div className="space-y-6 min-h-[400px]">
        {/* Header for Payment Section */}
        <div className="flex justify-between items-center">
             <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A]">Payout account</h2>
             {hasAccount && (
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#6A59CE] text-sm font-semibold hover:underline"
                 >
                    Update
                 </button>
             )}
        </div>

        {!hasAccount ? (
            // EMPTY STATE
            <div className="flex flex-col items-center justify-center py-16 border border-[#F5F5F5] rounded-xl bg-white space-y-4">
                 <div className="w-16 h-16 bg-[#F9F9F9] rounded-2xl flex items-center justify-center mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21H21" /><path d="M5 21V7L12 3L19 7V21" /><path d="M9 10H15" />
                    </svg>
                 </div>
                 <div className="text-center space-y-1">
                    <h3 className="font-bricolage text-[16px] font-semibold text-[#1A1A1A]">No payout account yet</h3>
                    <p className="font-geist text-sm text-[#767676]">Add your bank account to get paid</p>
                 </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#6A59CE] hover:bg-[#5a4cb0] text-white font-geist font-medium px-5 py-2.5 rounded-lg transition-colors mt-2"
                >
                    <Plus size={18} />
                    <span>Add account</span>
                 </button>
            </div>
        ) : (
            // ACTIVE STATE
            <div className="border border-[#E5E5E5] rounded-xl p-6 space-y-8 bg-white">
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#F3F0FF] rounded-lg flex items-center justify-center">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A59CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21H21" /><path d="M5 21V7L12 3L19 7V21" /><path d="M9 10H15" />
                        </svg>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                             <p className="font-geist text-[11px] font-semibold text-[#767676] uppercase tracking-wider mb-1">ACCOUNT NAME</p>
                             <p className="font-geist text-[15px] font-medium text-[#1A1A1A]">Divine Mere</p>
                        </div>
                        <div>
                             <p className="font-geist text-[11px] font-semibold text-[#767676] uppercase tracking-wider mb-1">BANK NAME</p>
                             <p className="font-geist text-[15px] font-medium text-[#1A1A1A]">Zenith Bank</p>
                        </div>
                        <div>
                             <p className="font-geist text-[11px] font-semibold text-[#767676] uppercase tracking-wider mb-1">ACCOUNT NUMBER</p>
                             <p className="font-geist text-[15px] font-medium text-[#1A1A1A]">**** **** 1234</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#F5F5F5] pt-4 flex items-center justify-center gap-2">
                    <span className="font-geist text-sm text-[#767676]">Payouts arrive here 2-3 business days after each event via</span>
                    {/* Placeholder for Paystack logo - text for now or simple SVG */}
                    <span className="font-bold text-[#0BA4DB] flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#0BA4DB"><rect width="24" height="24"/></svg>
                        paystack
                    </span>
                </div>
            </div>
        )}
      </div>

      {/* Reusing Modal Logic */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
             <div className="bg-white w-full max-w-[450px] p-6 rounded-2xl shadow-xl space-y-6 m-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bricolage text-[20px] font-bold text-[#1A1A1A]">
                        {hasAccount ? 'Edit payout account' : 'Add payout account'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-[#A3A3A3] hover:text-[#1A1A1A]">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                     <div className="space-y-1.5">
                        <label className="font-geist text-sm text-[#525252]">Bank name</label>
                        <select className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] bg-white font-geist focus:outline-none focus:border-[#6A59CE]">
                            <option>Zenith Bank</option>
                            <option>GTBank</option>
                            <option>Access Bank</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="font-geist text-sm text-[#525252]">Account number</label>
                        <input type="text" placeholder="0123456789" className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"/>
                    </div>
                    <div className="space-y-1.5">
                        <label className="font-geist text-sm text-[#525252]">Account name</label>
                        <input type="text" placeholder="Account Name" className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"/>
                    </div>
                </div>

                <div className="flex gap-3 pt-2 justify-end">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-2.5 rounded-lg border border-[#E5E5E5] font-geist font-medium text-[#1A1A1A] hover:bg-[#F9F9F9]"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleAddAccount}
                        className="px-5 py-2.5 rounded-lg bg-[#F5F5F5] font-geist font-medium text-[#A3A3A3] hover:bg-[#6A59CE] hover:text-white transition-colors"
                    >
                        {hasAccount ? 'Save changes' : 'Add account'}
                    </button>
                </div>
             </div>
          </div>
      )}
    </>
  );
}

export default PaymentTab