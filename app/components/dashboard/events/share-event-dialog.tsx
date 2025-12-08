import React from 'react'
import whatsapp from '@/public/Sidebar/Whatsapp.svg';
import x from '@/public/Sidebar/X.svg';
import instagram from '@/public/Sidebar/Instagram.svg';
import facebook from '@/public/Sidebar/Facebook.svg';
import sharePlane from '@/public/Sidebar/paper-plane.svg';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Copy, Link, Share2 } from 'lucide-react';

const socailIcons = {
    x: x as StaticImageData,
    whatsapp: whatsapp as StaticImageData,
    instagram: instagram as StaticImageData,
    facebook: facebook as StaticImageData,
}

interface SocialButtonProps {
    platform: keyof typeof socailIcons;
    icon: StaticImageData;
    eventLink: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ platform, icon, eventLink }) => {

    const handleShare = () => {
        window.open(`https://...share-link...?text=${encodeURIComponent(eventLink)}`, '_blank');
    };

    return (
        <button 
            onClick={handleShare}
            // className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#E8E8E8] transition-colors"
        >
            <Image src={icon} alt={platform} width={56} height={56} />
        </button>
    );
}

interface ShareEventDialogProps {
    eventLink: string;
    trigger: React.ReactNode
}

const ShareEventDialog: React.FC<ShareEventDialogProps> = ({ eventLink, trigger }) => {
    const handleCopyLink = async (link: string) => {
        try {
            await navigator.clipboard.writeText(link);
            console.log("Link copied:", link);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

  return (
    <Dialog>
        <DialogTrigger asChild>
            {/* The button passed from the parent component */}
            {trigger} 
        </DialogTrigger>

        <DialogContent className="sm:max-w-md space-y-4 p-6">
            {/* Header */}
            <div className="flex flex-col gap-7">
                <div className="flex justify-start w-full">
                    {/* Share Icon from the image */}
                    <Image src={sharePlane} alt='Share Ill'  />
                </div>
                <div className='space-y-1'>
                    <DialogTitle className="font-bricolage text-[22px] font-bold leading-[120%] tracking-[-0.5px] text-[#1A1A1A] text-left">
                        Share your event
                    </DialogTitle>
                    <DialogDescription className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#A3A3A3] text-left">
                        Send this link to get people to RSVP
                    </DialogDescription>
                </div>
            </div>

            {/* Social Share Icons */}
            <div className="flex gap-4 justify-center items-center">
                <SocialButton platform="x" icon={socailIcons.x} eventLink={eventLink} />
                <SocialButton platform="whatsapp" icon={socailIcons.whatsapp} eventLink={eventLink} />
                <SocialButton platform="instagram" icon={socailIcons.instagram} eventLink={eventLink} />
                <SocialButton platform="facebook" icon={socailIcons.facebook} eventLink={eventLink} />
            </div>

            {/* Link Section */}
            <div className="flex items-center justify-between border-[0.8px] border-[#FAFAFA] bg-[#FDFDFD] rounded-xl py-3.5 px-4">
                <span className="font-geist font-medium leading-[100%] tracking-[-0.1px] text-sm text-[#A3A3A3] truncate max-w-[70%]">
                    {eventLink}
                </span>
                <button 
                    onClick={() => handleCopyLink(eventLink)}
                    className="flex items-center gap-1.5 text-[#6A59CE] hover:text-[#5a4cb0] text-sm font-medium font-geist leading-[100%] tracking-[-0.1px] transition-colors"
                >
                    <Link className="h-3 w-3" /> Copy link
                </button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ShareEventDialog