import React, { useRef, useState } from 'react'
import { email } from 'zod';
import DeleteAccountModal from './delete-account-modal';
import { Camera, Eye, EyeClosed, EyeOff } from 'lucide-react';
import { CameraLine } from '@mingcute/react';
import Image, { StaticImageData } from 'next/image';
import avatar from "@/public/Sidebar/avatar.svg";
import eyeOpen from "@/public/eye-open.svg";
import camera from "@/public/Sidebar/camera_2.svg";
import { Input } from '../../ui/input';
import { toast } from 'sonner';
import CustomToast from '../../ui/custom-toast';

const AccountTab = () => {
    const [currentPassword, setCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [avatarImageURL, setAvatarImageURL] = useState<string | StaticImageData>(avatar);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        fullName: "Divine Mere",
        email: "divinemere6@gmail.com",
        instagram: "instagram.com",
        twitter: "x.com",
    });
    const [passwordValues, setPasswordValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<{
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    }>({});

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setAvatarImageURL(URL.createObjectURL(file));
      }
    };

    const handleAvatarUploadClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleSaveProfile = () => {
      if (!formData.fullName || !formData.instagram || !formData.twitter) {
        return;
      }

      toast.custom((t) => (
        <CustomToast 
          message="Profile updated"
          variant='success'
          onDismiss={() => toast.dismiss(t)}
        />
      ));
    }

    // const handlePasswordUpdate = () => {
    //   if (!passwordValues.currentPassword || !passwordValues.newPassword || !passwordValues.confirmPassword) {
    //     toast.custom((t) => (
    //       <CustomToast 
    //         message="All password fields are required"
    //         variant='error'
    //         onDismiss={() => toast.dismiss(t)}
    //       />
    //     ));
    //     return;
    //   }

    //   if (passwordValues.currentPassword === passwordValues.newPassword) {
    //     toast.custom((t) => (
    //       <CustomToast 
    //         message="New password cannot be the same as current password"
    //         variant='error'
    //         onDismiss={() => toast.dismiss(t)}
    //       />
    //     ));
    //     return;
    //   }

    //   if (passwordValues.newPassword !== passwordValues.confirmPassword) {
    //     toast.custom((t) => (
    //       <CustomToast 
    //         message="New password and confirm password do not match"
    //         variant='error'
    //         onDismiss={() => toast.dismiss(t)}
    //       />
    //     ));
    //     return;
    //   }

    //   // if (passwordValues.currentPassword && passwordValues.newPassword && passwordValues.confirmPassword) {
    //   //   if (passwordValues.newPassword !== passwordValues.confirmPassword) {
    //   //     return;
    //   //   }
    //   // }
      
    //   toast.custom((t) => (
    //     <CustomToast 
    //       message="Password updated"
    //       variant='success'
    //       onDismiss={() => toast.dismiss(t)}
    //     />
    //   ));

    //   setPasswordValues({
    //     currentPassword: "",
    //     newPassword: "",
    //     confirmPassword: "",
    //   });
    // }

    const handlePasswordUpdate = () => {
      const newErrors: typeof errors = {};

      if (!passwordValues.currentPassword) {
        newErrors.currentPassword = "Required";
      }
      if (!passwordValues.newPassword) {
        newErrors.newPassword = "Required";
      }
      if (!passwordValues.confirmPassword) {
        newErrors.confirmPassword = "Required";
      }

      if (passwordValues.currentPassword && passwordValues.newPassword && passwordValues.currentPassword === passwordValues.newPassword) {
        newErrors.newPassword = "New password cannot be the same as current password";
      }

      if (passwordValues.newPassword && passwordValues.confirmPassword && passwordValues.newPassword !== passwordValues.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      // Success
      toast.custom((t) => (
        <CustomToast 
          message="Password updated"
          variant='success'
          onDismiss={() => toast.dismiss(t)}
        />
      ));

      setPasswordValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    }

  return (
    <div className="flex flex-col gap-12">
      
      {/* My Profile Section */}
      <section className="space-y-6">
        <h2 className="font-bricolage text-[18px] md:text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.5px]">My profile</h2>
        
        {/* Avatar Upload */}
        <div className="relative w-[100px] h-[100px] rounded-[30px] border-2 border-[#FA9874]">
          <div className="relative w-24 h-24 md:w-24 md:h-24 rounded-[28px] overflow-hidden bg-[#F8F6FD]">
            <Image
              src={avatarImageURL} 
              alt="Default Avatar"
              // width={75}
              layout='fill'
              objectFit='cover'
              className="object-cover absolute top-3 right-2.5"
              priority={true}
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          <button 
            type='button'
            onClick={handleAvatarUploadClick}
            className="absolute -bottom-2 -right-2 bg-[#F8F6FD] p-1 rounded-md border-2 border-white text-[#6A59CE] cursor-pointer"
          >
            {/* Camera icon mingCute */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M14.793 3a1.5 1.5 0 0 1 .95.34l.11.1L17.415 5H20a2 2 0 0 1 1.995 1.85L22 7v12a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19V7a2 2 0 0 1 1.85-1.995L4 5h2.586l1.56-1.56a1.5 1.5 0 0 1 .913-.433L9.207 3zm-.207 2H9.414l-1.56 1.56a1.5 1.5 0 0 1-.913.433L6.793 7H4v12h16V7h-2.793a1.5 1.5 0 0 1-.95-.34l-.11-.1zM12 7.5a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6"/></g></svg>
          </button>
        </div>

        {/* Inputs Grid */}
        <div className='flex flex-col gap-4'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Full name</label>
              <Input
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px] rounded-[10px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Email address</label>
              <Input
                type="text" 
                value={formData.email}
                disabled
                className=" bg-[#FAFAFA] text-[#A3A3A3] text-[15px] leading-6 tracking-[-0.1px] font-geist font-medium rounded-[10px]"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-1.5">
              <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Social links</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-geist">
                  <div className="flex h-11 rounded-md border border-[#DFDFDF] overflow-hidden">
                      <span className="flex items-center px-3.5 bg-[#FCFCFC] text-[#959595] rounded-l-md text-[15px] font-normal leading-[150%] tracking-[-0.2px] border-r border-[#E8E8E8]">instagram.com/</span>
                      <Input 
                          type="text" 
                          placeholder="username"
                          className="flex-1 px-3.5 text-[#333333] text-[15px] font-geist font-medium outline-none placeholder:text-[#BFBFBF] placeholder:text-[15px] border-transparent focus:ring-none focus:ring-transparent rounded-[10px]"
                      />
                  </div>
                  <div className="flex h-11 rounded-md border border-[#DFDFDF] overflow-hidden">
                      <span className="flex items-center px-3.5 bg-[#FCFCFC] text-[#959595] rounded-l-md text-[15px] font-normal leading-[150%] tracking-[-0.2px] border-r border-[#E8E8E8]">x.com/</span>
                      <Input 
                          type="text" 
                          placeholder="username"
                          className="flex-1 px-3.5 text-[#333333] text-[15px] font-geist font-medium outline-none placeholder:text-[#BFBFBF] placeholder:text-[15px] border-transparent focus:ring-none focus:ring-transparent rounded-[10px]"
                      />
                  </div>
              </div>
          </div>

          <div className="flex justify-end pt-2">
              <button 
                onClick={handleSaveProfile}
                className="bg-[#6A59CE]  hover:bg-primary/90 text-white text-sm font-geist font-medium py-3 px-[18px] rounded-lg transition-colors leading-[135%] tracking-[-0.2px] cursor-pointer"
              >
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
                    {/* <Input 
                        type={currentPassword ? "text" : "password"}
                        value={passwordValues.currentPassword}
                        onChange={(e) => setPasswordValues({ ...passwordValues, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                        className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                    /> */}
                    <Input 
                        type={currentPassword ? "text" : "password"}
                        value={passwordValues.currentPassword}
                        onChange={(e) => {
                            setPasswordValues({...passwordValues, currentPassword: e.target.value});
                            if (errors.currentPassword) setErrors({...errors, currentPassword: ""});
                        }}
                        placeholder="Enter current password"
                        className={`text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px] rounded-[10px] ${
                            errors.currentPassword 
                                ? 'border-[#FF7C7C] focus-visible:ring-[#FF7C7C] text-[#FF7C7C]' 
                                : ''
                        }`}
                    />
                    <button onClick={() => setCurrentPassword(!currentPassword)} className="absolute right-3 top-3.5 text-[#A3A3A3] hover:text-[#767676] cursor-pointer">
                        {currentPassword ? <EyeClosed size={18} /> : <Image src={eyeOpen} alt='Show password' width={18} height={18} priority={true} />}
                    </button>
                </div>
                {errors.currentPassword && (
                    <p className="text-xs font-geist font-normal text-[#F04438] mt-1 animate-in slide-in-from-top-1">
                        {errors.currentPassword}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                    <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">New password</label>
                    <div className="relative">
                        {/* <Input 
                            type={newPassword ? "text" : "password"}
                            value={passwordValues.newPassword}
                            onChange={(e) => setPasswordValues({ ...passwordValues, newPassword: e.target.value })}
                            placeholder="Enter new password"
                            className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                        /> */}
                        <Input 
                            type={newPassword ? "text" : "password"}
                            value={passwordValues.newPassword}
                            onChange={(e) => {
                                setPasswordValues({...passwordValues, newPassword: e.target.value});
                                if (errors.newPassword) setErrors({...errors, newPassword: ""});
                            }}
                            placeholder="Enter new password"
                            className={`text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px] rounded-[10px] ${
                                errors.newPassword 
                                    ? 'border-[#FF7C7C] focus-visible:ring-[#FF7C7C] text-[#FF7C7C]' 
                                    : ''
                            }`}
                        />
                         <button onClick={() => setNewPassword(!newPassword)} className="absolute right-3 top-3.5 text-[#A3A3A3] hover:text-[#767676] cursor-pointer">
                            {newPassword ? <EyeClosed size={18} /> : <Image src={eyeOpen} alt='New password' width={18} height={18} priority={true} />}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="text-xs font-geist font-normal text-[#F04438] mt-1 animate-in slide-in-from-top-1">
                            {errors.newPassword}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">Confirm new password</label>
                    <div className="relative">
                        {/* <Input 
                            type={confirmPassword ? "text" : "password"}
                            value={passwordValues.confirmPassword}
                            onChange={(e) => setPasswordValues({ ...passwordValues, confirmPassword: e.target.value })}
                            placeholder="Confirm new password"
                            className="text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px]"
                        /> */}
                        <Input 
                            type={confirmPassword ? "text" : "password"}
                            value={passwordValues.confirmPassword}
                            onChange={(e) => {
                                setPasswordValues({...passwordValues, confirmPassword: e.target.value});
                                if (errors.confirmPassword) setErrors({...errors, confirmPassword: ""});
                            }}
                            placeholder="Confirm new password"
                            className={`text-[#333333] text-[15px] font-geist font-medium transition-colors leading-6 tracking-[-0.1px] rounded-[10px] ${
                                errors.confirmPassword 
                                    ? 'border-[#FF7C7C] focus-visible:ring-[#FF7C7C] text-[#FF7C7C]' 
                                    : ''
                            }`}
                        />
                         <button onClick={() => setConfirmPassword(!confirmPassword)} className="absolute right-3 top-3.5 text-[#A3A3A3] hover:text-[#767676] cursor-pointer">
                            {confirmPassword ? <EyeClosed size={18} /> : <Image src={eyeOpen} alt='Show password' width={18} height={18} priority={true} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs font-geist font-normal text-[#F04438] mt-1 animate-in slide-in-from-top-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>
            </div>
        </div>

         <div className="flex justify-end pt-2">
              <button 
                onClick={handlePasswordUpdate}
                className="bg-[#6A59CE]  hover:bg-primary/90 text-white text-sm font-geist font-medium py-3 px-[18px] rounded-lg transition-colors leading-[135%] tracking-[-0.2px] cursor-pointer"
              >
                Update password
            </button>
        </div>
      </section>

      <hr className='border-[#0000000D]'/>

      {/* Delete Account Section */}
      <section className="space-y-4 mb-6 md:mb-0">
         <div className="p-6 border border-[#0000000D] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow shadow-[#E8E8E81A]">
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