"use client";

import React, { useState } from "react";
import Image from "next/image";
import illustration from "@/public/Sidebar/cal-ill.svg";
import createEventIcon from "@/public/calendar.svg"; // Assuming a purple icon for the header
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
import { Calendar, Clock, MapPin, Globe, Scissors, List, Link as LinkIcon, Bold, Italic, Underline, AlignLeft, ListOrdered, Wand, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";


// Mock Data for the demonstration
const CATEGORIES = [
  "Music & Concerts",
  "Tech & Business",
  "Workshops & Classes",
  "Food & Drink",
  "Sports & Fitness",
];

// --- Sub-Components for the rich text editor and location selector ---

const RichTextControls = () => (
  <div className="flex items-center gap-1 border-b border-[#E8E8E8] p-2">
    <Button variant="ghost" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
      <Bold className="h-4 w-4" />
    </Button>
    <Button variant="ghost" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
      <Italic className="h-4 w-4" />
    </Button>
    <Button variant="ghost" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
      <Underline className="h-4 w-4" />
    </Button>
    <div className="h-5 w-0.5 bg-[#E8E8E8] mx-1" />
    <Button variant="ghost" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
      <ListOrdered className="h-4 w-4" />
    </Button>
    <Button variant="ghost" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
      <ListOrdered className="h-4 w-4" />
    </Button>
    <Button variant="ghost" className="h-8 w-8 text-[#959595] hover:bg-[#F8F6FD] hover:text-[#6A59CE]">
      <LinkIcon className="h-4 w-4" />
    </Button>
  </div>
);

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
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    locationType: 'Physical' as 'Physical' | 'Virtual',
    location: "",
  });

  const [descriptionLength, setDescriptionLength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'description') {
        setDescriptionLength(value.length);
    }
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Logic to navigate to Step 2
  };

  return (
    <main className="min-h-screen bg-white p-6 md:p-10">
      {/* Container for Centering and Max Width */}
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex">
            {/* Icon */}
              <Image src={illustration} alt="Cal Ill" width={60} height={60} />
          
            {/* Title and Step Indicator */}
            <div className="flex flex-col w-full max-w-md items-center justify-center text-center">
              <div className="flex w-full">
                <div>
                  <h2 className="font-bricolage text-[26px] font-semibold leading-tight tracking-[-0.9px] text-black">
                      Create your event
                  </h2>
                  <p className="font-geist text-base font-medium text-[#A3A3A3]">
                      Let&apos;s start with the basics
                  </p>
                </div>
                    {/* Step Indicator - Styled to match the image */}
                    {/* <div className="ml-4 flex items-center gap-1 font-geist text-sm font-semibold text-black">
                        Step 1
                        <span className="h-1 w-8 rounded-full bg-[#E1DEF5]">
                            <span className="block h-1 w-1/2 rounded-full bg-[#6A59CE]" />
                        </span>
                        2
                    </div> */}
              </div>
            </div>
        </div>
            {/* Illustration */}
            {/* This is a placeholder for the illustration in the image */}
            <div className="my-8 h-40 w-full max-w-md overflow-hidden rounded-xl bg-[#F8F6FD] flex items-center justify-center p-4">
                {/* Replace with your actual illustration component/image */}
                <span className="font-geist text-sm text-[#6A59CE]">Event Image/Illustration Placeholder</span>
                {/* Add a camera icon overlay like in the screenshot */}
                <div className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md cursor-pointer">
                    <svg className="h-4 w-4 text-[#A3A3A3]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-3V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM9 5h6v2H9z"/><circle cx="12" cy="13" r="3"/></svg>
                </div>
            </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
            {/* Section 1: Event Basics (Name, Category, Description) */}
            <section className="flex flex-col gap-6">
                
                {/* Event Name */}
                <div className="flex flex-col gap-2">
                    <label className="font-geist text-sm font-medium text-[#0F0F0F]">
                        What&apos;s your event called?
                    </label>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Divine's games night"
                        className="h-12 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base"
                    />
                </div>
                
                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label className="font-geist text-sm font-medium text-[#0F0F0F]">
                        Category
                    </label>
                    <Select onValueChange={(value) => handleSelectChange('category', value)}>
                        <SelectTrigger className="h-12 rounded-lg border border-[#E8E8E8] focus:ring-[#6A59CE] font-geist text-base text-[#959595]">
                            <SelectValue placeholder="Choose a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map(cat => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="font-geist text-sm font-medium text-[#0F0F0F]">
                            Add a description <span className="text-[#A3A3A3]">(Optional)</span>
                        </label>
                        <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto font-geist text-sm font-medium text-[#6A59CE] hover:bg-transparent">
                            <Wand className="h-4 w-4" /> Suggest with AI
                        </Button>
                    </div>
                    <div className="relative rounded-lg border border-[#E8E8E8] transition-shadow focus-within:ring-2 focus-within:ring-[#6A59CE]/50">
                        <RichTextControls />
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={300}
                            placeholder="What should attendees know?"
                            className="min-h-[160px] resize-none rounded-t-none border-none p-4 focus-visible:ring-0 font-geist text-base text-black"
                        />
                        <div className="absolute bottom-2 right-4 font-geist text-xs text-[#A3A3A3]">
                            {descriptionLength}/300
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: When and Where? (Date, Time, Location) */}
            <section className="flex flex-col gap-6 pt-6 border-t border-[#E8E8E8]">
                <h3 className="font-bricolage text-xl font-semibold text-black">
                    When and where?
                </h3>
                
                {/* Date and Time Group */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-3">
                    {/* Date Input */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="sr-only">Date</label>
                        <div className="relative">
                            <Input
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="mm/dd/yyyy"
                                className="h-12 w-full rounded-lg border border-[#E8E8E8] pl-10 pr-4 focus-visible:ring-[#6A59CE] font-geist text-base"
                            />
                            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                        </div>
                    </div>
                    
                    {/* Start Time Input */}
                    <div className="col-span-1 md:col-span-1">
                        <label className="sr-only">Start time</label>
                        <div className="relative">
                            <Input
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                placeholder="10:00 AM"
                                className="h-12 w-full rounded-lg border border-[#E8E8E8] pl-10 pr-4 focus-visible:ring-[#6A59CE] font-geist text-base"
                            />
                            <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                        </div>
                    </div>

                    {/* End Time Input */}
                    <div className="col-span-1 md:col-span-1">
                        <label className="sr-only">End time</label>
                        <div className="relative">
                            <Input
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                placeholder="11:00 AM"
                                className="h-12 w-full rounded-lg border border-[#E8E8E8] pl-10 pr-4 focus-visible:ring-[#6A59CE] font-geist text-base"
                            />
                            <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                        </div>
                    </div>
                </div>

                {/* Timezone Helper */}
                <p className="font-geist text-sm font-medium text-[#A3A3A3]">
                    Time shown in GMT +1 (Lagos)
                </p>

                {/* Location Selector and Input */}
                <div className="flex flex-col gap-3">
                    <label className="font-geist text-sm font-medium text-[#0F0F0F]">
                        Location
                    </label>
                    
                    <LocationTypeSelector 
                        value={formData.locationType} 
                        onChange={(type) => handleSelectChange('locationType', type)} 
                    />

                    {/* Location Input Field (Physical or Virtual) */}
                    <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder={formData.locationType === 'Physical' ? "Enter location address" : "Enter virtual meeting link"}
                        className="h-12 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-base"
                    />
                </div>
            </section>
            
            {/* Footer / Action Buttons */}
            <footer className="flex w-full items-center justify-end gap-3 border-t border-[#E8E8E8] pt-6 mt-8">
                <Button 
                    variant="ghost" 
                    type="button" 
                    className="h-11 rounded-lg px-6 font-geist text-sm font-medium text-[#6A59CE] hover:bg-[#F8F6FD]"
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    className="h-11 rounded-lg bg-[#6A59CE] px-6 font-geist text-sm font-medium text-white hover:bg-[#5a4cb0]"
                >
                    Next
                </Button>
            </footer>

        </form>
      </div>
    </main>
  );
};

export default CreateEventPage;