/* eslint-disable react-hooks/static-components */
// import React, { useState } from 'react';
// import { Button } from '@/app/components/ui/button';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Textarea } from '@/app/components/ui/textarea';
// import { Switch } from '@/app/components/ui/switch'; 

// const mockSettingsData = {
//     title: "Saints pop-up",
//     description: "Experience the ultimate rooftop pop-up at 205 Apartments. Limited spots available!",
//     date: "2025-10-12T15:00", // DateTime local format
//     location: "205 Apartments Rooftop, Lekki",
//     isPaid: true,
//     price: 5000,
// };

// const EventSettingsContent: React.FC = () => {
//     // State management for form (simplified)
//     const [settings, setSettings] = useState(mockSettingsData);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setSettings(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSwitch = (checked: boolean) => {
//         setSettings(prev => ({ ...prev, isPaid: checked }));
//     };

//     const handleSave = () => {
//         console.log("Saving settings:", settings);
//         // Add save logic (API call) here
//         alert("Settings saved!");
//     };

//     return (
//         <div className="grid grid-cols-12 gap-6 pb-6">
            
//             {/* Left Column (Main Settings) */}
//             <div className="col-span-12 lg:col-span-8 space-y-6">
                
//                 {/* 1. Basic Details Card */}
//                 <div className="p-6 border border-[#F5F5F5] rounded-xl shadow-sm bg-white space-y-5">
//                     <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A]">Basic Details</h2>
                    
//                     <div className="space-y-3">
//                         <Label htmlFor="title" className="font-geist text-sm font-medium">Event Title</Label>
//                         <Input id="title" name="title" value={settings.title} onChange={handleChange} className='font-geist' />
//                     </div>
                    
//                     <div className="space-y-3">
//                         <Label htmlFor="description" className="font-geist text-sm font-medium">Description</Label>
//                         <Textarea id="description" name="description" value={settings.description} onChange={handleChange} className='font-geist min-h-[100px]' />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-3">
//                             <Label htmlFor="date" className="font-geist text-sm font-medium">Date & Time</Label>
//                             <Input id="date" name="date" type="datetime-local" value={settings.date} onChange={handleChange} className='font-geist' />
//                         </div>
//                         <div className="space-y-3">
//                             <Label htmlFor="location" className="font-geist text-sm font-medium">Location</Label>
//                             <Input id="location" name="location" value={settings.location} onChange={handleChange} className='font-geist' />
//                         </div>
//                     </div>
//                 </div>

//                 {/* 2. Payment Settings Card */}
//                 <div className="p-6 border border-[#F5F5F5] rounded-xl shadow-sm bg-white space-y-5">
//                     <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A] mb-4">Payment Settings</h2>
                    
//                     <div className="flex items-center justify-between">
//                         <Label htmlFor="paid-switch" className="font-geist text-base font-medium text-[#1A1A1A]">
//                             Is this a paid event?
//                         </Label>
//                         <Switch 
//                             id="paid-switch" 
//                             checked={settings.isPaid} 
//                             onCheckedChange={handleSwitch} 
//                             className='data-[state=checked]:bg-[#6A59CE]'
//                         />
//                     </div>

//                     {settings.isPaid && (
//                         <div className="space-y-3">
//                             <Label htmlFor="price" className="font-geist text-sm font-medium">Price (₦)</Label>
//                             <Input 
//                                 id="price" 
//                                 name="price" 
//                                 type="number" 
//                                 value={settings.price} 
//                                 onChange={handleChange} 
//                                 className='font-geist'
//                             />
//                         </div>
//                     )}
//                 </div>

//                 {/* Save Button */}
//                 <Button onClick={handleSave} className="bg-[#6A59CE] hover:bg-[#5a4cb0] font-geist font-semibold py-3 px-8 text-base">
//                     Save Changes
//                 </Button>
//             </div>

//             {/* Right Column (Placeholder/Future Settings) */}
//             <div className="col-span-12 lg:col-span-4 space-y-6">
//                 <div className="p-6 border border-[#F5F5F5] rounded-xl shadow-sm bg-white">
//                     <h3 className="font-bricolage text-base font-semibold text-[#1A1A1A]">Advanced Settings</h3>
//                     <p className="font-geist text-sm text-[#767676] mt-2">
//                         Future options like visibility, capacity limits, or custom forms will appear here.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EventSettingsContent;

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch'; 
import DeleteConfirmationModal from './delete-confirmation-modal';

