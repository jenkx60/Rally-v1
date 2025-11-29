"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Button } from "@/app/components/ui/button";
import { NotificationItem } from "./notification-item";
import { notifications } from "../notifications/data/notifications";
import type {
  GroupedNotifications,
  NotificationItem as NotificationItemType,
} from "../notifications/types/notification";
import Image from "next/image";
import bell from "@/public/Sidebar/bell_ringing_line.svg";
import { NotificationIcon } from "./icons";

export default function Notification() {
  const { latestNotifications, unreadCount, totalCount } = useMemo(() => {
    const sorted = [...notifications].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const latest = sorted.slice(0, 6);

    const grouped = latest.reduce((acc: GroupedNotifications, notification) => {
      const date = notification.timestamp.split("•")[0].trim();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    }, {});

    const unread = notifications.filter((n) => !n).length;
    const total = notifications.length;

    return {
      latestNotifications: grouped,
      unreadCount: unread,
      totalCount: total,
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <div className="relative hover:bg-transparent focus:bg-transparent shadow-none hover:shadow-none focus:shadow-none rounded-md flex items-center justify-center">
          <Image src={bell} alt="Notification Bell" className="w-6 h-6 cursor-pointer" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d81858] text-[10px] text-[#efd6cb]">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[420px] bg-white">
        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-[20px] font-semibold font-bricolage leading-[130%] tracking-[-0.7px]">Notifications</h2>
        </div>
        <div className="flex items-center justify-between border-b px-4 pb-2">
          <span className="text-sm text-[#767676] font-geist font-medium leading-[150%] tracking-[-0.1px]">
            {/* {unreadCount > 0
              ? `Unread(${unreadCount})`
              : "No unread notifications"} */}
              TODAY
          </span>
          {totalCount > 0 && (
            <Link
              href="/notifications"
              className="text-sm text-[#6A59CE] font-geist font-medium leading-[150%] tracking-[-0.1px] hover:underline"
            >
              Mark all as read
            </Link>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {totalCount === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                No notifications available
              </p>
            </div>
          ) : (
            <div className="flex flex-col p-2">
              {Object.entries(latestNotifications).map(([date, items]) => (
                <div key={date}>
                  {/* <div className="px-2 py-3">
                    <h3 className="text-sm font-grotesk-medium text-muted-foreground">
                      {date ===
                      new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                        ? "Today"
                        : date}
                    </h3>
                  </div> */}
                  {items.map((item: NotificationItemType) => (
                    <NotificationItem key={item.id} {...item} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
