"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import illustration from "@/public/Sidebar/cal-ill.svg";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { 
  Calendar, Clock, MapPin, Globe, Wand, 
  Bold, Italic, Underline, ListOrdered, Link as LinkIcon, 
  Tag, Gift, CreditCard
} from "lucide-react";
import camera from "@/public/Sidebar/camera_2.svg";
import people from "@/public/Sidebar/people-happy.svg";
import pencil from "@/public/Sidebar/pencil_2_ai.svg";
import { cn } from "@/lib/utils";
import StepIndicator from "@/app/components/dashboard/step-indicator"; 
import RichTextControls from "@/app/components/dashboard/richText-controls";

// --- Types & Mock Data ---

const CATEGORIES = [
  "Music & Concerts",
  "Tech & Business",
  "Workshops & Classes",
  "Food & Drink",
  "Sports & Fitness",
];

interface FormData {
  // Step 1 Data
  title: string;
  category: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  locationType: 'Physical' | 'Virtual';
  location: string;
  // Step 2 Data
  ticketType: 'Free' | 'Paid';
  ticketName: string;
  ticketPrice: string;
  ticketSpots: string;
  ticketDescription: string;
}

// --- Sub-Components ---

// const RichTextControls = () => (
//   <div className="flex items-center gap-1 border-b border-[#E8E8E8] p-2">
//     <Button variant="ghost" type="button" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
//       <Bold className="h-4 w-4" />
//     </Button>
//     <Button variant="ghost" type="button" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
//       <Italic className="h-4 w-4" />
//     </Button>
//     <Button variant="ghost" type="button" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
//       <Underline className="h-4 w-4" />
//     </Button>
//     <div className="h-5 w-0.5 bg-[#E8E8E8] mx-1" />
//     <Button variant="ghost" type="button" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
//       <ListOrdered className="h-4 w-4" />
//     </Button>
//     <Button variant="ghost" type="button" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
//       <LinkIcon className="h-4 w-4" />
//     </Button>
//   </div>
// );

interface LocationTypeSelectorProps {
    value: 'Physical' | 'Virtual';
    onChange: (type: 'Physical' | 'Virtual') => void;
}

const LocationTypeSelector: React.FC<LocationTypeSelectorProps> = ({ value, onChange }) => (
    <div className="flex gap-2">
        {['Physical', 'Virtual'].map((type) => {
            const isSelected = value === type;
            return (
                <button
                    key={type}
                    type="button"
                    onClick={() => onChange(type as 'Physical' | 'Virtual')}
                    className={cn(
                        "flex items-center gap-2 rounded-full border px-4 py-2 font-geist text-sm font-medium transition-colors",
                        isSelected
                            ? "border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
                            : "border-[#E8E8E8] bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
                    )}
                >
                    {type === 'Physical' ? (
                        <MapPin className="h-4 w-4" />
                    ) : (
                        <Globe className="h-4 w-4" />
                    )}
                    {type}
                </button>
            );
        })}
    </div>
);

// --- Main Page Component ---

