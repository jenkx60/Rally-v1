// "use client";

// import React, { useRef, useState } from "react";
// import Image, { StaticImageData } from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import illustration from "@/public/Sidebar/cal-ill.svg";
// import tag from "@/public/Sidebar/tag.svg";
// import bank from "@/public/Sidebar/bank_card_fill.svg";
// import party from "@/public/Sidebar/party_popper.svg"; // Assuming you have this or similar for the success screen icon
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Textarea } from "@/app/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select";
// import { 
//   Calendar, Clock, MapPin, Globe, Wand, 
//   Bold, Italic, Underline, ListOrdered, Link as LinkIcon, 
//   Tag, Gift, CreditCard,
//   Monitor,
//   Ticket,
//   Pencil,
//   Trash2,
//   Plus,
//   Share2,
//   ArrowRight,
//   Copy,
//   LayoutDashboard
// } from "lucide-react";
// import camera from "@/public/Sidebar/camera_2.svg";
// import people from "@/public/Sidebar/people-happy.svg";
// import { cn } from "@/lib/utils";
// import StepIndicator from "@/app/components/dashboard/events/step-indicator"; 
// import RichTextControls from "@/app/components/dashboard/events/richText-controls";
// import { format } from "date-fns";
// import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
// import { Calendar as CalendarComponent } from "@/app/components/ui/calendar";
// import image1 from '@/public/Sidebar/cal-ill.svg';
// import image2 from '@/public/Sidebar/link-up.svg';
// import image3 from '@/public/Sidebar/sunday-ill.svg';
// import image4 from '@/public/Sidebar/sip-ill.svg';

// // --- Mock Data matching the image ---
// const MOCK_EVENTS = [
//     {
//         id: "saints-popup",
//         title: "Saints pop-up",
//         dateRange: "Today • 6:00 PM - 11:00 PM",
//         location: "Shore mall, Osapa",
//         attendees: 5,
//         status: 'Live' as const,
//         imageSrc: image1,
//     },
//     {
//         id: "the-link-up",
//         title: "The link up",
//         dateRange: "Fri, Nov 21 • 5:30 PM - 10:30 PM",
//         location: "The Garden, Ikoyi",
//         attendees: 9,
//         status: 'Upcoming' as const,
//         imageSrc: image2,
//     },
//     {
//         id: "sunday-brunch",
//         title: "Potluck & chill",
//         dateRange: "Sat, Oct 12 • 1:30 PM - 4:30 PM",
//         location: "Lekki phase 1, Lekki",
//         attendees: 6,
//         status: 'Upcoming' as const,
//         imageSrc: image3,
//     },
//     {
//         id: "sip-yap",
//         title: "Sip & yap",
//         dateRange: "Sat, Oct 12 • 1:30 PM - 4:30 PM",
//         location: "Lekki phase 1, Lekki",
//         attendees: 0,
//         status: 'Past' as const,
//         imageSrc: image4,
//     },
// ];

// // --- Types & Mock Data ---

// const CATEGORIES = [
//   "Music & Concerts",
//   "Tech & Business",
//   "Workshops & Classes",
//   "Food & Drink",
//   "Sports & Fitness",
// ];

// const generateTimeOptions = () => {
//     const times = [];
//     for (let i = 0; i < 24; i++) {
//         const hour = i % 12 || 12;
//         const ampm = i < 12 ? "AM" : "PM";
//         times.push(`${hour}:00 ${ampm}`);
//         times.push(`${hour}:30 ${ampm}`);
//     }
//     return times;
// };

// const TIME_OPTIONS = generateTimeOptions();

// interface TicketData {
//   id: string; 
//   type: 'Free' | 'Paid';
//   name: string;
//   price: string;
//   spots: string;
//   description: string;
// }

// interface FormData {
//   title: string;
//   category: string;
//   description: string;
//   date: Date | undefined;
//   startTime: string;
//   endTime: string;
//   locationType: 'Physical' | 'Virtual';
//   location: string;
// }

// // --- Sub-Components ---

// interface LocationTypeSelectorProps {
//     value: 'Physical' | 'Virtual';
//     onChange: (type: 'Physical' | 'Virtual') => void;
// }

// const LocationTypeSelector: React.FC<LocationTypeSelectorProps> = ({ value, onChange }) => (
//     <div className="flex gap-2">
//         {['Physical', 'Virtual'].map((type) => {
//             const isSelected = value === type;
//             return (
//                 <button
//                     key={type}
//                     type="button"
//                     onClick={() => onChange(type as 'Physical' | 'Virtual')}
//                     className={cn(
//                         "flex items-center gap-2 rounded-md px-3 py-1.5 font-geist text-sm leading-6 font-medium transition-colors cursor-pointer",
//                         isSelected
//                             ? "border border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
//                             : "border-[#E8E8E8] bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
//                     )}
//                 >
//                     {type === 'Physical' ? (
//                         <MapPin className="h-4 w-4" />
//                     ) : (
//                         <Monitor className="h-4 w-4" />
//                     )}
//                     {type}
//                 </button>
//             );
//         })}
//     </div>
// );

// // --- Main Page Component ---

