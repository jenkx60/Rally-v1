// import { AlertTriangle, X } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React from 'react'

// interface DeleteAccountModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
//     const router = useRouter();

//     if (!isOpen) return null;

//     const handleDelete = () => {
//         router.push('/signup');
//     }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white w-full max-w-[500px] p-6 rounded-2xl shadow-xl space-y-6 m-4">
        
//         {/* Header */}
//         <div className="flex justify-between items-start">
//             <div className="flex gap-4">
//                  <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0">
//                     <AlertTriangle className="text-[#EF4444] w-5 h-5" />
//                  </div>
//                  <div className="space-y-1">
//                     <h2 className="font-bricolage text-xl font-bold text-[#1A1A1A]">Sure you want to leave?</h2>
//                     <p className="font-geist text-sm text-[#767676]">You&apos;ll permanently lose all events, attendee data, and pending payouts</p>
//                  </div>
//             </div>
//              <button onClick={onClose} className="text-[#A3A3A3] hover:text-[#1A1A1A]">
//                 <X size={20} />
//              </button>
//         </div>

//         {/* Support Link */}
//         <div className="bg-[#F9F9F9] p-3 rounded-lg text-center">
//             <p className="font-geist text-sm text-[#6A59CE] font-medium cursor-pointer">
//                 Need help? Contact support instead
//             </p>
//         </div>

//         {/* Form Fields */}
//         <div className="space-y-4">
//             <div className="space-y-1.5">
//                 <label className="font-geist text-sm text-[#525252]">Why are you leaving? <span className="text-[#A3A3A3]">(Optional)</span></label>
//                 <textarea 
//                     className="w-full h-24 p-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE] resize-none"
//                     placeholder="Help us improve Rally..."
//                 />
//             </div>

//             <div className="space-y-1.5">
//                 <label className="font-geist text-sm text-[#525252]">Confirm your email address</label>
//                 <input 
//                     type="text" 
//                     placeholder="Enter email address"
//                     className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"
//                 />
//             </div>

//             <div className="space-y-1.5">
//                 <label className="font-geist text-sm text-[#525252]">Type “delete my account” to confirm</label>
//                 <input 
//                     type="text" 
//                     placeholder="Type here..."
//                     className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"
//                 />
//             </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-3 pt-2 justify-end">
//              <button 
//                 onClick={onClose}
//                 className="px-5 py-2.5 rounded-lg border border-[#E5E5E5] font-geist font-medium text-[#1A1A1A] hover:bg-[#F9F9F9]"
//             >
//                 Cancel
//             </button>
//             <button 
//                 onClick={handleDelete}
//                 className="px-5 py-2.5 rounded-lg bg-[#F5F5F5] font-geist font-medium text-[#A3A3A3] hover:bg-[#EF4444] hover:text-white transition-colors"
//             >
//                 Delete account
//             </button>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default DeleteAccountModal

"use client";

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
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
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"; // Optional: To satisfy accessibility requirements without altering your UI

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Shared Form Content Component ---
// This contains your exact form fields and styling to be used in both Dialog and Drawer
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
      <div className="bg-[#F9F9F9] p-3 rounded-lg text-center">
        <p className="font-geist text-sm text-[#6A59CE] font-medium cursor-pointer">
          Need help? Contact support instead
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="font-geist text-sm text-[#525252]">
            Why are you leaving? <span className="text-[#A3A3A3]">(Optional)</span>
          </label>
          <textarea
            className="w-full h-24 p-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE] resize-none"
            placeholder="Help us improve Rally..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-geist text-sm text-[#525252]">
            Confirm your email address
          </label>
          <input
            type="text"
            placeholder="Enter email address"
            className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-geist text-sm text-[#525252]">
            Type “delete my account” to confirm
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full h-11 px-3 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] font-geist focus:outline-none focus:border-[#6A59CE]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg border border-[#E5E5E5] font-geist font-medium text-[#1A1A1A] hover:bg-[#F9F9F9]"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-5 py-2.5 rounded-lg bg-[#F5F5F5] font-geist font-medium text-[#A3A3A3] hover:bg-[#EF4444] hover:text-white transition-colors"
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

// --- Shared Header Component ---
// Replicates your custom header exactly
const CustomHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-between items-start mb-6">
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0">
        <AlertTriangle className="text-[#EF4444] w-5 h-5" />
      </div>
      <div className="space-y-1">
        {/* We use DialogTitle/DrawerTitle here for accessibility if possible, or wrap them */}
        <h2 className="font-bricolage text-xl font-bold text-[#1A1A1A]">
            Sure you want to leave?
        </h2>
        <p className="font-geist text-sm text-[#767676]">
            You&apos;ll permanently lose all events, attendee data, and pending payouts
        </p>
      </div>
    </div>
    <button onClick={onClose} className="text-[#A3A3A3] hover:text-[#1A1A1A] md:block hidden">
      <X size={20} />
    </button>
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
        className="max-w-[500px] p-6 rounded-2xl gap-0 block [&>button]:hidden" 
        /* [&>button]:hidden hides the default ShadCN close 'X' so your custom one works */
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