// import { cn } from "@/lib/utils";
// import type { NotificationItem } from "../notifications/types/notification";
// import { CheckIcon, FileIcon, PackageIcon, TruckIcon, UserIcon } from "./icons";
// import Image from "next/image";

// const iconMap = {
//   check: CheckIcon,
//   file: FileIcon,
//   package: PackageIcon,
//   truck: TruckIcon,
//   user: UserIcon,
// };

// const colorMap = {
//   success: "bg-[#ECFDF3]",
//   warning: "bg-[#FFECE5]",
//   info: "bg-[#E8F0FF]",
//   pending: "bg-orange-100",
// };

// export function NotificationItem({
//   icon,
//   type,
//   title,
//   timestamp,
//   image,
//   // read,
// }: NotificationItem) {
//   const Icon = iconMap[icon];

//   return (
//     <div className="flex items-start gap-4 rounded-lg py-6 px-2 hover:bg-muted">
//       <div className={cn("rounded-full p-2", colorMap[type])}>
//         <Icon className="h-5 w-5" />
//       </div>
//       <div className="flex flex-1 flex-col gap-1 font-geist">
//         <p className="text-sm font-medium leading-[150%] tracking-[-0.1px]">{title}</p>
//         <p className="text-xs text-[#A3A3A3] font-normal">{timestamp}</p>
//       </div>
//         {image && <Image src={image} alt={title} className="w-10 h-8 rounded-[3px]" />}
//       {/* {!read && <div className="h-2 w-2 rounded-full bg-red-500" />} */}
//     </div>
//   );
// }


import { cn } from "@/lib/utils";
import type { NotificationItem as NotificationItemProps } from "../notifications/types/notification";
import { UserPlus, Calendar, CreditCard, BellDot, LucideIcon } from "lucide-react"; 
import Image from "next/image";

// Strict mapping for notification types to icons
const iconMap: Record<string, LucideIcon> = {
  join: UserPlus,
  update: Calendar,
  payout: CreditCard,
  alert: BellDot,
};

// Strict mapping for notification types to styles
const colorMap: Record<string, string> = {
  join: "bg-[#FFEDED] text-[#F7931E]",
  confirm: "bg-[#E3FFF5] text-[#00A36A]",
  update: "bg-[#F0F5FF] text-[#2E90FA]",
  payout: "bg-[#E3FFF5] text-[#00A36A]",
};

export function NotificationItem({
  type,
  title,
  timestamp,
  image,
  read,
}: NotificationItemProps) {
  const Icon = iconMap[type] || BellDot;

  return (
    <div className={cn(
      "flex items-start gap-3 py-4 px-3 rounded-lg transition-colors cursor-pointer",
      read ? "opacity-100" : "bg-transparent hover:bg-[#F9F9F9]"
    )}>
      <div className={cn("flex items-center justify-center h-10 w-10 rounded-full shrink-0", colorMap[type])}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>

      <div className="flex flex-1 flex-col justify-center min-w-0 font-geist">
        <p className="text-[14px] text-[#1A1A1A] font-medium leading-[140%] tracking-[-0.1px]">
          {title}
        </p>
        <p className="text-[12px] text-[#A3A3A3] font-normal mt-0.5">
          {timestamp}
        </p>
      </div>

      {image && (
        <div className="shrink-0 ml-2">
          <Image 
            src={image} 
            alt="Event thumbnail" 
            width={40} 
            height={32} 
            className="rounded-lg object-cover h-8 w-10 border border-[#F0F0F0]" 
          />
        </div>
      )}
    </div>
  );
}