// const CreateEventPage = () => {
//   const [step, setStep] = useState(1);
//   const [isSuccess, setIsSuccess] = useState(false); // Track if event is created successfully
//   const [descriptionLength, setDescriptionLength] = useState(0);
//   const [ticketDescLength, setTicketDescLength] = useState(0);
//   const [eventImageURL, setEventImageURL] = useState<string | StaticImageData>(people);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
//   const router = useRouter();

//   // Form Data for Step 1
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     category: "",
//     description: "",
//     date: undefined,
//     startTime: "",
//     endTime: "",
//     locationType: 'Physical',
//     location: "",
//   });

//   // State for Ticket Management (Step 2)
//   const [tickets, setTickets] = useState<TicketData[]>([]);
//   const [isTicketFormOpen, setIsTicketFormOpen] = useState(true);
//   const [editingTicketId, setEditingTicketId] = useState<string | null>(null);

//   // State for the CURRENT ticket being edited/created
//   const [currentTicket, setCurrentTicket] = useState<TicketData>({
//     id: "",
//     type: 'Paid',
//     name: "",
//     price: "",
//     spots: "",
//     description: ""
//   });

//   const isAiActive = !!formData.title && !!formData.category

//   // --- Validation Logic ---

//   // Check if Step 1 is valid
//   const isStep1Valid = () => {
//     return (
//         formData.title.trim() !== "" &&
//         formData.category !== "" &&
//         // formData.date !== "" &&
//         formData.date !== undefined &&
//         formData.startTime !== "" &&
//         formData.endTime !== "" &&
//         formData.location.trim() !== ""
//     );
//   };

//   // Check if current Ticket form is valid
//   const isTicketFormValid = () => {
//     const basicValid = currentTicket.name.trim() !== "";
//     if (currentTicket.type === 'Paid') {
//         return basicValid && currentTicket.price.trim() !== "" && Number(currentTicket.price) > 0;
//     }
//     return basicValid;
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//         const file = e.target.files[0];
//         setEventImageURL(URL.createObjectURL(file));
//     }
//   };

//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//         fileInputRef.current.click();
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
    
//     if (name === 'description') setDescriptionLength(value.length);
//   };

//   const handleDateSelect = (date: Date | undefined) => {
//     setFormData((prev) => ({ ...prev, date: date}));
//   };

//   const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   }


//   const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setCurrentTicket((prev) => ({ ...prev, [name]: value }));
//     if (name === 'description') setTicketDescLength(value.length);
//   };

//   const handleSelectChange = (name: keyof FormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTicketSelectChange = (name: keyof TicketData, value: string) => {
//     setCurrentTicket((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNext = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isStep1Valid()) {
//         setStep(2);
//         window.scrollTo(0, 0);
//     }
//   };

//   const handleBack = () => {
//     if (step === 2) {
//         setStep(1);
//         window.scrollTo(0, 0);
//     }
//   };

//   // --- Ticket Management Functions ---

//   const handleSaveTicket = () => {
//     if (!isTicketFormValid()) return;

//     if (editingTicketId) {
//         setTickets(prev => prev.map(t => t.id === editingTicketId ? { ...currentTicket, id: editingTicketId } : t));
//         setEditingTicketId(null);
//     } else {
//         const newTicket = { ...currentTicket, id: Math.random().toString(36).substr(2, 9) };
//         setTickets(prev => [...prev, newTicket]);
//     }

//     setCurrentTicket({
//         id: "",
//         type: 'Paid',
//         name: "",
//         price: "",
//         spots: "",
//         description: ""
//     });
//     setTicketDescLength(0);
//     setIsTicketFormOpen(false);
//   };

//   const handleEditTicket = (ticket: TicketData) => {
//     setCurrentTicket(ticket);
//     setEditingTicketId(ticket.id);
//     setIsTicketFormOpen(true);
//     setTicketDescLength(ticket.description.length);
//   };

//   const handleDeleteTicket = (id: string) => {
//     const updatedTickets = tickets.filter(t => t.id !== id);
//     setTickets(updatedTickets);
//     // If we delete all tickets, re-open the form
//     if (updatedTickets.length === 0) {
//         setIsTicketFormOpen(true);
//     }
//   };

//   const handleAddAnotherTicket = () => {
//     setCurrentTicket({
//         id: "",
//         type: 'Paid',
//         name: "",
//         price: "",
//         spots: "",
//         description: ""
//     });
//     setEditingTicketId(null);
//     setIsTicketFormOpen(true);
//   };

//   const handleFinalSubmit = async () => {
//     if (tickets.length === 0) return;

//     try {
//         const finalPayload = {
//             ...formData,
//             tickets: tickets
//         };

//         const res = await fetch('/api/events', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(finalPayload)
//         });

//         if (!res.ok) {
//             throw new Error('Failed to create event');
//         }

//         const params = new URLSearchParams();
//         params.set("title", formData.title);
//         if (formData.date) {
//             params.set("date", format(formData.date, "EEEE, MMMM d"));
//         }
//         params.set("startTime", formData.startTime);
//         params.set("endTime", formData.endTime);
//         params.set("location", formData.location);

//         router.push(`/success?${params.toString()}`)
//         setIsSuccess(true);
//         window.scrollTo(0, 0);
        
//     } catch (error) {
//         console.error("Failed to create event", error);
//         // Ideally show toast error here
//     }
//   };


