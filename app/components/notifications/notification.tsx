// "use client";

// import { useMemo } from "react";
// import Link from "next/link";
// import { Bell } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/app/components/ui/dropdown-menu";
// import { ScrollArea } from "@/app/components/ui/scroll-area";
// import { Button } from "@/app/components/ui/button";
// import { NotificationItem } from "./notification-item";
// import { notifications } from "../notifications/data/notifications";
// import type {
//   GroupedNotifications,
//   NotificationItem as NotificationItemType,
// } from "../notifications/types/notification";
// import Image from "next/image";
// import bell from "@/public/Sidebar/bell_ringing_line.svg";
// import { NotificationIcon } from "./icons";

// export default function Notification() {
//   const { latestNotifications, unreadCount, totalCount } = useMemo(() => {
//     const sorted = [...notifications].sort(
//       (a, b) =>
//         new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//     );
//     const latest = sorted.slice(0, 6);

//     const grouped = latest.reduce((acc: GroupedNotifications, notification) => {
//       const date = notification.timestamp.split("•")[0].trim();
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(notification);
//       return acc;
//     }, {});

//     const unread = notifications.filter((n) => !n).length;
//     const total = notifications.length;

//     return {
//       latestNotifications: grouped,
//       unreadCount: unread,
//       totalCount: total,
//     };
//   }, []);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild className="">
//         <div className="relative hover:bg-transparent focus:bg-transparent shadow-none hover:shadow-none focus:shadow-none rounded-md flex items-center justify-center">
//           <Image src={bell} alt="Notification Bell" className="w-6 h-6 cursor-pointer" />
//           {unreadCount > 0 && (
//             <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d81858] text-[10px] text-[#efd6cb]">
//               {unreadCount}
//             </span>
//           )}
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-[420px] bg-white">
//         <div className="flex flex-col gap-2 p-4">
//           <h2 className="text-[20px] font-semibold font-bricolage leading-[130%] tracking-[-0.7px]">Notifications</h2>
//         </div>
//         <div className="flex items-center justify-between border-b px-4 pb-2">
//           <span className="text-sm text-[#767676] font-geist font-medium leading-[150%] tracking-[-0.1px]">
//             {/* {unreadCount > 0
//               ? `Unread(${unreadCount})`
//               : "No unread notifications"} */}
//               TODAY
//           </span>
//           {totalCount > 0 && (
//             <Link
//               href="/notifications"
//               className="text-sm text-[#6A59CE] font-geist font-medium leading-[150%] tracking-[-0.1px] hover:underline"
//             >
//               Mark all as read
//             </Link>
//           )}
//         </div>
//         <ScrollArea className="h-[400px]">
//           {totalCount === 0 ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-sm text-muted-foreground">
//                 No notifications available
//               </p>
//             </div>
//           ) : (
//             <div className="flex flex-col p-2">
//               {Object.entries(latestNotifications).map(([date, items]) => (
//                 <div key={date}>
//                   {/* <div className="px-2 py-3">
//                     <h3 className="text-sm font-grotesk-medium text-muted-foreground">
//                       {date ===
//                       new Date().toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       })
//                         ? "Today"
//                         : date}
//                     </h3>
//                   </div> */}
//                   {items.map((item: NotificationItemType) => (
//                     <NotificationItem key={item.id} {...item} />
//                   ))}
//                 </div>
//               ))}
//             </div>
//           )}
//         </ScrollArea>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { X, CheckCheck } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { NotificationItem } from "./notification-item";
import { notifications } from "../notifications/data/notifications";
import { useIsMobile } from "@/hooks/use-mobile";
import bellIcon from "@/public/Sidebar/bell_ringing_line.svg";
import emptyBell from "@/public/Sidebar/Alert-Alarm-Bell--Streamline-Freehand.svg";
import type { 
  GroupedNotifications, 
  NotificationItem as NotificationItemType 
} from "../notifications/types/notification";
import { Dialog } from "../ui/dialog";

export default function Notification() {
  const isMobile = useIsMobile();

  const { groupedNotifications, unreadCount, totalCount } = useMemo(() => {
    const sorted = [...notifications].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const grouped = sorted.reduce((acc: GroupedNotifications, notification) => {
      const date = notification.timestamp.split("•")[0].trim();
      if (!acc[date]) acc[date] = [];
      acc[date].push(notification);
      return acc;
    }, {});

    return {
      groupedNotifications: grouped,
      unreadCount: notifications.filter((n) => !n.read).length,
      totalCount: notifications.length,
    };
  }, []);

  const Header = (
      <Dialog>
        <DrawerHeader className="p-4 pb-2">
            <div className="flex justify-between">
              <DrawerTitle className="text-[20px] font-bold font-bricolage leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">
                Notifications
              </DrawerTitle>
              <div className="flex items-center gap-3">
                {totalCount > 0 && (
                  <button className="text-[#6A59CE] hover:opacity-80 transition-opacity">
                    <CheckCheck className="w-5 h-5" />
                  </button>
                )}
                {isMobile && (
                  <DrawerClose className="text-[#A3A3A3]">
                    <X className="w-5 h-5" />
                  </DrawerClose>
                )}
              </div>
            </div>
        </DrawerHeader>
      </Dialog>
  );

  const Content = (
    <div className="flex flex-col h-full bg-white">
      {Header}
      
      {totalCount > 0 && (
        <div className="px-4 py-2 border-b border-[#F5F5F5]">
          {/* <span className="text-xs text-[#767676] font-geist font-semibold tracking-[0.05em]">
            TODAY
          </span> */}
        </div>
      )}

      <ScrollArea className={isMobile ? "max-h-[70vh]" : "max-h-[450px]"}>
        {totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center space-y-4">
            <div className="p-4 rounded-full">
               <Image src={emptyBell} alt="Empty" width={64} height={64} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bricolage text-lg font-bold text-[#1A1A1A]">You&apos;re all caught up</h3>
              <p className="font-geist text-sm text-[#767676]">We&apos;ll notify you when it matters</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-2">
            {Object.entries(groupedNotifications).map(([date, items]) => (
              <div key={date}>
                {items.map((item: NotificationItemType) => (
                  <NotificationItem key={item.id} {...item} />
                ))}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative cursor-pointer">
          <Image src={bellIcon} alt="Bell" className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D81858] text-[10px] text-white font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white border-none rounded-t-3xl">
        {Content}
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <Image src={bellIcon} alt="Bell" className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D81858] text-[10px] text-white font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[420px] p-0 shadow-xl border-[#0000000D] rounded-xl overflow-hidden">
        {Content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}