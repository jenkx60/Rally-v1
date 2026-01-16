// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { Button } from '@/app/components/ui/button';
// import { Switch } from '@/app/components/ui/switch';
// import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
// import { Label } from '@/app/components/ui/label';
// import { 
//     Popover, 
//     PopoverContent, 
//     PopoverTrigger 
// } from '@/app/components/ui/popover';


// interface FilterState {
//     date: 'All' | 'Today' | 'This week' | 'This month';
//     locationType: 'All' | 'Physical' | 'Virtual';
//     freeEventsOnly: boolean;
// }

// const initialFilterState: FilterState = {
//     date: 'All',
//     locationType: 'All',
//     freeEventsOnly: false,
// };

// interface EventsFilterPopoverProps {
//     onApplyFilters: (filters: FilterState) => void;
//     children: React.ReactNode; // the trigger element ListFilter Button
// }

// const EventsFilterPopover: React.FC<EventsFilterPopoverProps> = ({ onApplyFilters, children }) => {
//     const [open, setOpen] = useState(false);
//     const [currentFilters, setCurrentFilters] = useState<FilterState>(initialFilterState);

//     const handleClear = () => {
//         setCurrentFilters(initialFilterState);
//         onApplyFilters(initialFilterState);
//         setOpen(false);
//     };

//     const handleApply = () => {
//         onApplyFilters(currentFilters);
//         setOpen(false);
//     };

//     const handleDateChange = (value: string) => {
//         setCurrentFilters(prev => ({ ...prev, date: value as FilterState['date'] }));
//     };

//     const handleLocationChange = (value: string) => {
//         setCurrentFilters(prev => ({ ...prev, locationType: value as FilterState['locationType'] }));
//     };

//     const handleFreeEventsSwitch = (checked: boolean) => {
//         setCurrentFilters(prev => ({ ...prev, freeEventsOnly: checked }));
//     };

//     return (
//         <Popover open={open} onOpenChange={setOpen}>
//             <PopoverTrigger asChild>
//                 {children}
//             </PopoverTrigger>
            
//             <PopoverContent 
//                 // Set Popover width and custom styling to match the image
//                 className="w-[420px] p-0 bg-white rounded-xl shadow-lg border-none"
//                 align="end" // Align to the right of the trigger button
//             >
//                 {/* Custom Header: Title and Close Button on the same flex line */}
//                 <div className="flex items-center justify-between p-4 border-b border-dashed border-[#E8E8E8]">
//                     <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.7px]">
//                         Filters
//                     </h2>
//                     {/* Close Button (X) */}
//                     <button 
//                         onClick={() => setOpen(false)}
//                         className="text-[#A3A3A3] hover:text-[#525252] focus:outline-none"
//                         aria-label="Close"
//                     >
//                         <X className="h-5 w-5" />
//                     </button>
//                 </div>

//                 {/* Filter Options Body */}
//                 <div className="p-4 space-y-6">
                    
//                     {/* 1. Date Filter */}
//                     <div className="space-y-3">
//                         <h3 className="font-geist text-sm font-medium text-[#767676]">Date</h3>
//                         <RadioGroup value={currentFilters.date} onValueChange={handleDateChange} className="space-y-2">
//                             {['Today', 'This week', 'This month'].map(dateOption => (
//                                 <div key={dateOption} className="flex items-center space-x-3">
//                                     <RadioGroupItem 
//                                         value={dateOption} 
//                                         id={`date-${dateOption.toLowerCase().replace(' ', '-')}`} 
//                                         className="text-[#6A59CE] data-[state=checked]:border-[#6A59CE] border-2"
//                                     />
//                                     <Label htmlFor={`date-${dateOption.toLowerCase().replace(' ', '-')}`} className="font-geist text-base font-normal text-[#1A1A1A]">
//                                         {dateOption}
//                                     </Label>
//                                 </div>
//                             ))}
//                         </RadioGroup>
//                     </div>