//   // --- Render Step 1: Create Event ---
//   const renderStep1 = () => (
//     <form onSubmit={handleNext} className="flex flex-col gap-8 pt-4 md:pt-8 animate-in fade-in slide-in-from-right-4 duration-300">
//         <div className="h-[200px] w-full md:w-[350px] rounded-[12px] bg-[#F8F6FD] flex items-center justify-center relative overflow-hidden">
//             <Image 
//                 src={eventImageURL} 
//                 alt="Event Image" 
//                 layout="fill"
//                 objectFit="cover"
//                 className={cn("transition-opacity rounded-[12px]", typeof eventImageURL === 'string' ? "opacity-100" : "opacity-100")}
//             />

//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//                 accept="image/*"
//                 className="hidden"
//             />
            
//             <button 
//                 type="button" 
//                 onClick={handleUploadClick} 
//                 className="absolute right-4 bottom-4 border-2 border-white flex h-8 w-8 items-center justify-center bg-[#F8F6FD] rounded-md shadow-md cursor-pointer hover:bg-gray-50 transition-colors z-10"
//             >
//                 <Image src={camera} alt="upload" width={20} height={20} />
//             </button>
//         </div>

//         <section className="flex flex-col gap-6">
//             <div className="flex flex-col gap-1.5">
//                 <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">What&apos;s your event called?</label>
//                 <Input 
//                     name="title" 
//                     value={formData.title} 
//                     onChange={handleChange} 
//                     placeholder="e.g. Divii's games night" 
//                     className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" 
//                 />
//             </div>
            
//             <div className="flex flex-col gap-1.5 w-full">
//                 <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Category</label>
//                 <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
//                     <SelectTrigger className="py-2.5 px-3.5 rounded-lg border border-[#E8E8E8] focus:ring-[#6A59CE] font-geist text-[15px] text-[#333333] w-full shadow-none">
//                         <SelectValue placeholder="Choose a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
//                     </SelectContent>
//                 </Select>
//             </div>

//             <div className="flex flex-col gap-1.5">
//                 <div className="flex items-center justify-between">
//                     <label className="font-geist text-[14px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">Add a description <span className="text-[#A3A3A3] font-geist font-normal">(Optional)</span></label>
//                     <button 
//                         type="button" 
//                         disabled={!isAiActive} 
//                         className={cn("flex items-center gap-1 p-0 h-auto font-geist text-sm font-medium text-[#6A59CE] hover:bg-transparent cursor-pointer",
//                             isAiActive ? "text-[#6A59CE] hover:text-[#5a4cb0]" : "text-[#A3A3A3] cursor-not-allowed"
//                         )}
//                     >
//                         <Wand className="h-4 w-4" /> 
//                         <span className="font-geist font-medium text-sm leading-[150%] tracking-[-0.1px]">Suggest with AI</span>
//                     </button>
//                 </div>
//                 <div className=" rounded-lg border border-[#E8E8E8] transition-shadow focus-within:ring-2 focus-within:ring-[#6A59CE]/50">
//                     <RichTextControls textareaRef={descriptionTextareaRef} />
//                     <Textarea 
//                         ref={descriptionTextareaRef} 
//                         name="description" value={formData.description} 
//                         onChange={handleChange} 
//                         maxLength={300} 
//                         placeholder="What should attendees know?" 
//                         className="min-h-40 resize-none rounded-t-none border-none p-4 focus-visible:ring-0 font-geist text-[14px] text-black placeholder:text-[#BFBFBF] leading-[150%] tracking-[-0.2px] shadow-none" />
//                 </div>
//                 <div className="font-geist text-xs text-[#A3A3A3] flex justify-end">{descriptionLength}/300</div>
//             </div>
//         </section>

//         <section className="flex flex-col gap-6 pt-2 md:pt-6">
//             <h3 className="font-bricolage text-[20px] font-semibold leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">When and where?</h3>
//             <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
//                 <div className="grid col-span-1 md:col-span-2 gap-1.5">
//                     <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Date</label>
//                     {/* <div className="relative">
//                         <Input 
//                             name="date" 
//                             value={formData.date} 
//                             onChange={handleChange} 
//                             placeholder="mm/dd/yyyy" 
//                             className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none"  
//                         />
//                         <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
//                     </div> */}

