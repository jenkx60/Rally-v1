// import React from 'react';
// import Image from 'next/image';
// import { X, AlertTriangle } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/app/components/ui/button';
// import { 
//     Dialog, 
//     DialogContent, 
//     DialogDescription, 
//     DialogHeader, 
//     DialogTitle, 
//     DialogTrigger 
// } from '@/app/components/ui/dialog';
// import alert from '@/public/Sidebar/alert-triangle.svg';

// // Assuming you have a standard red alert icon asset,
// // but for this prototype, we'll use lucide-react's AlertTriangle and style it red.

// interface DeleteConfirmationModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirmDelete: () => void;
//     children?: React.ReactNode; // To wrap the trigger button
// }

// const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
//     isOpen,
//     onClose,
//     onConfirmDelete,
//     children
// }) => {
//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             {children && <DialogTrigger asChild>{children}</DialogTrigger>}
//             <DialogContent className="w-[420px] p-6 bg-white rounded-2xl">
//                 <div className='space-y-5'>
//                     <DialogHeader className="">
//                         {/* Icon and Title Container */}
//                         <div className='flex items-start gap-4'>
//                             <div className="w-full flex justify-between">
//                                 <Image
//                                     src={alert}
//                                     alt='Alert Triangle'
//                                     width={40}
//                                     height={40}
                                    
//                                 />
//                                 <button 
//                                     onClick={onClose}
//                                     className="text-[#A3A3A3] hover:text-[#525252] focus:outline-none cursor-pointer"
//                                     aria-label="Close"
//                                 >
//                                     <X className="h-6 w-6" />
//                                 </button>
//                             </div>
//                         </div>
//                     </DialogHeader>

//                     {/* Title (The rest of the default DialogHeader content) */}
//                     <div className="flex flex-col space-y-1.5">
//                         <DialogTitle className="font-bricolage text-xl font-bold leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">Delete this event?</DialogTitle>
//                         <DialogDescription className="font-geist font-medium text-[13px] leading-[150%] tracing-[-0.1px] text-[#A3A3A3]">This can&apos;t be undone. Your event and all its details will be gone.</DialogDescription>
//                     </div>
//                 </div>

//                 {/* Footer/Action Buttons */}
//                 <div className="flex justify-end gap-3 leading-[135%] tracking-[-0.2px] mt-3">
//                     <button 
//                         onClick={onClose} 
//                         className="bg-white text-[#959595] border border-[#E8E8E8] hover:bg-[#F7F7F7] font-geist font-semibold py-3 px-[18px] rounded-lg text-sm cursor-pointer"
//                     >
//                         Cancel
//                     </button>
//                     <button 
//                         onClick={onConfirmDelete}
//                         className="bg-[#EF4444] hover:bg-[#D93B3B] font-geist font-semibold py-3 px-[18px] text-sm text-white rounded-lg cursor-pointer"
//                     >
//                         Delete event
//                     </button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default DeleteConfirmationModal;

// "use client";
// import React from 'react';
// import Image from 'next/image';
// import { X } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { 
//     Dialog, 
//     DialogContent, 
//     DialogHeader, 
//     DialogTitle, 
//     DialogTrigger 
// } from '@/app/components/ui/dialog';
// import {
//     Drawer,
//     DrawerContent,
//     DrawerTrigger,
// } from '@/app/components/ui/drawer';
// import alert from '@/public/Sidebar/alert-triangle.svg';
// import { useIsMobile } from '@/hooks/use-mobile';
// import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// interface DeleteConfirmationModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirmDelete: () => void;
//     children?: React.ReactNode;
// }

// const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
//     isOpen,
//     onClose,
//     onConfirmDelete,
//     children
// }) => {
//     const isMobile = useIsMobile();

