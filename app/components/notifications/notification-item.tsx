// import { cn } from "@/lib/utils";
// import type { NotificationItem } from "../notifications/types/notification";
// import { CheckIcon, CoinIcon, UserIcon } from "./icons";
// import Image from "next/image";

// const iconMap = {
//   check: CheckIcon,
//   // file: FileIcon,
//   // package: PackageIcon,
//   coin: CoinIcon,
//   user: UserIcon,
//   // truck: PackageIcon,
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
//   read,
// }: NotificationItem) {
//   const Icon = iconMap[icon as keyof typeof iconMap] || CoinIcon;

//   return (
//     <div className="flex items-start gap-4 rounded-lg py-6 px-2">
//       <div className={cn("rounded-full p-2", colorMap[type])}>
//         <Icon className="h-5 w-5" />
//       </div>
//       <div className="flex flex-1 flex-col gap-1 font-geist cursor-pointer">
//         <p className="text-sm font-medium leading-[150%] tracking-[-0.1px]">{title}</p>
//         <p className="text-xs text-[#A3A3A3] font-normal">{timestamp}</p>
//       </div>

//       {/* Thumbnail Preview */}
//        {image && (
//          <div className="shrink-0 ml-2">
//            <Image 
//              src={image} 
//              alt="Event preview" 
//              width={40} 
//              height={32} 
//              className="rounded-md object-cover h-8 w-10 border border-[#F0F0F0]" 
//            />
//          </div>
//        )}
//       {/* {!read && <div className="h-2 w-2 rounded-full bg-red-500" />} */}
//     </div>
//   );
// }


import { cn } from "@/lib/utils";
import type { NotificationItem as NotificationItemProps } from "../notifications/types/notification";
import { UserPlus, Calendar, CreditCard, BellDot, LucideIcon } from "lucide-react"; 
import Image, { StaticImageData } from "next/image";
import attend from "@/public/Sidebar/attend-notification.svg";
import calendar from "@/public/Sidebar/calendar-motification.svg";
import coin from "@/public/Sidebar/coin-notification.svg";
import alert from "@/public/Sidebar/Alert-Alarm-Bell--Streamline-Freehand.svg";

// Strict mapping for notification types to icons
// const iconMap: Record<string, StaticImageData> = {
//   join: attend,
//   update: calendar,
//   payout: coin,
//   alert: alert,
// };

// // Strict mapping for notification types to styles
// const colorMap: Record<string, string> = {
//   join: "bg-[#FFEDED]",
//   confirm: "bg-[#E3FFF5]",
//   update: "bg-[#F0F5FF]",
//   payout: "bg-[#E3FFF5]",
// };

const iconMap: Record<string, StaticImageData> = {
  // New types
  join: attend,
  update: calendar,
  payout: coin,
  alert: alert,
  warning: attend,
  info: calendar,
  pending: coin, 
  success: coin,
};
const colorMap: Record<string, string> = {
  join: "bg-[#FFEDED]",
  confirm: "bg-[#E3FFF5]",
  update: "bg-[#F0F5FF]",
  payout: "bg-[#E3FFF5]",
  warning: "bg-[#FFEDED]",
  info: "bg-[#F0F5FF]",
  pending: "bg-[#FFECE5]",
  success: "bg-[#ECFDF3]",
};


export function NotificationItem({
  type,
  title,
  timestamp,
  image,
  read,
}: NotificationItemProps) {
  const iconAsset = iconMap[type];

  return (
    <div className={cn(
      "flex items-start gap-3 py-4 md:px-3 px-2 rounded-lg transition-colors cursor-pointer",
      read ? "opacity-100" : "bg-transparent"
    )}>
      {/* <div className={cn("flex items-center justify-center h-10 w-10 rounded-full shrink-0", colorMap[type])}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div> */}
      {/* Icon Circle Container */}
      {iconAsset && (
        <div className={cn("rounded-full shrink-0", colorMap[type] || "bg-[#F7F7F7]"
        )}>
          <Image 
            src={iconAsset}
            alt={`${type} icon`} 
            width={40} 
            height={40} 
            className="object-contain"
            priority={true}
          />
        </div>
      )}

      <div className="flex justify-between font-geist w-full border-b border-[#0000000D] pb-5">
        <div className="w-full md:min-w-[268px]">
          <p className="text-[14px] text-[#333333] font-medium leading-[140%] tracking-[-0.1px]">
            {title}
          </p>
          <p className="text-[12px] text-[#A3A3A3] font-normal mt-0.5">
            {timestamp}
          </p>
        </div>
        <div>
          {image && (
            <div className="shrink-0 ml-2 w-full">
              <Image 
                src={image} 
                alt="Event thumbnail" 
                width={40} 
                height={32} 
                className="rounded-lg object-cover h-8 w-10" 
                priority={true}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

// import { cn } from "@/lib/utils";
// import type { NotificationItem as NotificationItemProps } from "../notifications/types/notification";
// import Image, { StaticImageData } from "next/image";

// // 1. Verify these file names exactly match your public folder
// import attend from "@/public/Sidebar/attend-notification.svg";
// import calendar from "@/public/Sidebar/calendar-motification.svg";
// import coin from "@/public/Sidebar/coin-notification.svg";
// import alert from "@/public/Sidebar/Alert-Alarm-Bell--Streamline-Freehand.svg";

// // 2. Map types strictly to the imported StaticImageData
// const iconMap: Record<string, StaticImageData> = {
//   join: attend,
//   update: calendar,
//   payout: coin,
//   alert: alert,
// };

// // const colorMap: Record<string, string> = {
// //   join: "bg-[#FFEDED]",
// //   confirm: "bg-[#E3FFF5]",
// //   update: "bg-[#F0F5FF]",
// //   payout: "bg-[#E3FFF5]",
// //   alert: "bg-[#FFECE5]",
// // };

// export function NotificationItem({
//   type,
//   title,
//   timestamp,
//   image,
//   read,
// }: NotificationItemProps) {
//   const iconAsset = iconMap[type];

//   return (
//     <div className={cn(
//       "flex items-start gap-3 py-4 px-3 rounded-lg transition-all cursor-pointer",
//       read ? "opacity-100" : "bg-transparent hover:bg-[#F9F9F9]"
//     )}>
      
//       {/* Icon Circle Container */}
//       {iconAsset && (
//         <div className="flex items-center justify-center shrink-0 h-10 w-10 overflow-hidden">
//           <Image 
//             src={iconAsset}
//             alt="" 
//             width={40} 
//             height={40} 
//           />
//         </div>
//       )}

//       <div className="flex flex-1 flex-col justify-center min-w-0 font-geist">
//         <p className="text-[14px] text-[#1A1A1A] font-medium leading-[140%] tracking-[-0.1px]">
//           {title}
//         </p>
//         <p className="text-[12px] text-[#A3A3A3] font-normal mt-0.5">
//           {timestamp}
//         </p>
//       </div>

//       {/* Thumbnail Preview */}
//       {image && (
//         <div className="shrink-0 ml-2">
//           <Image 
//             src={image} 
//             alt="Event preview" 
//             width={40} 
//             height={32} 
//             className="rounded-md object-cover h-8 w-10 border border-[#F0F0F0]" 
//           />
//         </div>
//       )}
//     </div>
//   );
// }