//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 variant={"outline"}
//                                 className={cn("relative flex justify-start px-3.5 py-2.5 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none",
//                                     !formData.date && "text-[#000000]"
//                                 )}
//                             >
//                                 {formData.date ? format(formData.date, "PPP") : <span className="text-[#BFBFBF]">mm/dd/yyyy</span>}
//                                 <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0" align="center">
//                             <CalendarComponent
//                                 mode="single"
//                                 selected={formData.date}
//                                 onSelect={handleDateSelect}
//                                 initialFocus 
//                             />
//                         </PopoverContent>
//                     </Popover>
//                 </div>
//                 <div className="grid col-span-1 md:col-span-1 gap-1.5">
//                     <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Start time</label>
//                     <Select value={formData.startTime} onValueChange={(value) => handleSelectChange("startTime", value)}>
//                         <SelectTrigger className="relative rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none">
//                             <SelectValue placeholder="10:00 AM" />
//                             {/* <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" /> */}
//                         </SelectTrigger>
//                         <SelectContent>
//                             {TIME_OPTIONS.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <div className="grid col-span-1 md:col-span-1 gap-1.5">
//                     <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">End time</label>
//                     <Select value={formData.endTime} onValueChange={(value) => handleSelectChange("endTime", value)}>
//                         <SelectTrigger className="relative rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none">
//                             <SelectValue placeholder="10:00 PM" />
//                             {/* <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" /> */}
//                         </SelectTrigger>
//                         <SelectContent>
//                             {TIME_OPTIONS.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <p className="font-geist text-xs font-medium text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">Time shown in GMT +1 (Lagos)</p>
//             </div>
//             <div className="flex flex-col gap-3">
//                 <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Location</label>
//                 <LocationTypeSelector value={formData.locationType} onChange={(type) => handleSelectChange('locationType', type)} />
//                 <Input name="location" value={formData.location} onChange={handleChange} placeholder={formData.locationType === 'Physical' ? "Enter location" : "Paste meeting link (Zoom, Google meet, etc.)"} className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" />
//             </div>
//         </section>
        
//         <footer className="flex w-full items-center justify-between gap-3 pt-6 mt-8">
//             <button type="button" className="rounded-lg px-6 py-4 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-[#959595] hover:bg-[#FAFAFA] border border-[#E8E8E8]">Cancel</button>
//             <button 
//                 type="submit" 
//                 disabled={!isStep1Valid()}
//                 className="rounded-lg px-6 py-4 bg-[#6A59CE] font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white hover:bg-[#5a4cb0] disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595] disabled:cursor-not-allowed"
//             >
//                 Next
//             </button>
//         </footer>
//     </form>
//   );

//   // --- Render Step 2: Set up tickets ---
//   const renderStep2 = () => (
//     <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300 pt-4 md:pt-0">
        
//         {/* Is this free or paid? (Only show if form is open or it's the first time) */}
//         {isTicketFormOpen && (
//             <div className="flex flex-col gap-4">
//                 <label className="font-geist text-[15px] font-medium text-[#333333] leading-[150%] tracking-[-0.2px]">Is this free or paid?</label>
//                 <div className="flex gap-3">
//                     <button
//                         type="button"
//                         onClick={() => handleTicketSelectChange('type', 'Free')}
//                         className={cn(
//                             "flex-1 md:flex-none justify-center md:justify-start flex items-center gap-2 rounded-md px-3.5 py-2.5 font-geist text-[15px] leading-[150%] tracking-[-0.2px] font-medium transition-all cursor-pointer",
//                             currentTicket.type === 'Free'
//                                 ? "border border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
//                                 : "bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
//                         )}
//                     >
//                         <Gift className="h-4 w-4" />
//                         Free
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleTicketSelectChange('type', 'Paid')}
//                         className={cn(
//                             "flex-1 md:flex-none justify-center md:justify-start flex items-center gap-2 rounded-md px-3.5 py-2.5 font-geist text-[15px] leading-[150%] tracking-[-0.2px] font-medium transition-all cursor-pointer",
//                             currentTicket.type === 'Paid'
//                                 ? "border border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
//                                 : " bg-white text-[#959595] hover:border-[#6A59CE] hover:text-[#6A59CE]"
//                         )}
//                     >
//                         <Image src={bank} alt="Bank fill" width={16} height={16} />
//                         Paid
//                     </button>
//                 </div>
//             </div>
//         )}

//         {/* 2. Ticket List View (Rendered if there are tickets) */}
//         {tickets.length > 0 && (
//             <div className="flex flex-col gap-4">
//                 {tickets.map((ticket) => (
//                     <div key={ticket.id} className="rounded-xl border border-[#E8E8E8] p-4 bg-white flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <div className="h-10 w-10 rounded-lg bg-[#F8F6FD] flex items-center justify-center text-[#6A59CE]">
//                                 <Ticket className="h-5 w-5" />
//                             </div>
//                             <div>
//                                 <h4 className="font-geist text-[15px] font-semibold text-[#1A1A1A]">{ticket.name}</h4>
//                                 <p className="font-geist text-xs text-[#959595]">
//                                     {ticket.type === 'Free' ? 'Free' : `₦${ticket.price}`} • {ticket.spots ? `${ticket.spots} spots` : 'Unlimited'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <button 
//                                 onClick={() => handleEditTicket(ticket)}
//                                 className="p-2 text-[#959595] hover:text-[#6A59CE] hover:bg-[#F8F6FD] rounded-full transition-colors"
//                             >
//                                 <Pencil className="h-4 w-4" />
//                             </button>
//                             <button 
//                                 onClick={() => handleDeleteTicket(ticket.id)}
//                                 className="p-2 text-[#959595] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-full transition-colors"
//                             >
//                                 <Trash2 className="h-4 w-4" />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )}

//         {/* 3. Another Ticket Button (Shown when list exists and form is closed) */}
//         {!isTicketFormOpen && tickets.length > 0 && (
//             <button 
//                 onClick={handleAddAnotherTicket}
//                 className="flex items-center gap-2 text-[#6A59CE] font-geist text-[15px] font-medium hover:underline w-fit"
//             >
//                 <Plus className="h-4 w-4" />
//                 Add another ticket
//             </button>
//         )}

