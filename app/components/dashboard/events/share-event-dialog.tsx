// import React from 'react'
// import whatsapp from '@/public/Sidebar/Whatsapp.svg';
// import x from '@/public/Sidebar/X.svg';
// import instagram from '@/public/Sidebar/Instagram.svg';
// import facebook from '@/public/Sidebar/Facebook.svg';
// import sharePlane from '@/public/Sidebar/paper-plane.svg';
// import Image from 'next/image';
// import { StaticImageData } from 'next/image';
// import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../../ui/dialog';
// import { Copy, Link, Share2 } from 'lucide-react';

// const socailIcons = {
//     x: x as StaticImageData,
//     whatsapp: whatsapp as StaticImageData,
//     instagram: instagram as StaticImageData,
//     facebook: facebook as StaticImageData,
// }

// interface SocialButtonProps {
//     platform: keyof typeof socailIcons;
//     icon: StaticImageData;
//     eventLink: string;
// }

// const SocialButton: React.FC<SocialButtonProps> = ({ platform, icon, eventLink }) => {

//     const handleShare = () => {
//         window.open(`https://...share-link...?text=${encodeURIComponent(eventLink)}`, '_blank');
//     };

//     return (
//         <button 
//             onClick={handleShare}
//             // className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#E8E8E8] transition-colors"
//         >
//             <Image src={icon} alt={platform} width={56} height={56} />
//         </button>
//     );
// }

// interface ShareEventDialogProps {
//     eventLink: string;
//     trigger: React.ReactNode
// }

// const ShareEventDialog: React.FC<ShareEventDialogProps> = ({ eventLink, trigger }) => {
//     const handleCopyLink = async (link: string) => {
//         try {
//             await navigator.clipboard.writeText(link);
//             console.log("Link copied:", link);
//         } catch (err) {
//             console.error('Failed to copy text: ', err);
//         }
//     };

//   return (
//     <Dialog>
//         <DialogTrigger asChild>
//             {/* The button passed from the parent component */}
//             {trigger} 
//         </DialogTrigger>

//         <DialogContent className="sm:max-w-md space-y-4 p-6">
//             {/* Header */}
//             <div className="flex flex-col gap-7">
//                 <div className="flex justify-start w-full">
//                     {/* Share Icon from the image */}
//                     <Image src={sharePlane} alt='Share Ill'  />
//                 </div>
//                 <div className='space-y-1'>
//                     <DialogTitle className="font-bricolage text-[22px] font-bold leading-[120%] tracking-[-0.5px] text-[#1A1A1A] text-left">
//                         Share your event
//                     </DialogTitle>
//                     <DialogDescription className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#A3A3A3] text-left">
//                         Send this link to get people to RSVP
//                     </DialogDescription>
//                 </div>
//             </div>

//             {/* Social Share Icons */}
//             <div className="flex gap-4 justify-center items-center">
//                 <SocialButton platform="x" icon={socailIcons.x} eventLink={eventLink} />
//                 <SocialButton platform="whatsapp" icon={socailIcons.whatsapp} eventLink={eventLink} />
//                 <SocialButton platform="instagram" icon={socailIcons.instagram} eventLink={eventLink} />
//                 <SocialButton platform="facebook" icon={socailIcons.facebook} eventLink={eventLink} />
//             </div>

//             {/* Link Section */}
//             <div className="flex items-center justify-between border-[0.8px] border-[#FAFAFA] bg-[#FDFDFD] rounded-xl py-3.5 px-4">
//                 <span className="font-geist font-medium leading-[100%] tracking-[-0.1px] text-sm text-[#A3A3A3] truncate max-w-[70%]">
//                     {eventLink}
//                 </span>
//                 <button 
//                     onClick={() => handleCopyLink(eventLink)}
//                     className="flex items-center gap-1.5 text-[#6A59CE] hover:text-[#5a4cb0] text-sm font-medium font-geist leading-[100%] tracking-[-0.1px] transition-colors"
//                 >
//                     <Link className="h-3 w-3" /> Copy link
//                 </button>
//             </div>
//         </DialogContent>
//     </Dialog>
//   )
// }

