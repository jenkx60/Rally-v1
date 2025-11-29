"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import illustration from "@/public/Sidebar/cal-ill.svg";
import tag from "@/public/Sidebar/tag.svg";
import bank from "@/public/Sidebar/bank_card_fill.svg";
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
  Tag, Gift, CreditCard,
  Monitor,
  Ticket,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import camera from "@/public/Sidebar/camera_2.svg";
import people from "@/public/Sidebar/people-happy.svg";
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

interface TicketData {
  id: string; // unique id for list management
  type: 'Free' | 'Paid';
  name: string;
  price: string;
  spots: string;
  description: string;
}

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
}

// --- Sub-Components ---

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
                        "flex items-center gap-2 rounded-md border px-3 py-1.5 font-geist text-sm leading-6 font-medium transition-colors",
                        isSelected
                            ? "border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
                            : "border-[#E8E8E8] bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
                    )}
                >
                    {type === 'Physical' ? (
                        <MapPin className="h-4 w-4" />
                    ) : (
                        <Monitor className="h-4 w-4" />
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Form Data for Step 1
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    locationType: 'Physical',
    location: "",
  });

  // State for Ticket Management (Step 2)
  const [tickets, setTickets] = useState<TicketData[]>([]); // List of saved tickets
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(true); // Control visibility of the form
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null); // Track if we are editing

  // State for the CURRENT ticket being edited/created
  const [currentTicket, setCurrentTicket] = useState<TicketData>({
    id: "",
    type: 'Paid',
    name: "",
    price: "",
    spots: "",
    description: ""
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
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
  };

  // Handler for Ticket Form inputs
  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTicket((prev) => ({ ...prev, [name]: value }));
    if (name === 'description') setTicketDescLength(value.length);
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Ticket Type/Spots Selects
  const handleTicketSelectChange = (name: keyof TicketData, value: string) => {
    setCurrentTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (step === 2) {
        setStep(1);
        window.scrollTo(0, 0);
    }
  };

  // --- Ticket Management Functions ---

  const handleSaveTicket = () => {
    if (!currentTicket.name) return; // Basic validation

    if (editingTicketId) {
        // Update existing ticket
        setTickets(prev => prev.map(t => t.id === editingTicketId ? { ...currentTicket, id: editingTicketId } : t));
        setEditingTicketId(null);
    } else {
        // Create new ticket
        const newTicket = { ...currentTicket, id: Math.random().toString(36).substr(2, 9) };
        setTickets(prev => [...prev, newTicket]);
    }

    // Reset Form and View
    setCurrentTicket({
        id: "",
        type: 'Paid',
        name: "",
        price: "",
        spots: "",
        description: ""
    });
    setTicketDescLength(0);
    setIsTicketFormOpen(false); // Close form after saving (matches Screenshot 2 behavior)
  };

  const handleEditTicket = (ticket: TicketData) => {
    setCurrentTicket(ticket);
    setEditingTicketId(ticket.id);
    setIsTicketFormOpen(true);
    setTicketDescLength(ticket.description.length);
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
  };

  const handleAddAnotherTicket = () => {
    setCurrentTicket({
        id: "",
        type: 'Paid',
        name: "",
        price: "",
        spots: "",
        description: ""
    });
    setEditingTicketId(null);
    setIsTicketFormOpen(true);
  };

  const handleFinalSubmit = () => {
    const finalPayload = {
        ...formData,
        tickets: tickets
    };
    console.log("Final Submission:", finalPayload);
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
                className={cn("transition-opacity", typeof eventImageURL === 'string' ? "opacity-100" : "opacity-100")}
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

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label className="font-geist text-[13px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">Add a description <span className="text-[#A3A3A3] font-geist font-normal">(Optional)</span></label>
                    <Button variant="ghost" type="button" className="flex items-center gap-1 p-0 h-auto font-geist text-sm font-medium text-[#6A59CE] hover:bg-transparent">
                        <Wand className="h-4 w-4" /> 
                        <span className="font-geist font-normal text-sm leading-[150%] tracking-[-0.1px]">Suggest with AI</span>
                    </Button>
                </div>
                <div className=" rounded-lg border border-[#E8E8E8] transition-shadow focus-within:ring-2 focus-within:ring-[#6A59CE]/50">
                    <RichTextControls textareaRef={descriptionTextareaRef} />
                    <Textarea 
                        ref={descriptionTextareaRef} 
                        name="description" value={formData.description} 
                        onChange={handleChange} 
                        maxLength={300} 
                        placeholder="What should attendees know?" 
                        className="min-h-40 resize-none rounded-t-none border-none p-4 focus-visible:ring-0 font-geist text-base text-black" />
                </div>
                <div className="font-geist text-xs text-[#A3A3A3] flex justify-end">{descriptionLength}/300</div>
            </div>
        </section>

        <section className="flex flex-col gap-6 pt-6">
            <h3 className="font-bricolage text-[20px] font-semibold leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">When and where?</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                <div className="grid col-span-1 md:col-span-2 gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Date</label>
                    <div className="relative">
                        <Input 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            placeholder="mm/dd/yyyy" 
                            className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none"  
                        />
                        <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                    </div>
                </div>
                <div className="grid col-span-1 md:col-span-1 gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Start time</label>
                    <div className="relative">
                        <Input 
                            name="startTime" 
                            value={formData.startTime} 
                            onChange={handleChange} 
                            placeholder="10:00 AM" 
                            className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none"  
                        />
                        <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                    </div>
                </div>
                <div className="grid col-span-1 md:col-span-1 gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">End time</label>
                    <div className="relative">
                        <Input 
                            name="endTime" 
                            value={formData.endTime} 
                            onChange={handleChange} 
                            placeholder="11:00 AM" 
                            className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none"  
                        />
                        <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                    </div>
                </div>
                <p className="font-geist text-sm font-medium text-[#A3A3A3]">Time shown in GMT +1 (Lagos)</p>
            </div>
            <div className="flex flex-col gap-3">
                <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Location</label>
                <LocationTypeSelector value={formData.locationType} onChange={(type) => handleSelectChange('locationType', type)} />
                <Input name="location" value={formData.location} onChange={handleChange} placeholder={formData.locationType === 'Physical' ? "Enter location" : "Enter virtual meeting link"} className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" />
            </div>
        </section>
        
        <footer className="flex w-full items-center justify-between gap-3 pt-6 mt-8">
            <button type="button" className="rounded-lg px-6 py-4 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-[#959595] hover:bg-[#F8F6FD] border border-[#E8E8E8]">Cancel</button>
            <button type="submit" className="rounded-lg px-6 py-4 bg-[#6A59CE] font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white hover:bg-[#5a4cb0] disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595]">Next</button>
        </footer>
    </form>
  );

  // --- Render Step 2: Set up tickets ---
  const renderStep2 = () => (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
        
        {/* Is this free or paid? (Only show if form is open or it's the first time) */}
        {isTicketFormOpen && (
            <div className="flex flex-col gap-4">
                <label className="font-geist text-[15px] font-medium text-[#333333] leading-[150%] tracking-[-0.2px]">Is this free or paid?</label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleTicketSelectChange('type', 'Free')}
                        className={cn(
                            "flex items-center gap-2 rounded-md border px-3.5 py-2.5 font-geist text-[15px] leading-[150%] tracking-[-0.2px] font-medium transition-all",
                            currentTicket.type === 'Free'
                                ? "border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
                                : "bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
                        )}
                    >
                        <Gift className="h-4 w-4" />
                        Free
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTicketSelectChange('type', 'Paid')}
                        className={cn(
                            "flex items-center gap-2 rounded-md border px-3.5 py-2.5 font-geist text-[15px] leading-[150%] tracking-[-0.2px] font-medium transition-all",
                            currentTicket.type === 'Paid'
                                ? "border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
                                : " bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
                        )}
                    >
                        <Image src={bank} alt="Bank fill" width={16} height={16} />
                        Paid
                    </button>
                </div>
            </div>
        )}

        {/* 2. Ticket List View (Rendered if there are tickets) */}
        {tickets.length > 0 && (
            <div className="flex flex-col gap-4">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="rounded-xl border border-[#E8E8E8] p-4 bg-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-[#F8F6FD] flex items-center justify-center text-[#6A59CE]">
                                <Ticket className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-geist text-[15px] font-semibold text-[#1A1A1A]">{ticket.name}</h4>
                                <p className="font-geist text-xs text-[#959595]">
                                    {ticket.type === 'Free' ? 'Free' : `₦${ticket.price}`} • {ticket.spots ? `${ticket.spots} spots` : 'Unlimited'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => handleEditTicket(ticket)}
                                className="p-2 text-[#959595] hover:text-[#6A59CE] hover:bg-[#F8F6FD] rounded-full transition-colors"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button 
                                onClick={() => handleDeleteTicket(ticket.id)}
                                className="p-2 text-[#959595] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-full transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* 3. Add Another Ticket Button (Shown when list exists and form is closed) */}
        {!isTicketFormOpen && tickets.length > 0 && (
            <button 
                onClick={handleAddAnotherTicket}
                className="flex items-center gap-2 text-[#6A59CE] font-geist text-[15px] font-medium hover:underline w-fit"
            >
                <Plus className="h-4 w-4" />
                Add another ticket
            </button>
        )}

        {/* 4. Ticket Form Card (Shown if creating new, editing, or no tickets exist) */}
        {(isTicketFormOpen || tickets.length === 0) && (
            <div className="rounded-xl border border-[#E8E8E8] p-8 bg-white shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-bricolage text-[20px] font-semibold text-[#1a1a1a] leading-[130%] tracking-[-0.7px]">
                        Ticket details {tickets.length > 0 ? `(${tickets.length + 1})` : ''}
                    </h3>
                    {tickets.length > 0 && (
                        <button onClick={() => setIsTicketFormOpen(false)} className="text-xs text-[#959595] hover:text-[#1A1A1A]">Cancel</button>
                    )}
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Ticket name</label>
                    <Input 
                        name="name" 
                        value={currentTicket.name} 
                        onChange={handleTicketChange} 
                        placeholder="e.g. Regular" 
                        className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" 
                    />
                </div>

                {currentTicket.type === 'Paid' && (
                    <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Price</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFBFBF] font-geist text-[15px] font-medium leading-6 tracking-[-0.1px]">₦</span>
                            <Input 
                                name="price" 
                                type="number"
                                value={currentTicket.price} 
                                onChange={handleTicketChange} 
                                placeholder="0" 
                                className="pl-8 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist font-normal leading-6 tracking-[-0.1px] text-[15px] text-[#1A1A1A] shadow-none" 
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">How many spots?</label>
                    <Input
                        name="spots"
                        type="number"
                        value={currentTicket.spots} 
                        onChange={handleTicketChange}
                        placeholder="Leave blank for unlimited"
                        className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" 
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Ticket description <span className="text-[#A3A3A3] font-normal text-[14px]">(Optional)</span></label>
                    <div className="">
                        <Textarea
                            name="description"
                            value={currentTicket.description}
                            onChange={handleTicketChange}
                            maxLength={200}
                            placeholder="e.g. Includes drinks or merch"
                            className="min-h-[120px] resize-none rounded-lg border border-[#E8E8E8] p-4 focus-visible:ring-[#6A59CE] focus-visible:ring font-geist font-medium leading-[150%] tracking-[-0.2px] text-[15px] text-[#1a1a1a] placeholder:text-[#bfbfbf]"
                        />
                    </div>
                    <div className="flex justify-end font-geist text-xs text-[#A3A3A3]">{ticketDescLength}/200</div>
                </div>

                <div className="flex justify-end">
                    <button 
                        onClick={handleSaveTicket}
                        type="button" // Important: type button to prevent form submit
                        className="rounded-lg px-[18px] py-3 bg-[#F8F8F8] hover:bg-[#efefef] font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-[#959595]"
                    >
                        Save ticket
                    </button>
                </div>
            </div>
        )}

        <footer className="flex w-full items-center justify-between gap-3 pt-6 mt-8">
            <button 
                type="button" 
                onClick={handleBack}
                className="rounded-lg px-6 py-4 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-[#959595] hover:bg-[#F8F6FD] border border-[#E8E8E8]"
            >
                Back
            </button>
            <button 
                onClick={handleFinalSubmit}
                type="button" // Handle manual submission logic
                className="rounded-lg px-6 py-4 bg-[#6A59CE] font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white hover:bg-[#5a4cb0] disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595]"
            >
                Let&apos;s rally!
            </button>
        </footer>
    </div>
  );

  return (
    <main className="min-h-screen bg-white p-6 md:p-10 px-[220px]">
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
            
            {/* Step 2 Header Layout */}
             {step === 2 && (
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-4 w-full">
                        <Image src={tag} alt="Tag Ill" width={60} height={60} />
                        <div className="space-y-1.5 flex justify-between">
                            <div className="">
                                <h2 className="font-bricolage text-[26px] font-semibold leading-tight tracking-[-0.9px] text-black">
                                    Set up tickets
                                </h2>
                                <p className="font-geist text-sm font-medium text-[#A3A3A3]">
                                    You&apos;re this close to going live
                                </p>
                            </div>
                            <StepIndicator currentStep={step} />
                        </div>
                    </div>
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