//         {/* 4. Ticket Form Card (Shown if creating new, editing, or no tickets exist) */}
//         {(isTicketFormOpen || tickets.length === 0) && (
//             <div className="rounded-xl border border-[#E8E8E8] p-4 md:p-8 bg-white shadow-xs space-y-6">
//                 <div className="flex items-center justify-between">
//                     <h3 className="font-bricolage text-[20px] font-semibold text-[#1a1a1a] leading-[130%] tracking-[-0.7px]">
//                         Ticket details {tickets.length > 0 ? `(${tickets.length + 1})` : ''}
//                     </h3>
//                     {tickets.length > 0 && (
//                         <button onClick={() => setIsTicketFormOpen(false)} className="text-xs text-[#959595] hover:text-[#1A1A1A]">Cancel</button>
//                     )}
//                 </div>
                
//                 <div className="flex flex-col gap-1.5">
//                     <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Ticket name</label>
//                     <Input 
//                         name="name" 
//                         value={currentTicket.name} 
//                         onChange={handleTicketChange} 
//                         placeholder="e.g. Regular" 
//                         className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" 
//                     />
//                 </div>

//                 {currentTicket.type === 'Paid' && (
//                     <div className="flex flex-col gap-1.5">
//                         <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Price</label>
//                         <div className="relative">
//                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFBFBF] font-geist text-[15px] font-medium leading-6 tracking-[-0.1px]">₦</span>
//                             <Input 
//                                 name="price" 
//                                 type="number"
//                                 value={currentTicket.price} 
//                                 onChange={handleTicketChange} 
//                                 placeholder="0" 
//                                 className="pl-8 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist font-normal leading-6 tracking-[-0.1px] text-[15px] text-[#1A1A1A] shadow-none" 
//                             />
//                         </div>
//                     </div>
//                 )}

//                 <div className="flex flex-col gap-1.5">
//                     <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">How many spots?</label>
//                     <Input
//                         name="spots"
//                         type="number"
//                         value={currentTicket.spots} 
//                         onChange={handleTicketChange}
//                         placeholder="Leave blank for unlimited"
//                         className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none" 
//                     />
//                 </div>

//                 <div className="flex flex-col gap-1.5">
//                     <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Ticket description <span className="text-[#A3A3A3] font-normal text-[14px]">(Optional)</span></label>
//                     <div className="">
//                         <Textarea
//                             name="description"
//                             value={currentTicket.description}
//                             onChange={handleTicketChange}
//                             maxLength={200}
//                             placeholder="e.g. Includes drinks or merch"
//                             className="min-h-[120px] resize-none rounded-lg border border-[#E8E8E8] p-4 focus-visible:ring-[#6A59CE] focus-visible:ring font-geist font-medium leading-[150%] tracking-[-0.2px] text-[15px] text-[#1a1a1a] placeholder:text-[#bfbfbf]"
//                         />
//                     </div>
//                     <div className="flex justify-end font-geist text-xs text-[#A3A3A3]">{ticketDescLength}/200</div>
//                 </div>

//                 <div className="flex justify-end">
//                     <button 
//                         onClick={handleSaveTicket}
//                         type="button" 
//                         disabled={!isTicketFormValid()}
//                         className="w-full md:w-auto rounded-lg px-[18px] py-3 bg-[#6A59CE] hover:bg-primary/90 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595] disabled:cursor-not-allowed"
//                     >
//                         Save ticket
//                     </button>
//                 </div>
//             </div>
//         )}

//         <footer className="flex w-full items-center justify-between gap-3 pt-6 mt-8">
//             <button 
//                 type="button" 
//                 onClick={handleBack}
//                 className="flex-1 rounded-lg px-6 py-4 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-[#959595] hover:bg-[#F8F6FD] border border-[#E8E8E8]"
//             >
//                 Back
//             </button>
//             <button 
//                 onClick={handleFinalSubmit}
//                 type="button" 
//                 disabled={tickets.length === 0}
//                 className="flex-1 rounded-lg px-6 py-4 bg-[#6A59CE] hover:bg-primary/90 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595] disabled:cursor-not-allowed"
//             >
//                 Let&apos;s rally!
//             </button>
//         </footer>
//     </div>
//   );

//   return (
//     <main className="flex flex-col gap-8 p-0 pb-10 pt-5 md:p-5">
//       <div className="mx-auto w-full max-w-4xl">
//         {/* Header Section (Only if not success screen) */}
//         {!isSuccess && (
//             <div className="flex flex-col gap-6">
//                 {/* Step 1 Header Layout */}
//                 {step === 1 && (
//                     <div className="flex items-start justify-between">
//                         <div className="flex flex-col gap-4 w-full">
//                             <Image src={illustration} alt="Cal Ill" width={60} height={60} />
//                             <div className="space-y-1.5 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
//                                 <div className="space-y-1">
//                                     <h2 className="font-bricolage text-[26px] font-semibold leading-tight tracking-[-0.9px] text-black">
//                                         Create your event
//                                     </h2>
//                                     <p className="font-geist text-sm font-medium text-[#A3A3A3]">
//                                         Let&apos;s start with the basics
//                                     </p>
//                                 </div>
//                                 <StepIndicator currentStep={step} />
//                             </div>
//                         </div>
//                     </div>
//                 )}
                