// export default ShareEventDialog


// import React from 'react';
// import whatsapp from '@/public/Sidebar/Whatsapp.svg';
// import x from '@/public/Sidebar/X.svg';
// import instagram from '@/public/Sidebar/Instagram.svg';
// import facebook from '@/public/Sidebar/Facebook.svg';
// import sharePlane from '@/public/Sidebar/paper-plane.svg';
// import Image from 'next/image';
// import { StaticImageData } from 'next/image';
// import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../../ui/dialog';
// import { Copy, Link as LinkIcon, Share2 } from 'lucide-react';

// // --- Social Icons Mapping ---
// const socailIcons = {
//     x: x as StaticImageData,
//     whatsapp: whatsapp as StaticImageData,
//     instagram: instagram as StaticImageData,
//     facebook: facebook as StaticImageData,
// }

// // --- Social Button Component ---
// interface SocialButtonProps {
//     platform: keyof typeof socailIcons;
//     icon: StaticImageData;
//     eventLink: string;
//     message: string;
// }

// const SocialButton: React.FC<SocialButtonProps> = ({ platform, icon, eventLink, message }) => {

//     const encodedLink = encodeURIComponent(eventLink);
//     const encodedMessage = encodeURIComponent(message);

//     const getShareUrl = (platform: keyof typeof socailIcons): string => {
//         switch (platform) {
//             case 'whatsapp':
//                 return `https://wa.me/?text=${encodedMessage}%20${encodedLink}`;
//             case 'x':
//                 return `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedLink}`;
//             case 'facebook':
//                 // u= parameter for sharing a URL
//                 return `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
//             case 'instagram':
//                 // Instagram does not support web intents for sharing posts
//                 return 'https://instagram.com/'; 
//             default:
//                 return eventLink;
//         }
//     };

//     const handleShare = () => {
//         const url = getShareUrl(platform);
        
//         // Open in new window for supported web intents
//         if (platform === 'whatsapp' || platform === 'x' || platform === 'facebook') {
//             window.open(url, '_blank', 'noopener,noreferrer');
//         } else if (platform === 'instagram') {
//              // For Instagram, prompt the user as web sharing is not supported
//              alert('For Instagram, please copy the link and share it manually in your story or bio.');
//              window.open(url, '_blank', 'noopener,noreferrer');
//         }
//     };

//     return (
//         <button 
//             onClick={handleShare}
//             className="flex items-center justify-center gap-6 transition-colors"
//         >
//             <Image src={icon} alt={platform} width={56} height={56} /> 
//         </button>
//     );
// }

// // --- Main Dialog Component ---
// interface ShareEventDialogProps {
//     eventLink: string;
//     trigger: React.ReactNode; // Reinstating the flexible trigger prop
//     eventTitle?: string; // Optional: for a richer share message
// }

// const ShareEventDialog: React.FC<ShareEventDialogProps> = ({ eventLink, trigger, eventTitle }) => {
    
//     const defaultMessage = eventTitle 
//         ? `Check out the event "${eventTitle}"! RSVP here:` 
//         : "Check out this awesome event! RSVP here:";

//     const handleCopyLink = async (link: string) => {
//         try {
//             await navigator.clipboard.writeText(link);
//             console.log("Link copied:", link);
//             // In a real app, you would show a toast/notification here.
//         } catch (err) {
//             console.error('Failed to copy text: ', err);
//         }
//     };

//   return (
//     <Dialog>
//         <DialogTrigger asChild>
//             {/* The button/element passed from the parent component (e.g., the Popover menu item) */}
//             {trigger} 
//         </DialogTrigger>