//                     {/* 2. Location Type Filter */}
//                     <div className="space-y-3">
//                         <h3 className="font-geist text-sm font-medium text-[#767676]">Location type</h3>
//                         <RadioGroup value={currentFilters.locationType} onValueChange={handleLocationChange} className="space-y-2">
//                             {['Physical', 'Virtual'].map(typeOption => (
//                                 <div key={typeOption} className="flex items-center space-x-3">
//                                     <RadioGroupItem 
//                                         value={typeOption} 
//                                         id={`loc-${typeOption.toLowerCase()}`} 
//                                         className="text-[#6A59CE] data-[state=checked]:border-[#6A59CE] border-2"
//                                     />
//                                     <Label htmlFor={`loc-${typeOption.toLowerCase()}`} className="font-geist text-base font-normal text-[#1A1A1A]">
//                                         {typeOption}
//                                     </Label>
//                                 </div>
//                             ))}
//                         </RadioGroup>
//                     </div>

//                     {/* 3. Ticket Price Filter (Switch) */}
//                     <div className="space-y-3">
//                         <h3 className="font-geist text-sm font-medium text-[#767676]">Ticket price</h3>
//                         <div className="flex items-center justify-between">
//                             <Label htmlFor="free-switch" className="font-geist text-base font-normal text-[#1A1A1A]">
//                                 Show only free events
//                             </Label>
//                             <Switch 
//                                 id="free-switch" 
//                                 checked={currentFilters.freeEventsOnly}
//                                 onCheckedChange={handleFreeEventsSwitch}
//                                 className='data-[state=checked]:bg-[#6A59CE] data-[state=unchecked]:bg-[#E8E8E8]'
//                             />
//                         </div>
//                     </div>

//                 </div>

//                 {/* Footer Buttons */}
//                 <div className="flex p-4 border-t border-[#F5F5F5] space-x-3">
//                     <Button 
//                         variant="outline"
//                         onClick={handleClear} 
//                         className="flex-1 border-[#E8E8E8] text-[#525252] hover:bg-[#F7F7F7] font-geist font-semibold py-2.5 px-4 text-sm"
//                     >
//                         Clear all
//                     </Button>
//                     <Button 
//                         onClick={handleApply}
//                         className="flex-1 bg-[#6A59CE] hover:bg-[#5a4cb0] font-geist font-semibold py-2.5 px-4 text-sm"
//                     >
//                         Apply filters
//                     </Button>
//                 </div>

//             </PopoverContent>
//         </Popover>
//     );
// };

// export default EventsFilterPopover;

"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from '@/app/components/ui/drawer';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';

interface FilterState {
    date: 'All' | 'Today' | 'This week' | 'This month';
    locationType: 'All' | 'Physical' | 'Virtual';
    freeEventsOnly: boolean;
}

const initialFilterState: FilterState = {
    date: 'All',
    locationType: 'All',
    freeEventsOnly: false,
};

interface EventsFilterPopoverProps {
    onApplyFilters: (filters: FilterState) => void;
    children: React.ReactNode;
}