// Mock state based on the provided screenshot's toggles
const mockSettingsData = {
    notifyNewRSVP: true,
    sendReminder: false,
    requireGuestApproval: false,
    hideAttendeeList: true,
};

const EventSettingsContent: React.FC = () => {
    // State management for event settings (notifications and RSVP options)
    const [settings, setSettings] = useState(mockSettingsData);
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggle = (name: keyof typeof mockSettingsData, checked: boolean) => {
        setSettings(prev => ({ ...prev, [name]: checked }));
    };

    const handleSave = () => {
        setIsSaving(true);
        console.log("Saving settings:", settings);
        // Simulate API call delay
        setTimeout(() => {
            setIsSaving(false);
            alert("Settings saved!");
        }, 800);
    };

    const handleConfirmDelete = () => {
        setIsModalOpen(false);
    }
    
    // A reusable component for a single toggle setting
    const SettingToggle: React.FC<{
        id: keyof typeof mockSettingsData;
        label: string;
        description: string;
    }> = ({ id, label, description }) => (
        <div className="flex items-start justify-between py-3">
            <div className="space-y-0.5">
                <Label htmlFor={id} className="font-geist text-[15px] font-medium text-[#333333] leading-[150%] tracking-[-0.2px]">
                    {label}
                </Label>
                <p className="font-geist text-[13px] font-normal text-[#959595] leading-[150%] tracking-[-0.1px]">
                    {description}
                </p>
            </div>
            <Switch 
                id={id} 
                checked={settings[id]}
                onCheckedChange={(checked) => handleToggle(id, checked)}
                className='data-[state=checked]:bg-[#6A59CE] ml-4 mt-1'
            />
        </div>
    );

    return (
        <>
            <div className=" bg-white flex flex-col justify-between gap-22">
                
                {/* Notifications and RSVP Options - Main Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* 1. Notifications Column */}
                    <div className="space-y-4">
                        <h2 className="font-geist text-[15px] font-medium text-[#767676] leading-[150%] tracking-[-0.2px]">Notifications</h2>
                        <div className="space-y-2 border border-[#0000000D] rounded-[16px] px-6 py-2 shadow shadow-[#1A1A1A0D]">
                            <SettingToggle
                                id="notifyNewRSVP"
                                label="Notify me of new RSVPs"
                                description="When someone joins your event"
                            />
                            <SettingToggle
                                id="sendReminder"
                                label="Send reminder before event"
                                description="Automated reminder to attendees"
                            />
                        </div>
                    </div>

                    {/* 2. RSVP Options Column */}
                    <div className="space-y-4">
                        <h2 className="font-geist text-[15px] font-medium text-[#767676] leading-[150%] tracking-[-0.2px]">RSVP options</h2>
                        <div className="space-y-2 border border-[#0000000D] rounded-[16px] px-6 py-2 shadow shadow-[#1A1A1A0D]">
                            <SettingToggle
                                id="requireGuestApproval"
                                label="Require guest approval"
                                description="Guests will request to “Get on the list”"
                            />
                            <SettingToggle
                                id="hideAttendeeList"
                                label="Hide attendee list"
                                description="Keep who’s coming private"
                            />
                        </div>
                    </div>
                </div>
                

                {/* Delete Event Section */}
                {/* <div className="space-y-6 border border-[#0000000D] rounded-2xl p-6 shadow shadow-[#1A1A1A0D]">
                    <div className='space-y-1.5'>
                        <h2 className="font-bricolage text-[20px] font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.7px]">Delete event</h2>
                        <p className="font-geist text-sm text-[#A3A3A3]">This action is permanent and can’t be undone</p>
                    </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#EF4444] hover:bg-[#D93B3B] font-geist font-semibold py-3 px-4 text-sm text-white leading-[135%] tracking-[-0.2px] rounded-lg"
                        >
                            Delete event
                        </button>
                </div> */}
                <div className="p-6 border border-[#0000000D] rounded-[16px] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow shadow-[#1A1A1A0D]">
                    <div className="space-y-1.5">
                        <h3 className="font-bricolage font-semibold text-[18px] text-[#1A1A1A] leading-[120%] tracking-[-0.6px]">Delete event</h3>
                        <p className="font-geist font-medium text-sm text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">This action is permanent and can&apos;t be undone</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-geist font-medium py-3 px-[18px] rounded-lg transition-colors leading-[135%] tracking-[-0.2px] cursor-pointer"
                    >
                        Delete event
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal Integration */}
            <DeleteConfirmationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirmDelete={handleConfirmDelete}
            />
        </>
    );
};

export default EventSettingsContent;