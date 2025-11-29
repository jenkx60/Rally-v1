import { cn } from "@/lib/utils";
import type { NotificationItem } from "../notifications/types/notification";
import { CheckIcon, FileIcon, PackageIcon, TruckIcon, UserIcon } from "./icons";
import Image from "next/image";

const iconMap = {
  check: CheckIcon,
  file: FileIcon,
  package: PackageIcon,
  truck: TruckIcon,
  user: UserIcon,
};

const colorMap = {
  success: "bg-[#ECFDF3]",
  warning: "bg-[#FFECE5]",
  info: "bg-[#E8F0FF]",
  pending: "bg-orange-100",
};

export function NotificationItem({
  icon,
  type,
  title,
  timestamp,
  image,
  // read,
}: NotificationItem) {
  const Icon = iconMap[icon];

  return (
    <div className="flex items-start gap-4 rounded-lg py-6 px-2 hover:bg-muted">
      <div className={cn("rounded-full p-2", colorMap[type])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-1 flex-col gap-1 font-geist">
        <p className="text-sm font-medium leading-[150%] tracking-[-0.1px]">{title}</p>
        <p className="text-xs text-[#A3A3A3] font-normal">{timestamp}</p>
      </div>
        {image && <Image src={image} alt={title} className="w-10 h-8 rounded-[3px]" />}
      {/* {!read && <div className="h-2 w-2 rounded-full bg-red-500" />} */}
    </div>
  );
}
