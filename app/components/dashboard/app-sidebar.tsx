"use client";

import Link from "next/link";
import Image from "next/image";
import rally from '@/public/Logo.svg';
import attend from '@/public/Sidebar/attend.svg';
import pay from '@/public/Sidebar/pay.svg';
import calendar from '@/public/Sidebar/calendar.svg';
import help from '@/public/help.svg';
import setting from '@/public/setting.svg';
import avatar from '@/public/Sidebar/avatar.svg';
import { usePathname } from "next/navigation";
// import { useOnboardingStore } from "@/store/use-onboarding-store";
import { useEffect, useState, useCallback } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/app/components/ui/sidebar";
import { ChevronDown, HelpCircle, MoreHorizontal } from "lucide-react";
import { title } from "process";
import { cn } from "@/lib/utils";
import {CalendarDays, Settings} from "lucide-react"

const navigation = [
  // {
  //   title: "Dashboard",
  //   href: "/dashboard",
  //   // icon: dashboardIcon,
  // },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: calendar,
  },
  {
    title: "Attendees ",
    href: "/dashboard/attend",
    icon: attend,
  },
  {
    title: "Payouts",
    href: "/dashboard/payout",
    icon: pay,
  },
];

export function AppSidebar() {
//   const { currentBusiness } = useOnboardingStore();
  const user = {
    name: "Divine Mere",
    email: "divine@exmaple.com",
    avatar: avatar,
  };

  const { state, setOpen, setOpenMobile } = useSidebar();

  const handleForceOpen = () => {
    if (state === "collapsed") {
      setOpen(true); // only expand if collapsed
    }
  };
  // Portrait detection
  const [isPortrait, setIsPortrait] = useState(false);

  const handleNavClick = useCallback(() => {
    setOpenMobile(false); //  closes mobile sidebar
  }, [setOpenMobile]);

  useEffect(() => {
    const check = () =>
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const bottomNavigation = [
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: setting,
    },
    // {
    //   title: "Help",
    //   href: "/dashboard/help",
    //   icon: help,
    // },
    {
      title: "Help",
      icon: help,
      href: "/dashboard/help",
    },
  ];

  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className=" border-b border-[#E8E8E8] py-[11.5px] px-5">
        <Image
          src={rally}
          alt="Logo"
          width={40}
          height={40}
          className="group-data-[state=collapsed]:hidden"
        />

        <Image
          src={rally}
          alt="Logo"
          width={40}
          height={40}
          className="hidden group-data-[state=collapsed]:block"
        />
      </SidebarHeader>
      <SidebarContent className="pt-4 pb-3 px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <div
                  key={item.title}
                  className="mt-1"
                  onClick={handleForceOpen}
                >
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      onClick={() => {
                        if (isPortrait) setOpenMobile(false);
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className="flex items-center gap-2 text-[#959595]"
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={15}
                          height={15}
                        />
                        <span className="truncate group-data-[state=collapsed]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavigation.map((item) => (
                <div key={item.title} className="mt-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      onClick={() => {
                        if (isPortrait) setOpenMobile(false);
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className="flex items-center gap-2 text-[#959595]"
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={15}
                          height={15}
                        />
                        <span className="group-data-[state=collapsed]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarRail /> */}
      <SidebarFooter  className=" border-t border-[#E8E8E8] py-[11.5px] px-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              onClick={() => toggleDropdown("user")}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Avatar Container */}
              <div className="flex aspect-square size-11 items-center justify-center rounded-lg text-white border-[0.8px] border-[#FA9874]">
                <Image
                  src={avatar}
                  alt="User Avatar"
                  width={35}
                  height={35}
                  className="rounded-lg" 
                />
              </div>

              {/* User Details */}
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                <span className="truncate font-semibold">{user.name}</span>
                {/* Optional: Add email below name if desired */}
                {/* <span className="truncate text-xs">{user.email}</span> */}
              </div>

              {/* Three dots icon */}
              <MoreHorizontal className="ml-auto size-4 text-[#959595] group-data-[state=collapsed]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