//     const ModalContent = (
//         <div className="space-y-5">
//             <div className="flex items-start gap-4">
//                 <div className="w-full flex justify-between">
//                     <Image
//                         src={alert}
//                         alt='Alert Triangle'
//                         width={40}
//                         height={40}
//                     />
//                     {!isMobile && (
//                         <button 
//                             onClick={onClose}
//                             className="text-[#A3A3A3] hover:text-[#525252] focus:outline-none cursor-pointer"
//                             aria-label="Close"
//                         >
//                             <X className="h-6 w-6" />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             <div className="flex flex-col space-y-1.5 text-left">
//                 <h2 className="font-bricolage text-xl font-bold leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">
//                     Delete this event?
//                 </h2>
//                 <p className="font-geist font-medium text-[13px] leading-[150%] tracking-[-0.1px] text-[#A3A3A3]">
//                     This can&apos;t be undone. Your event and all its details will be gone.
//                 </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col-reverse md:flex-row justify-end gap-3 leading-[135%] tracking-[-0.2px] pt-2">
//                 <button 
//                     onClick={onClose} 
//                     className="w-full md:w-auto bg-white text-[#959595] border border-[#E8E8E8] hover:bg-[#F7F7F7] font-geist font-semibold py-3 px-[18px] rounded-lg text-sm cursor-pointer"
//                 >
//                     Cancel
//                 </button>
//                 <button 
//                     onClick={onConfirmDelete}
//                     className="w-full md:w-auto bg-[#EF4444] hover:bg-[#D93B3B] font-geist font-semibold py-3 px-[18px] text-sm text-white rounded-lg cursor-pointer"
//                 >
//                     Delete event
//                 </button>
//             </div>
//         </div>
//     );

//     if (!isMobile) {
//         return (
//             <Dialog open={isOpen} onOpenChange={onClose}>
//                 {children && <DialogTrigger asChild>{children}</DialogTrigger>}
//                 <DialogContent className="sm:max-w-[420px] p-6 bg-white rounded-2xl">
//                     {ModalContent}
//                 </DialogContent>
//             </Dialog>
//         );
//     }

//     return (
//         <Drawer open={isOpen} onOpenChange={onClose}>
//             {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
//             <DrawerContent className="p-6 bg-white rounded-t-2xl">
//                 {ModalContent}
//             </DrawerContent>
//         </Drawer>
//     );
// };

// export default DeleteConfirmationModal;

"use client";
import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogTrigger 
} from '@/app/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerTrigger,
} from '@/app/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import alert from '@/public/Sidebar/alert-triangle.svg';
import { toast } from 'sonner';
import CustomToast from '../../ui/custom-toast';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
    children?: React.ReactNode;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirmDelete,
    children
}) => {
    const isMobile = useIsMobile();

    const handleEventDelete = () => {
        toast.custom((t) => {
            return <CustomToast
                message="Event successfully deleted"
                variant='error'
                onDismiss={() => toast.dismiss(t)} />;
        })
        onConfirmDelete();
        onClose();
    };

    // Use these variables to toggle between Dialog and Drawer primitives
    const Title = isMobile ? DrawerTitle : DialogTitle;
    const Description = isMobile ? DrawerDescription : DialogDescription;

    const ModalContent = (
        <div className="space-y-5">
            <div className="flex items-start gap-4">
                <div className="w-full flex justify-between">
                    <Image src={alert} alt='Alert Triangle' width={40} height={40} priority={true} />
                    {!isMobile && (
                        <button 
                            onClick={onClose}
                            className="text-[#A3A3A3] hover:text-[#525252] focus:outline-none cursor-pointer"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-1.5 text-left">
                {/* FIX: Using the specific Primitive Title and Description 
                   enables accessibility and clears the console error.
                */}
                <Title className="font-bricolage text-xl font-bold leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">
                    Delete this event?
                </Title>
                <Description className="font-geist font-medium text-[13px] leading-[150%] tracking-[-0.1px] text-[#A3A3A3]">
                    This can&apos;t be undone. Your event and all its details will be gone.
                </Description>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 leading-[135%] tracking-[-0.2px] pt-2">
                <button 
                    onClick={onClose} 
                    className="w-full md:w-auto bg-white text-[#959595] border border-[#E8E8E8] hover:bg-[#F7F7F7] font-geist font-semibold py-3 px-[18px] rounded-lg text-sm cursor-pointer"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleEventDelete}
                    className="w-full md:w-auto bg-[#EF4444] hover:bg-[#D93B3B] font-geist font-semibold py-3 px-[18px] text-sm text-white rounded-lg cursor-pointer"
                >
                    Delete event
                </button>
            </div>
        </div>
    );

    if (!isMobile) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                {children && <DialogTrigger asChild>{children}</DialogTrigger>}
                <DialogContent className="sm:max-w-[420px] p-6 bg-white rounded-2xl">
                    {ModalContent}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
            <DrawerContent className="p-6 bg-white rounded-t-2xl">
                {ModalContent}
            </DrawerContent>
        </Drawer>
    );
};

export default DeleteConfirmationModal;