//                 {/* Step 2 Header Layout */}
//                 {step === 2 && (
//                     <div className="flex items-start justify-between">
//                         <div className="flex flex-col gap-4 w-full">
//                             <Image src={tag} alt="Tag Ill" width={60} height={60} />
//                             <div className="space-y-1.5 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
//                                 <div className="space-y-1">
//                                     <h2 className="font-bricolage text-[26px] font-semibold leading-tight tracking-[-0.9px] text-black">
//                                         Set up tickets
//                                     </h2>
//                                     <p className="font-geist text-sm font-medium text-[#A3A3A3]">
//                                         You&apos;re this close to going live
//                                     </p>
//                                 </div>
//                                 <StepIndicator currentStep={step} />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )}

//         {/* Dynamic Form Content */}
//         <div className="mt-6">
//             {step === 1 ? renderStep1() : renderStep2()}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CreateEventPage;



"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import illustration from "@/public/Sidebar/cal-ill.svg";
import tag from "@/public/Sidebar/tag.svg";
import bank from "@/public/Sidebar/bank_card_fill.svg";
import party from "@/public/Sidebar/party_popper.svg"; // Assuming you have this or similar for the success screen icon
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
  Plus,
  Share2,
  ArrowRight,
  Copy,
  LayoutDashboard
} from "lucide-react";
import camera from "@/public/Sidebar/camera_2.svg";
import people from "@/public/Sidebar/people-happy.svg";
import { cn } from "@/lib/utils";
import StepIndicator from "@/app/components/dashboard/events/step-indicator"; 
import RichTextControls from "@/app/components/dashboard/events/richText-controls";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Calendar as CalendarComponent } from "@/app/components/ui/calendar";
import image1 from '@/public/Sidebar/cal-ill.svg';
import image2 from '@/public/Sidebar/link-up.svg';
import image3 from '@/public/Sidebar/sunday-ill.svg';
import image4 from '@/public/Sidebar/sip-ill.svg';

// --- Mock Data matching the image ---
const MOCK_EVENTS = [
    {
        id: "saints-popup",
        title: "Saints pop-up",
        dateRange: "Today • 6:00 PM - 11:00 PM",
        location: "Shore mall, Osapa",
        attendees: 5,
        status: 'Live' as const,
        imageSrc: image1,
    },
    {
        id: "the-link-up",
        title: "The link up",
        dateRange: "Fri, Nov 21 • 5:30 PM - 10:30 PM",
        location: "The Garden, Ikoyi",
        attendees: 9,
        status: 'Upcoming' as const,
        imageSrc: image2,
    },
    {
        id: "sunday-brunch",
        title: "Potluck & chill",
        dateRange: "Sat, Oct 12 • 1:30 PM - 4:30 PM",
        location: "Lekki phase 1, Lekki",
        attendees: 6,
        status: 'Upcoming' as const,
        imageSrc: image3,
    },
    {
        id: "sip-yap",
        title: "Sip & yap",
        dateRange: "Sat, Oct 12 • 1:30 PM - 4:30 PM",
        location: "Lekki phase 1, Lekki",
        attendees: 0,
        status: 'Past' as const,
        imageSrc: image4,
    },
];

// --- Types & Mock Data ---

const CATEGORIES = [
  "Music & Concerts",
  "Tech & Business",
  "Workshops & Classes",
  "Food & Drink",
  "Sports & Fitness",
];

const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
        const hour = i % 12 || 12;
        const ampm = i < 12 ? "AM" : "PM";
        times.push(`${hour}:00 ${ampm}`);
        times.push(`${hour}:30 ${ampm}`);
    }
    return times;
};

const TIME_OPTIONS = generateTimeOptions();

interface TicketData {
  id: string; 
  type: 'Free' | 'Paid';
  name: string;
  price: string;
  spots: string;
  description: string;
}