// --- Shared Form Content ---
interface FilterFormProps {
    currentFilters: FilterState;
    setCurrentFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    handleApply: () => void;
    handleClear: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ 
    currentFilters, 
    setCurrentFilters, 
    handleApply, 
    handleClear 
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-6">
                {/* 1. Date Filter */}
                <div className="space-y-3">
                    <h3 className="font-geist text-sm font-medium text-[#767676]">Date</h3>
                    <RadioGroup 
                        value={currentFilters.date} 
                        onValueChange={(val) => setCurrentFilters(prev => ({ ...prev, date: val as FilterState['date'] }))} 
                        className="space-y-2"
                    >
                        {['Today', 'This week', 'This month'].map(dateOption => (
                            <div key={dateOption} className="flex items-center space-x-3">
                                <RadioGroupItem 
                                    value={dateOption} 
                                    id={`date-${dateOption.toLowerCase().replace(' ', '-')}`} 
                                    className="text-[#6A59CE] data-[state=checked]:border-[#6A59CE] border shadow-none"
                                />
                                <Label htmlFor={`date-${dateOption.toLowerCase().replace(' ', '-')}`} className="font-geist text-base font-normal text-[#1A1A1A]">
                                    {dateOption}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* 2. Location Type Filter */}
                <div className="space-y-3">
                    <h3 className="font-geist text-sm font-medium text-[#767676]">Location type</h3>
                    <RadioGroup 
                        value={currentFilters.locationType} 
                        onValueChange={(val) => setCurrentFilters(prev => ({ ...prev, locationType: val as FilterState['locationType'] }))} 
                        className="space-y-2"
                    >
                        {['Physical', 'Virtual'].map(typeOption => (
                            <div key={typeOption} className="flex items-center space-x-3">
                                <RadioGroupItem 
                                    value={typeOption} 
                                    id={`loc-${typeOption.toLowerCase()}`} 
                                    className="text-[#6A59CE] data-[state=checked]:border-[#6A59CE] border-2"
                                />
                                <Label htmlFor={`loc-${typeOption.toLowerCase()}`} className="font-geist text-base font-normal text-[#1A1A1A]">
                                    {typeOption}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* 3. Ticket Price Filter (Switch) */}
                <div className="space-y-3">
                    <h3 className="font-geist text-sm font-medium text-[#767676]">Ticket price</h3>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="free-switch" className="font-geist text-base font-normal text-[#1A1A1A]">
                            Show only free events
                        </Label>
                        <Switch 
                            id="free-switch" 
                            checked={currentFilters.freeEventsOnly}
                            onCheckedChange={(checked) => setCurrentFilters(prev => ({ ...prev, freeEventsOnly: checked }))}
                            className='data-[state=checked]:bg-[#6A59CE] data-[state=unchecked]:bg-[#E8E8E8]'
                        />
                    </div>
                </div>
            </div>

            {/* Actions: Matching your Button styles */}
            <div className="flex pt-4 border-t border-[#F5F5F5] space-x-3">
                <Button 
                    variant="outline"
                    onClick={handleClear} 
                    className="flex-1 border-[#E8E8E8] text-[#525252] hover:bg-[#F7F7F7] font-geist font-semibold h-11 text-[15px]"
                >
                    Clear all
                </Button>
                <Button 
                    onClick={handleApply}
                    className="flex-1 bg-[#6A59CE] hover:bg-[#5a4cb0] font-geist font-semibold h-11 text-[15px] text-white"
                >
                    Apply filters
                </Button>
            </div>
        </div>
    );
};

// --- Shared Header Component ---
const CustomHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="font-bricolage text-xl font-semibold text-[#1A1A1A] leading-[130%] tracking-[-0.7px]">
        Filters
    </h2>
    <button 
      onClick={onClose} 
      className="hidden md:block text-[#A3A3A3] hover:text-[#1A1A1A] focus:outline-none"
    >
      <X size={20} />
    </button>
  </div>
);

// --- Main Component ---
const EventsFilterPopover: React.FC<EventsFilterPopoverProps> = ({ onApplyFilters, children }) => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [currentFilters, setCurrentFilters] = useState<FilterState>(initialFilterState);

    const handleClear = () => {
        setCurrentFilters(initialFilterState);
        onApplyFilters(initialFilterState);
        setOpen(false);
    };

    const handleApply = () => {
        onApplyFilters(currentFilters);
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    // 1. MOBILE VIEW (Drawer)
    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={handleOpenChange}>
                <DrawerTrigger asChild>
                    {children}
                </DrawerTrigger>
                <DrawerContent>
                    <VisuallyHidden.Root>
                        <DrawerTitle>Filters</DrawerTitle>
                        <DrawerDescription>Adjust event filters</DrawerDescription>
                    </VisuallyHidden.Root>
                    <div className="p-6">
                        <CustomHeader onClose={() => setOpen(false)} />
                        <FilterForm 
                            currentFilters={currentFilters}
                            setCurrentFilters={setCurrentFilters}
                            handleApply={handleApply}
                            handleClear={handleClear}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    // 2. DESKTOP VIEW (Popover)
    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                className="w-[420px] p-6 bg-white rounded-xl shadow-lg border-none"
                align="end"
            >
                <CustomHeader onClose={() => setOpen(false)} />
                <FilterForm 
                    currentFilters={currentFilters}
                    setCurrentFilters={setCurrentFilters}
                    handleApply={handleApply}
                    handleClear={handleClear}
                />
            </PopoverContent>
        </Popover>
    );
};

export default EventsFilterPopover;