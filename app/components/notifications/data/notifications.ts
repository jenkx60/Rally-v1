import type { NotificationItem } from "../types/notification";
import people from "@/public/Sidebar/people-happy.svg";
import calendar from "@/public/Sidebar/calendar-motification.svg";
import coin from "@/public/Sidebar/coin-notification.svg";
import saint from "@/public/Sidebar/sip-ill.svg"
import sip from "@/public/Sidebar/sunday-ill.svg"

export const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "warning",
    icon: "user",
    title: "Alex RSVP’d to Saints pop-up",
    timestamp: "1m ago",
    image: people,
    read: false,
  },
  {
    id: "2",
    type: "warning",
    icon: "user",
    title: "12 people just joined Potluck & chill",
    timestamp: "30m ago",
    image: people,
    read: false,
  },
  {
    id: "3",
    type: "info",
    icon: "package",
    title: "Your shipments have been delivered",
    timestamp: "January 16, 2026 • 9:40 PM",
    image: saint,
    read: false,
  },
  {
    id: "4",
    type: "pending",
    icon: "coin",
    title: "You have a pending shipment",
    timestamp: "January 28, 2026 • 10:55 PM",
    image: sip,
    read: false,
  },
  // {
  //   id: "5",
  //   type: "info",
  //   icon: "package",
  //   title: "Your shipments have been delivered",
  //   timestamp: "December 15, 2024 • 9:40 PM",
  //   read: false,
  // },
  // {
  //   id: "6",
  //   type: "info",
  //   icon: "package",
  //   title: "Your shipments have been delivered",
  //   timestamp: "December 14, 2024 • 9:40 PM",
  //   read: false,
  // },
  // {
  //   id: "7",
  //   type: "info",
  //   icon: "package",
  //   title: "Your shipments have been delivered",
  //   timestamp: "December 14, 2024 • 9:40 PM",
  //   read: false,
  // },
];