interface FormData {
  title: string;
  category: string;
  description: string;
  date: Date | undefined;
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
                        "flex items-center gap-2 rounded-md px-3 py-1.5 font-geist text-sm leading-6 font-medium transition-colors cursor-pointer",
                        isSelected
                            ? "border border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
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
  const [isSuccess, setIsSuccess] = useState(false); // Track if event is created successfully
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [ticketDescLength, setTicketDescLength] = useState(0);
  const [eventImageURL, setEventImageURL] = useState<string | StaticImageData>(people);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Form Data for Step 1
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    description: "",
    date: undefined,
    startTime: "",
    endTime: "",
    locationType: 'Physical',
    location: "",
  });

  // State for Ticket Management (Step 2)
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(true);
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);

  // State for the CURRENT ticket being edited/created
  const [currentTicket, setCurrentTicket] = useState<TicketData>({
    id: "",
    type: 'Paid',
    name: "",
    price: "",
    spots: "",
    description: ""
  });

  const isAiActive = !!formData.title && !!formData.category

  // --- Validation Logic ---

  // Check if Step 1 is valid
  const isStep1Valid = () => {
    return (
        formData.title.trim() !== "" &&
        formData.category !== "" &&
        // formData.date !== "" &&
        formData.date !== undefined &&
        formData.startTime !== "" &&
        formData.endTime !== "" &&
        formData.location.trim() !== ""
    );
  };

  // Check if current Ticket form is valid
  const isTicketFormValid = () => {
    const basicValid = currentTicket.name.trim() !== "";
    if (currentTicket.type === 'Paid') {
        return basicValid && currentTicket.price.trim() !== "" && Number(currentTicket.price) > 0;
    }
    return basicValid;
  };

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

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date: date}));
  };

  const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }


  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTicket((prev) => ({ ...prev, [name]: value }));
    if (name === 'description') setTicketDescLength(value.length);
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketSelectChange = (name: keyof TicketData, value: string) => {
    setCurrentTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStep1Valid()) {
        setStep(2);
        window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step === 2) {
        setStep(1);
        window.scrollTo(0, 0);
    }
  };

  // --- Ticket Management Functions ---

  const handleSaveTicket = () => {
    if (!isTicketFormValid()) return;

    if (editingTicketId) {
        setTickets(prev => prev.map(t => t.id === editingTicketId ? { ...currentTicket, id: editingTicketId } : t));
        setEditingTicketId(null);
    } else {
        const newTicket = { ...currentTicket, id: Math.random().toString(36).substr(2, 9) };
        setTickets(prev => [...prev, newTicket]);
    }

    setCurrentTicket({
        id: "",
        type: 'Paid',
        name: "",
        price: "",
        spots: "",
        description: ""
    });
    setTicketDescLength(0);
    setIsTicketFormOpen(false);
  };

  const handleEditTicket = (ticket: TicketData) => {
    setCurrentTicket(ticket);
    setEditingTicketId(ticket.id);
    setIsTicketFormOpen(true);
    setTicketDescLength(ticket.description.length);
  };

  const handleDeleteTicket = (id: string) => {
    const updatedTickets = tickets.filter(t => t.id !== id);
    setTickets(updatedTickets);
    // If we delete all tickets, re-open the form
    if (updatedTickets.length === 0) {
        setIsTicketFormOpen(true);
    }
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
    if (tickets.length === 0) return;

    const params = new URLSearchParams();
    params.set("title", formData.title);
    if (formData.date) {
        params.set("date", format(formData.date, "EEEE, MMMM d"));
    }
    params.set("startTime", formData.startTime);
    params.set("endTime", formData.endTime);
    params.set("location", formData.location);

    const finalPayload = {
        ...formData,
        tickets: tickets
    };
    console.log("Final Submission:", finalPayload);

    router.push(`/success?${params.toString()}`)
    // Show Success Screen
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };


  // --- Render Step 1: Create Event ---
  const renderStep1 = () => (
    <form onSubmit={handleNext} className="flex flex-col gap-8 pt-4 md:pt-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="h-[200px] w-full md:w-[350px] rounded-[12px] bg-[#F8F6FD] flex items-center justify-center relative overflow-hidden">
            <Image 
                src={eventImageURL} 
                alt="Event Image" 
                layout="fill"
                objectFit="cover"
                className={cn("transition-opacity rounded-[12px]", typeof eventImageURL === 'string' ? "opacity-100" : "opacity-100")}
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
                    placeholder="e.g. Divii's games night" 
                    className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none placeholder:font-medium" 
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
                    <label className="font-geist text-[14px] font-medium text-[#767676] leading-[150%] tracking-[-0.1px]">Add a description <span className="text-[#A3A3A3] font-geist font-normal">(Optional)</span></label>
                    <button 
                        type="button" 
                        disabled={!isAiActive} 
                        className={cn("flex items-center gap-1 p-0 h-auto font-geist text-sm font-medium text-[#6A59CE] hover:bg-transparent cursor-pointer",
                            isAiActive ? "text-[#6A59CE] hover:text-[#5a4cb0]" : "text-[#A3A3A3] cursor-not-allowed"
                        )}
                    >
                        <Wand className="h-4 w-4" /> 
                        <span className="font-geist font-medium text-sm leading-[150%] tracking-[-0.1px]">Suggest with AI</span>
                    </button>
                </div>
                <div className=" rounded-lg border border-[#E8E8E8] transition-shadow focus-within:ring-2 focus-within:ring-[#6A59CE]">
                    <RichTextControls textareaRef={descriptionTextareaRef} />
                    <Textarea 
                        ref={descriptionTextareaRef} 
                        name="description" value={formData.description} 
                        onChange={handleChange} 
                        maxLength={300} 
                        placeholder="What should attendees know?" 
                        className="min-h-40 resize-none rounded-t-none border-none p-4 focus-visible:ring-0 font-geist text-[14px] text-black placeholder:text-[#BFBFBF] leading-[150%] tracking-[-0.2px] shadow-none" />
                </div>
                <div className="font-geist text-xs text-[#A3A3A3] flex justify-end">{descriptionLength}/300</div>
            </div>
        </section>

        <section className="flex flex-col gap-6 pt-2 md:pt-6">
            <h3 className="font-bricolage text-[20px] font-semibold leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">When and where?</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                <div className="grid col-span-1 md:col-span-2 gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Date</label>
                    {/* <div className="relative">
                        <Input 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            placeholder="mm/dd/yyyy" 
                            className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none"  
                        />
                        <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                    </div> */}

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn("relative flex justify-start px-3.5 py-2.5 rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none",
                                    !formData.date && "text-[#000000]"
                                )}
                            >
                                {formData.date ? format(formData.date, "PPP") : <span className="text-[#BFBFBF] font-medium">mm/dd/yyyy</span>}
                                <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                            <CalendarComponent
                                mode="single"
                                selected={formData.date}
                                onSelect={handleDateSelect}
                                initialFocus 
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid col-span-1 md:col-span-1 gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Start time</label>
                    <Select value={formData.startTime} onValueChange={(value) => handleSelectChange("startTime", value)}>
                        <SelectTrigger className="relative rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none font-medium">
                            <SelectValue placeholder="10:00 AM" />
                            {/* <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" /> */}
                        </SelectTrigger>
                        <SelectContent>
                            {TIME_OPTIONS.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid col-span-1 md:col-span-1 gap-1.5">
                    <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">End time</label>
                    <Select value={formData.endTime} onValueChange={(value) => handleSelectChange("endTime", value)}>
                        <SelectTrigger className="relative rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none font-medium">
                            <SelectValue placeholder="10:00 PM" />
                            {/* <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#959595]" /> */}
                        </SelectTrigger>
                        <SelectContent>
                            {TIME_OPTIONS.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <label className="font-geist text-sm font-medium leading-[150%] tracking-[-0.1px] text-[#767676]">Location</label>
                <LocationTypeSelector value={formData.locationType} onChange={(type) => handleSelectChange('locationType', type)} />
                <Input name="location" value={formData.location} onChange={handleChange} placeholder={formData.locationType === 'Physical' ? "Enter location" : "Paste meeting link (Zoom, Google meet, etc.)"} className="rounded-lg border border-[#E8E8E8] focus-visible:ring-[#6A59CE] font-geist text-[15px] text-[#333333] shadow-none font-medium" />
            </div>
        </section>
        
        <footer className="flex w-full items-center justify-between gap-3 pt-6 mt-8">
            <button type="button" className="rounded-lg px-6 py-4 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-[#959595] hover:bg-[#FAFAFA] border border-[#E8E8E8]">Cancel</button>
            <button 
                type="submit" 
                disabled={!isStep1Valid()}
                className="rounded-lg px-6 py-4 bg-[#6A59CE] font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white hover:bg-primary/90 disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595] disabled:cursor-not-allowed"
            >
                Next
            </button>
        </footer>
    </form>
  );

  // --- Render Step 2: Set up tickets ---
  const renderStep2 = () => (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300 pt-4 md:pt-0">
        
        {/* Is this free or paid? (Only show if form is open or it's the first time) */}
        {isTicketFormOpen && (
            <div className="flex flex-col gap-4">
                <label className="font-geist text-[15px] font-medium text-[#333333] leading-[150%] tracking-[-0.2px]">Is this free or paid?</label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleTicketSelectChange('type', 'Free')}
                        className={cn(
                            "flex-1 md:flex-none justify-center md:justify-start flex items-center gap-2 rounded-md px-3.5 py-2.5 font-geist text-[15px] leading-[150%] tracking-[-0.2px] font-medium transition-all cursor-pointer",
                            currentTicket.type === 'Free'
                                ? "border border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
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
                            "flex-1 md:flex-none justify-center md:justify-start flex items-center gap-2 rounded-md px-3.5 py-2.5 font-geist text-[15px] leading-[150%] tracking-[-0.2px] font-medium transition-all cursor-pointer",
                            currentTicket.type === 'Paid'
                                ? "border border-[#6A59CE] bg-[#F8F6FD] text-[#6A59CE]"
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

        {/* 3. Another Ticket Button (Shown when list exists and form is closed) */}
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
            <div className="rounded-xl border border-[#E8E8E8] p-4 md:p-8 bg-white shadow-xs space-y-6">
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
                        type="button" 
                        disabled={!isTicketFormValid()}
                        className="w-full md:w-auto rounded-lg px-[18px] py-3 bg-[#6A59CE] hover:bg-primary/90 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595] disabled:cursor-not-allowed"
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
                type="button" 
                disabled={tickets.length === 0}
                className="rounded-lg px-6 py-4 bg-[#6A59CE] hover:bg-primary/90 font-geist text-[15px] font-semibold leading-[135%] tracking-[-0.2px] cursor-pointer text-white disabled:bg-[#F7F7F7] disabled:border disabled:border-[#F5F5F5] disabled:text-[#959595] disabled:cursor-not-allowed"
            >
                Let&apos;s rally!
            </button>
        </footer>
    </div>
  );

  return (
    <main className="flex flex-col gap-8 p-0 pb-10 pt-5 md:p-5">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Section (Only if not success screen) */}
        {!isSuccess && (
            <div className="flex flex-col gap-6">
                {/* Step 1 Header Layout */}
                {step === 1 && (
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-4 w-full">
                            <Image src={illustration} alt="Cal Ill" width={60} height={60} />
                            <div className="space-y-1.5 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                                <div className="space-y-1">
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
                            <div className="space-y-1.5 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                                <div className="space-y-1">
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
        )}

        {/* Dynamic Form Content */}
        <div className="mt-6">
            {step === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
    </main>
  );
};

export default CreateEventPage;