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
import type { GroupedNotifications, NotificationItem as NotificationItemType } from "../notifications/types/notification";
import { Dialog } from "../ui/dialog";
import { useAuthStore } from "@/src/store/auth.store";

export default function Notification() {
  const isMobile = useIsMobile();
  const { userEventCount } = useAuthStore();

  const activeNotifications = (userEventCount && userEventCount > 0) ? notifications : [];

  const { groupedNotifications, unreadCount, totalCount } = useMemo(() => {
    const sorted = [...activeNotifications].sort(
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
      unreadCount: activeNotifications.filter((n) => !n.read).length,
      totalCount: activeNotifications.length,
    };
  }, [activeNotifications]);

  const Header = (
      <Dialog>
        <DrawerHeader className="p-4 pb-2">
            <div className="flex justify-between">
              <DrawerTitle className="text-[20px] font-bold font-bricolage leading-[130%] tracking-[-0.7px] text-[#1A1A1A]">
                Notifications
              </DrawerTitle>
              <div className="flex items-center gap-3">
                {totalCount > 0 && (
                  <button className="text-black hover:opacity-80 transition-opacity hidden md:block cursor-pointer">
                    {/* <CheckCheck className="w-5 h-5" /> */}
                    <X className="w-5 h-5" />
                  </button>
                )}
                {/* {isMobile && (
                  <DrawerClose className="text-[#A3A3A3]">
                    <X className="w-5 h-5" />
                  </DrawerClose>
                )} */}
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
               <Image src={emptyBell} alt="Empty" width={64} height={64} priority={true} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bricolage text-lg font-bold text-[#1A1A1A] tracking-[-0.6px] leading-[120%]">You&apos;re all caught up</h3>
              <p className="font-geist text-sm text-[#A3A3A3] tracking-[-0.1px] leading-[150%]">We&apos;ll notify you when it matters</p>
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
          <Image src={bellIcon} alt="Bell" className="w-6 h-6" priority={true} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D81858] text-[10px] text-white font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white border-none rounded-t-3xl">
        <DrawerTitle>
          {Content}
        </DrawerTitle>
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer transition-opacity">
          <Image src={bellIcon} alt="Bell" className="w-6 h-6" priority={true} />
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