//         <DialogContent className="sm:max-w-md space-y-4 p-6">
//             {/* Header */}
//             <div className="flex flex-col gap-7">
//                 <div className="flex justify-start w-full">
//                     <Image src={sharePlane} alt='Share Ill' width={30} height={30} />
//                 </div>
//                 <div className='space-y-1'>
//                     <DialogTitle className="font-bricolage text-[22px] font-bold leading-[120%] tracking-[-0.5px] text-[#1A1A1A] text-left">
//                         Share your event
//                     </DialogTitle>
//                     <DialogDescription className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#A3A3A3] text-left">
//                         Send this link to get people to RSVP
//                     </DialogDescription>
//                 </div>
//             </div>

//             {/* Social Share Icons */}
//             <div className="flex gap-4 justify-center items-center">
//                 <SocialButton platform="x" icon={socailIcons.x} eventLink={eventLink} message={defaultMessage} />
//                 <SocialButton platform="whatsapp" icon={socailIcons.whatsapp} eventLink={eventLink} message={defaultMessage} />
//                 <SocialButton platform="instagram" icon={socailIcons.instagram} eventLink={eventLink} message={defaultMessage} />
//                 <SocialButton platform="facebook" icon={socailIcons.facebook} eventLink={eventLink} message={defaultMessage} />
//             </div>

//             {/* Link Section */}
//             <div className="flex items-center justify-between border-[0.8px] border-[#FAFAFA] bg-[#FDFDFD] rounded-xl py-3.5 px-4">
//                 <span className="font-geist font-medium leading-[100%] tracking-[-0.1px] text-sm text-[#A3A3A3] truncate max-w-[70%]">
//                     {eventLink}
//                 </span>
//                 <button 
//                     onClick={() => handleCopyLink(eventLink)}
//                     className="flex items-center gap-1.5 text-[#6A59CE] hover:text-[#5a4cb0] text-sm font-medium font-geist leading-[100%] tracking-[-0.1px] transition-colors"
//                 >
//                     <LinkIcon className="h-3 w-3" /> Copy link
//                 </button>
//             </div>
//         </DialogContent>
//     </Dialog>
//   )
// }

// export default ShareEventDialog

"use client";

import React, { useState } from 'react';
import whatsapp from '@/public/Sidebar/Whatsapp.svg';
import x from '@/public/Sidebar/X.svg';
import instagram from '@/public/Sidebar/Instagram.svg';
import facebook from '@/public/Sidebar/Facebook.svg';
import sharePlane from '@/public/Sidebar/paper-plane.svg';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { Copy, Link as LinkIcon } from 'lucide-react';
import { Icon } from "@iconify/react";

// 1. Imports for Desktop (Dialog) and Mobile (Drawer)
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription, 
  DialogTrigger 
} from '@/app/components/ui/dialog';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerTrigger 
} from '@/app/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

// Social Icons Mapping
const socailIcons = {
    x: x as StaticImageData,
    whatsapp: whatsapp as StaticImageData,
    instagram: instagram as StaticImageData,
    facebook: facebook as StaticImageData,
}

