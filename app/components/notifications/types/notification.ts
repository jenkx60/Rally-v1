import { StaticImageData } from "next/image"

export type NotificationType = "success" | "warning" | "info" | "pending"
export type IconType = "check" | "file" | "package" | "truck" | "user"

export interface NotificationItem {
  id: string
  type: NotificationType
  icon: IconType
  title: string
  timestamp: string
  image?: string | StaticImageData
  read: boolean | undefined
}

export interface GroupedNotifications {
  [key: string]: NotificationItem[]
}