const CreateEventPage = () => {
  const [step, setStep] = useState(1);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [ticketDescLength, setTicketDescLength] = useState(0);
  const [eventImageURL, setEventImageURL] = useState<string | StaticImageData>(people);
  const fileInputRef = useRef<HTMLInputElement>(null)
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null)

  const [formData, setFormData] = useState<FormData>({
    // Step 1
    title: "",
    category: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    locationType: 'Physical',
    location: "",
    // Step 2
    ticketType: 'Paid',
    ticketName: "",
    ticketPrice: "",
    ticketSpots: "",
    ticketDescription: ""
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        // Create tempory URL for immediate display
        setEventImageURL(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'description') setDescriptionLength(value.length);
    if (name === 'ticketDescription') setTicketDescLength(value.length);
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = () => {
    console.log("Final Submission:", formData);
    // Add logic to submit to backend
  };

  // --- Render Step 1: Create Event ---
  const renderStep1 = () => (
    <form onSubmit={handleNext} className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="h-[200px] w-[350px] rounded-xl bg-[#F8F6FD] flex items-center justify-center relative">
            <Image 
                src={eventImageURL} 
                alt="Event Image" 
                layout="fill"
                objectFit="cover"
                className={cn("transition-opacity", typeof eventImageURL === 'string' ? "opacity-100" : "opacity-50")}
            />

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
            />
            
            <button 
                type="button" 
                onClick={handleUploadClick} 
                className="absolute right-4 bottom-4 border-2 border-white flex h-8 w-8 items-center justify-center bg-[#F8F6FD] rounded-md shadow-md cursor-pointer hover:bg-gray-50 transition-colors z-10"
            >
                <Image src={camera} alt="upload" width={20} height={20} />
            </button>
        </div>

        <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">What&apos;s your event called?</label>
                <Input 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. Divine's games night" 
                    className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" 
                />
            </div>
            
            <div className="flex flex-col gap-1.5 w-full">
                <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Category</label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger className="py-2.5 px-3.5 rounded-lg border border-[#E8E8E8] focus:ring-[#6A59CE] font-geist text-[15px] text-[#333333] w-full shadow-none">
                        <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label className="font-geist text-[13px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">Add a description <span className="text-[#A3A3A3] font-geist font-normal">(Optional)</span></label>
                    <Button variant="ghost" type="button" className="flex items-center gap-1 p-0 h-auto font-geist text-sm font-medium text-[#6A59CE] hover:bg-transparent">
                        <Wand className="h-4 w-4" /> 
                        <span className="font-geist font-normal text-sm leading-[150%] tracking-[-0.1px]">Suggest with AI</span>
                    </Button>
                </div>
                <div className=" rounded-lg border border-[#E8E8E8] transition-shadow focus-within:ring-2 focus-within:ring-[#6A59CE]/50">
                    <RichTextControls textareaRef={descriptionTextareaRef} />
                    <Textarea ref={descriptionTextareaRef} name="description" value={formData.description} onChange={handleChange} maxLength={300} placeholder="What should attendees know?" className="min-h-[160px] resize-none rounded-t-none border-none p-4 focus-visible:ring-0 font-geist text-base text-black" />
                </div>
                <div className="font-geist text-xs text-[#A3A3A3] flex justify-end">{descriptionLength}/300</div>
            </div>
        </section>

        <section className="flex flex-col gap-6 pt-6">
            <h3 className="font-bricolage text-[20px] font-semibold leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">When and where?</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-3">
                <div className="col-span-1 md:col-span-2">
                    <label className="">Date</label>
                    <div className="relative">
                        <Input name="date" value={formData.date} onChange={handleChange} placeholder="mm/dd/yyyy" className="h-12 w-full rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base" />
                        <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-1">
                    <label className="">Start time</label>
                    <div className="relative">
                        <Input name="startTime" value={formData.startTime} onChange={handleChange} placeholder="10:00 AM" className="h-12 w-full rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base" />
                        <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-1">
                    <label className="">End time</label>
                    <div className="relative">
                        <Input name="endTime" value={formData.endTime} onChange={handleChange} placeholder="11:00 AM" className="h-12 w-full rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base" />
                        <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                    </div>
                </div>
                <p className="font-geist text-sm font-medium text-[#A3A3A3]">Time shown in GMT +1 (Lagos)</p>
            </div>
            <div className="flex flex-col gap-3">
                <label className="font-geist text-sm font-medium text-[#0F0F0F]">Location</label>
                <LocationTypeSelector value={formData.locationType} onChange={(type) => handleSelectChange('locationType', type)} />
                <Input name="location" value={formData.location} onChange={handleChange} placeholder={formData.locationType === 'Physical' ? "Enter location address" : "Enter virtual meeting link"} className="h-12 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base" />
            </div>
        </section>
        
        <footer className="flex w-full items-center justify-end gap-3 pt-6 mt-8">
            <Button type="button" className="h-11 rounded-lg px-6 font-geist text-sm font-medium text-[#6A59CE] hover:bg-[#F8F6FD]">Cancel</Button>
            <Button type="submit" className="h-11 rounded-lg bg-[#6A59CE] px-6 font-geist text-sm font-medium text-white hover:bg-[#5a4cb0]">Next</Button>
        </footer>
    </form>
  );

  // --- Render Step 2: Set up tickets ---
  const renderStep2 = () => (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex flex-col gap-4">
             {/* Icon */}
            <div className="h-12 w-12 rounded-lg bg-[#F8F6FD] flex items-center justify-center border border-[#E1DEF5]">
                <Tag className="h-6 w-6 text-[#6A59CE] rotate-90" />
            </div>
            <div>
                <h2 className="font-bricolage text-[26px] font-semibold leading-tight tracking-[-0.9px] text-black">
                    Set up tickets
                </h2>
                <p className="font-geist text-sm font-medium text-[#A3A3A3]">
                    You&apos;re this close to going live
                </p>
            </div>
        </div>

        {/* Free or Paid Switch */}
        <div className="flex flex-col gap-2">
            <label className="font-geist text-sm font-medium text-[#0F0F0F]">Is this free or paid?</label>
            <div className="flex gap-3">
                 <button
                    type="button"
                    onClick={() => handleSelectChange('ticketType', 'Free')}
                    className={cn(
                        "flex items-center gap-2 rounded-lg border px-5 py-2.5 font-geist text-sm font-medium transition-all",
                        formData.ticketType === 'Free'
                            ? "border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
                            : "border-[#E8E8E8] bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
                    )}
                >
                    <Gift className="h-4 w-4" />
                    Free
                </button>
                <button
                    type="button"
                    onClick={() => handleSelectChange('ticketType', 'Paid')}
                    className={cn(
                        "flex items-center gap-2 rounded-lg border px-5 py-2.5 font-geist text-sm font-medium transition-all",
                        formData.ticketType === 'Paid'
                            ? "border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
                            : "border-[#E8E8E8] bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
                    )}
                >
                    <CreditCard className="h-4 w-4" />
                    Paid
                </button>
            </div>
        </div>

        {/* Ticket Details Card */}
        <div className="rounded-xl border border-[#E8E8E8] p-6 bg-white shadow-sm space-y-6">
            <h3 className="font-bricolage text-lg font-semibold text-black">Ticket details</h3>
            
            <div className="flex flex-col gap-2">
                <label className="font-geist text-sm font-medium text-[#767676]">Ticket name</label>
                <Input 
                    name="ticketName" 
                    value={formData.ticketName} 
                    onChange={handleChange} 
                    placeholder="e.g. Regular" 
                    className="h-12 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base" 
                />
            </div>

            {formData.ticketType === 'Paid' && (
                <div className="flex flex-col gap-2">
                    <label className="font-geist text-sm font-medium text-[#767676]">Price</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#959595] font-geist text-base font-medium">₦</span>
                        <Input 
                            name="ticketPrice" 
                            type="number"
                            value={formData.ticketPrice} 
                            onChange={handleChange} 
                            placeholder="0" 
                            className="h-12 pl-8 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base" 
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="font-geist text-sm font-medium text-[#767676]">How many spots?</label>
                <Select value={formData.ticketSpots} onValueChange={(value) => handleSelectChange('ticketSpots', value)}>
                    <SelectTrigger className="h-12 rounded-lg border border-[#E8E8E8] focus:ring-[#6A59CE] font-geist text-base text-[#959595]">
                        <SelectValue placeholder="Leave blank for unlimited" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-geist text-sm font-medium text-[#767676]">Ticket description <span className="text-[#A3A3A3]">(Optional)</span></label>
                <div className="relative">
                     <Textarea
                        name="ticketDescription"
                        value={formData.ticketDescription}
                        onChange={handleChange}
                        maxLength={200}
                        placeholder="e.g. Includes drinks or merch"
                        className="min-h-[120px] resize-none rounded-lg border border-[#E8E8E8] p-4 focus-visible:ring-[#6A59CE] font-geist text-base text-black"
                    />
                    <div className="absolute bottom-2 right-4 font-geist text-xs text-[#A3A3A3]">
                        {ticketDescLength}/200
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button variant="ghost" className="bg-[#F8F8F8] text-[#0F0F0F] hover:bg-[#EFEFEF] font-geist font-medium rounded-lg">
                    Save ticket
                </Button>
            </div>
        </div>

        <footer className="flex w-full items-center justify-between pt-6">
            <Button 
                variant="outline" 
                onClick={handleBack}
                className="h-11 rounded-lg px-6 border-[#E8E8E8] font-geist text-sm font-medium text-[#0F0F0F] hover:bg-[#FAFAFA]"
            >
                Back
            </Button>
            <Button 
                onClick={handleFinalSubmit} 
                className="h-11 rounded-lg bg-[#F8F8F8] px-6 font-geist text-sm font-medium text-[#959595] hover:bg-[#EFEFEF] hover:text-[#0F0F0F]"
            >
                Let&apos;s rally!
            </Button>
        </footer>
    </div>
  );

  return (
    <main className="min-h-screen bg-white p-6 md:p-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
            {/* Step 1 Header Layout */}
            {step === 1 && (
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-4 w-full">
                        <Image src={illustration} alt="Cal Ill" width={60} height={60} />
                        <div className="space-y-1.5 flex justify-between">
                            <div className="">
                                <h2 className="font-bricolage text-[26px] font-semibold leading-tight tracking-[-0.9px] text-black">
                                    Create your event
                                </h2>
                                <p className="font-geist text-sm font-medium text-[#A3A3A3]">
                                    Let&apos;s start with the basics
                                </p>
                            </div>
                            <StepIndicator currentStep={step} />
                        </div>
                    </div>
                </div>
            )}
            
            {/* Step 2 Header Layout - Indicator shifts to follow screenshot */}
             {step === 2 && (
                <div className="flex w-full justify-end">
                     <StepIndicator currentStep={step} />
                </div>
            )}
        </div>

        {/* Dynamic Form Content */}
        <div className="mt-6">
            {step === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
    </main>
  );
};

export default CreateEventPage;