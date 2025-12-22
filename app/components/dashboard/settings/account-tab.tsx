import React, { useState } from 'react'
import { email } from 'zod';
import DeleteAccountModal from './delete-account-modal';
import { Camera, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import avatar from "@/public/Sidebar/avatar.svg"

const AccountTab = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "Divine Mere",
        email: "divinemere6@gmail.com",
        instagram: "instagram.com",
        twitter: "x.com",
    });

  return (
    <div className="space-y-12 pb-20">
      
      {/* My Profile Section */}
      <section className="space-y-6">
        <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A]">My profile</h2>
        
        {/* Avatar Upload */}
        <div className="relative w-[100px] h-[100px] group cursor-pointer">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-[#E5E5E5]">
            <Image src={avatar} alt="Profile" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg border border-[#E5E5E5] shadow-sm text-[#6A59CE]">
            <Camera className="w-5 h-5" />
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="font-geist text-sm font-medium text-[#525252]">Full name</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] bg-white text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE] transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-geist text-sm font-medium text-[#525252]">Email address</label>
            <input 
              type="text" 
              value={formData.email}
              disabled
              className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] text-[#767676] font-geist cursor-not-allowed"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-1.5">
            <label className="font-geist text-sm font-medium text-[#525252]">Social links</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex h-11 rounded-lg border border-[#E5E5E5] overflow-hidden">
                    <span className="flex items-center px-3 bg-[#F9F9F9] text-[#A3A3A3] text-sm border-r border-[#E5E5E5]">instagram.com/</span>
                    <input 
                        type="text" 
                        placeholder="username"
                        className="flex-1 px-3 text-[#1A1A1A] font-geist outline-none placeholder:text-[#D4D4D4]"
                    />
                </div>
                <div className="flex h-11 rounded-lg border border-[#E5E5E5] overflow-hidden">
                    <span className="flex items-center px-3 bg-[#F9F9F9] text-[#A3A3A3] text-sm border-r border-[#E5E5E5]">x.com/</span>
                    <input 
                        type="text" 
                        placeholder="username"
                        className="flex-1 px-3 text-[#1A1A1A] font-geist outline-none placeholder:text-[#D4D4D4]"
                    />
                </div>
            </div>
        </div>

        <div className="flex justify-end pt-2">
            <button className="bg-[#6A59CE] hover:bg-[#5a4cb0] text-white font-geist font-medium px-6 py-2.5 rounded-lg transition-colors">
                Save changes
            </button>
        </div>
      </section>

      {/* Security Section */}
      <section className="space-y-6 pt-6 border-t border-[#F5F5F5]">
        <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A]">Security</h2>
        
        <div className="space-y-4">
             <div className="space-y-1.5">
                <label className="font-geist text-sm font-medium text-[#525252]">Current password</label>
                <div className="relative">
                    <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] bg-white text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#A3A3A3] hover:text-[#767676]">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="font-geist text-sm font-medium text-[#525252]">New password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] bg-white text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"
                        />
                         <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#A3A3A3] hover:text-[#767676]">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="font-geist text-sm font-medium text-[#525252]">Confirm new password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] bg-white text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"
                        />
                         <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#A3A3A3] hover:text-[#767676]">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>

         <div className="flex justify-end pt-2">
            <button className="bg-[#6A59CE] hover:bg-[#5a4cb0] text-white font-geist font-medium px-6 py-2.5 rounded-lg transition-colors">
                Update password
            </button>
        </div>
      </section>

      {/* Delete Account Section */}
      <section className="space-y-4 pt-6 border-t border-[#F5F5F5] pb-8">
         <div className="p-6 border border-[#E5E5E5] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <h3 className="font-bricolage text-[16px] font-semibold text-[#1A1A1A]">Delete account</h3>
                <p className="font-geist text-sm text-[#767676]">This action is permanent and can&apos;t be undone</p>
            </div>
            <button 
                onClick={() => setDeleteModalOpen(true)}
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-geist font-medium px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap"
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