// Social Button Component
interface SocialButtonProps {
    platform: keyof typeof socailIcons;
    icon: StaticImageData;
    eventLink: string;
    message: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ platform, icon, eventLink, message }) => {

    const encodedLink = encodeURIComponent(eventLink);
    const encodedMessage = encodeURIComponent(message);

    const getShareUrl = (platform: keyof typeof socailIcons): string => {
        switch (platform) {
            case 'whatsapp':
                return `https://wa.me/?text=${encodedMessage}%20${encodedLink}`;
            case 'x':
                return `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedLink}`;
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
            case 'instagram':
                return 'https://instagram.com/'; 
            default:
                return eventLink;
        }
    };

    const handleShare = () => {
        const url = getShareUrl(platform);
        
        if (platform === 'whatsapp' || platform === 'x' || platform === 'facebook') {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else if (platform === 'instagram') {
             alert('For Instagram, please copy the link and share it manually in your story or bio.');
             window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-6 transition-colors hover:scale-105 active:scale-95 duration-200"
        >
            <Image src={icon} alt={platform} width={56} height={56} priority={true} /> 
        </button>
    );
}

// Main Dialog Component
interface ShareEventDialogProps {
    eventLink: string;
    trigger: React.ReactNode; 
    eventTitle?: string; 
}

const ShareEventDialog: React.FC<ShareEventDialogProps> = ({ eventLink, trigger, eventTitle }) => {
    const isMobile = useIsMobile();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(eventLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    
    const defaultMessage = eventTitle 
        ? `Check out the event "${eventTitle}"! RSVP here:` 
        : "Check out this awesome event! RSVP here:";

    const handleCopyLink = async (link: string) => {
        try {
            await navigator.clipboard.writeText(link);
            console.log("Link copied:", link);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // 2. Define Dynamic Primitives based on screen size
    // This allows us to use <Title> and it automatically renders the correct accessible tag
    const Title = isMobile ? DrawerTitle : DialogTitle;
    const Description = isMobile ? DrawerDescription : DialogDescription;

    // 3. Shared Content Variable
    // We define the UI once so it remains consistent across both views
    const ShareContent = (
        <div className="space-y-4 p-6">
            {/* Header */}
            <div className="flex flex-col gap-7">
                <div className="flex justify-start w-full">
                    <Image src={sharePlane} alt='Share Ill' width={48} height={48} priority={true} />
                </div>
                <div className='space-y-1'>
                    <Title className="font-bricolage text-[22px] font-bold leading-[120%] tracking-[-0.5px] text-[#1A1A1A] text-left">
                        Share your event
                    </Title>
                    <Description className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#A3A3A3] text-left">
                        Send this link to get people to RSVP
                    </Description>
                </div>
            </div>

            {/* Social Share Icons */}
            <div className="flex gap-4 justify-center items-center py-2">
                <SocialButton platform="x" icon={socailIcons.x} eventLink={eventLink} message={defaultMessage} />
                <SocialButton platform="whatsapp" icon={socailIcons.whatsapp} eventLink={eventLink} message={defaultMessage} />
                <SocialButton platform="instagram" icon={socailIcons.instagram} eventLink={eventLink} message={defaultMessage} />
                <SocialButton platform="facebook" icon={socailIcons.facebook} eventLink={eventLink} message={defaultMessage} />
            </div>

            {/* Link Section */}
            <div className="flex items-center justify-between border-[0.8px] border-[#FAFAFA] bg-[#FDFDFD] rounded-[12px] py-3.5 px-4">
                <span className="font-geist font-medium leading-[100%] tracking-[-0.1px] text-sm text-[#A3A3A3] truncate max-w-[150px] md:max-w-none">
                    {eventLink}
                </span>
                {/* <button 
                    onClick={() => handleCopyLink(eventLink)}
                    className="flex items-center gap-1.5 text-[#6A59CE] hover:text-[#5a4cb0] text-sm font-medium font-geist leading-[100%] tracking-[-0.1px] transition-colors"
                >
                    <LinkIcon className="h-3 w-3" /> 
                    <Icon icon="mingcute:link-2-line" width="16" height="16"  style={{color: "#6A59CE"}} /> Copy link
                </button> */}
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[#6A59CE] hover:text-[#5a4cb0] text-sm font-medium font-geist leading-[100%] tracking-[-0.2px] transition-colors cursor-pointer"
                >
                    {isCopied ? (
                        <span>Link copied!</span>
                    ) : (
                        <>
                            {/* Link Icon */}
                            <Icon icon="mingcute:link-2-line" width="16" height="16"  style={{color: "#6A59CE"}} />
                            <span className="">Copy link</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );

    // 4. Return the correct wrapper
    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    {trigger}
                </DrawerTrigger>
                <DrawerContent className="bg-white border-none rounded-t-[24px]">
                    {ShareContent}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger} 
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white p-0">
                {ShareContent}
            </DialogContent>
        </Dialog>
    );
}

export default ShareEventDialog;