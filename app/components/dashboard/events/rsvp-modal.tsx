"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import CustomToast from "../../ui/custom-toast";

// --- Internal Form Component ---
interface RsvpFormProps {
    onSubmit: () => void;
}

const RsvpForm = ({ onSubmit }: RsvpFormProps) => {
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isValid, setIsValid] = useState(false);

    // Validate form on change
    useEffect(() => {
        const isNameValid = formData.name.trim().length > 0;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        setIsValid(isNameValid && isEmailValid);
    }, [formData]);

    const handleSubmit = () => {
        if (!isValid) return;
        onSubmit();
    };

    return (
        <div className="flex flex-col gap-6 pt-2">
            <div className="space-y-4 pb-2">
                <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-[14px] font-medium text-[#333333] leading-[150%]">
                        Name
                    </label>
                    <Input 
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className='w-full px-3.5 py-2.5 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist placeholder:font-medium placeholder:text-[15px] text-[15px] text-[#333333] font-medium transition-all
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-[14px] font-medium text-[#333333] leading-[150%]">
                        Email
                    </label>
                    <Input 
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className='w-full px-3.5 py-2.5 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist placeholder:font-medium placeholder:text-[15px] text-[15px] text-[#333333] font-medium transition-all
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                    />
                </div>
            </div>

            <Button 
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full h-[50px] bg-[#6A59CE] hover:bg-primary/90 text-white text-[15px] font-semibold rounded-md transition-all shadow-none disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3] disabled:border disabled:border-[#E8E8E8]"
            >
                Confirm RSVP
            </Button>
        </div>
    );
};

// --- Main Exported Component ---
interface RsvpModalProps {
    trigger: React.ReactNode;
}

const RsvpModal: React.FC<RsvpModalProps> = ({ trigger }) => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        toast.custom((t) => (
            <CustomToast 
              message="You’re in. See you there"
              variant='success'
              onDismiss={() => toast.dismiss(t)}
            />
        ));
    };

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent className="px-4 pb-8 rounded-t-[24px]">
                    {/* <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-[#E8E8E8] mt-3 mb-6" /> */}
                    <DrawerHeader className="text-left px-0 pt-0 pb-4 mt-8">
                        <DrawerTitle className="font-bricolage text-[22px] font-bold text-[#1A1A1A] tracking-[-0.5px]">
                            Enter your info
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="max-h-[85vh] overflow-y-auto">
                        <RsvpForm onSubmit={handleSuccess} />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="w-[420px] p-6 gap-0 rounded-[20px] bg-white border border-[#E8E8E8] shadow-lg">
                <DialogHeader className="mb-4">
                    <DialogTitle className="font-bricolage text-[20px] font-bold text-[#1A1A1A] tracking-[-0.5px] text-left">
                        Enter your info
                    </DialogTitle>
                </DialogHeader>
                <RsvpForm onSubmit={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
};

export default RsvpModal;