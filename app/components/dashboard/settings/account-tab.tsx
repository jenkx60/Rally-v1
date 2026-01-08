import React, { useState } from 'react'
import { email } from 'zod';
import DeleteAccountModal from './delete-account-modal';
import { Camera, Eye, EyeClosed, EyeOff } from 'lucide-react';
import Image from 'next/image';
import avatar from "@/public/Sidebar/avatar.svg";
import eyeOpen from "@/public/eye-open.svg";
import { Input } from '../../ui/input';

const AccountTab = () => {
    const [currentPassword, setCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "Divine Mere",
        email: "divinemere6@gmail.com",
        instagram: "instagram.com",
        twitter: "x.com",
    });

  return (
    <div className="flex flex-col gap-12">
      
      {/* My Profile Section */}
      <section className="space-y-6">
        <h2 className="font-bricolage text-[18px] md:text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.5px]">My profile</h2>
        
        {/* Avatar Upload */}
        <div className="relative w-[100px] h-[100px] rounded-[28px] border-2 border-[#FA9874]">
          <div className="relative w-24 h-24 md:w-24 md:h-24 rounded-[28px] overflow-hidden bg-[#F8F6FD]">
            <Image
              src={avatar} 
              alt="Divine Mere"
              width={75}
              className="object-cover absolute top-3 right-2.5"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#F8F6FD] p-1 rounded-md border-2 border-white text-[#6A59CE]">
            <Camera className="w-4 h-4" />
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Full name</label>
              <Input
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Email address</label>
              <Input
                type="text" 
                value={formData.email}
                disabled
                className=" bg-[#FAFAFA] text-[#A3A3A3] text-[15px] leading-6 tracking-[-0.1px] font-geist font-medium"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-1.5">
              <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Social links</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex h-11 rounded-lg border border-[#DFDFDF] overflow-hidden">
                      <span className="flex items-center px-3.5 bg-[#FCFCFC] text-[#959595] text-[15px] font-normal leading-[150%] tracking-[-0.2px] border-r border-[#E8E8E8]">instagram.com/</span>
                      <Input 
                          type="text" 
                          placeholder="username"
                          className="flex-1 px-3.5 text-[#333333] text-[15px] font-geist font-medium outline-none placeholder:text-[#BFBFBF] placeholder:text-[15px] border-transparent focus:ring-none focus:ring-transparent"
                      />
                  </div>
                  <div className="flex h-11 rounded-lg border border-[#DFDFDF] overflow-hidden">
                      <span className="flex items-center px-3.5 bg-[#FCFCFC] text-[#959595] text-[15px] font-normal leading-[150%] tracking-[-0.2px] border-r border-[#E8E8E8]">x.com/</span>
                      <Input 
                          type="text" 
                          placeholder="username"
                          className="flex-1 px-3.5 text-[#333333] text-[15px] font-geist font-medium outline-none placeholder:text-[#BFBFBF] placeholder:text-[15px] border-transparent focus:ring-none focus:ring-transparent"
                      />
                  </div>
              </div>
          </div>

          <div className="flex justify-end pt-2">
              <button className="bg-[#6A59CE]  hover:bg-primary/90 text-white text-sm font-geist font-medium py-3 px-[18px] rounded-lg transition-colors leading-[135%] tracking-[-0.2px] cursor-pointer">
                  Save changes
              </button>
          </div>
        </div>
      </section>

      <hr className='border-[#0000000D]'/>

      {/* Security Section */}
      <section className="space-y-6">
        <h2 className="font-bricolage text-[18px] md:text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.7px]">Security</h2>
        
        <div className="space-y-5">
             <div className="flex flex-col gap-1.5">
                <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Current password</label>
                <div className="relative">
                    <Input 
                        type={currentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                    />
                    <button onClick={() => setCurrentPassword(!currentPassword)} className="absolute right-3 top-3.5 text-[#A3A3A3] hover:text-[#767676] cursor-pointer">
                        {currentPassword ? <EyeClosed size={18} /> : <Image src={eyeOpen} alt='Show password' width={18} height={18} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                    <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">New password</label>
                    <div className="relative">
                        <Input 
                            type={newPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                        />
                         <button onClick={() => setNewPassword(!newPassword)} className="absolute right-3 top-3.5 text-[#A3A3A3] hover:text-[#767676] cursor-pointer">
                            {newPassword ? <EyeClosed size={18} /> : <Image src={eyeOpen} alt='New password' width={18} height={18} />}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Confirm new password</label>
                    <div className="relative">
                        <Input 
                            type={confirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                        />
                         <button onClick={() => setConfirmPassword(!confirmPassword)} className="absolute right-3 top-3.5 text-[#A3A3A3] hover:text-[#767676] cursor-pointer">
                            {confirmPassword ? <EyeClosed size={18} /> : <Image src={eyeOpen} alt='Show password' width={18} height={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>

         <div className="flex justify-end pt-2">
              <button className="bg-[#6A59CE]  hover:bg-primary/90 text-white text-sm font-geist font-medium py-3 px-[18px] rounded-lg transition-colors leading-[135%] tracking-[-0.2px] cursor-pointer">
                Update password
            </button>
        </div>
      </section>

      <hr className='border-[#0000000D]'/>

      {/* Delete Account Section */}
      <section className="space-y-4 mb-6 md:mb-0">
         <div className="p-6 border border-[#0000000D] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow shadow-[#1A1A1A0D]">
            <div className="space-y-1.5">
                <h3 className="font-bricolage font-semibold text-[18px] text-[#1A1A1A] leading-[120%] tracking-[-0.6px]">Delete account</h3>
                <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">This action is permanent and can&apos;t be undone</p>
            </div>
            <button 
                onClick={() => setDeleteModalOpen(true)}
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-geist font-medium py-3 px-[18px] rounded-lg transition-colors leading-[135%] tracking-[-0.2px] cursor-pointer"
            >
                Delete account
            </button>
         </div>
      </section>

      <DeleteAccountModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
      />

    </div>
  )
}

export default AccountTab