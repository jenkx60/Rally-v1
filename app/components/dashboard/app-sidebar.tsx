"use client";

import Link from "next/link";
import Image from "next/image";
import rally from '@/public/Logo.svg';
import attend from '@/public/Sidebar/group_3_line.svg';
import pay from '@/public/Sidebar/bank_line.svg';
import calendar from '@/public/Sidebar/calendar_2_line.svg';
import help from '@/public/Sidebar/question_line.svg';
import setting from '@/public/Sidebar/settings_3_line.svg';
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
import { MoreHorizontal } from "lucide-react";
import { title } from "process";
import { cn } from "@/lib/utils";
import {CalendarDays, Settings} from "lucide-react"

const navigation = [
  {
    title: "Events",
    href: "/dashboard/events",
    icon: calendar,
  },
  {
    title: "Attendees ",
    href: "/dashboard/attendees",
    icon: attend,
  },
  {
    title: "Payouts",
    href: "/dashboard/payouts",
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

  const isActiveLink = (href: string) => {
    if (href === "/dashboard/events") {
      return pathname.startsWith(href);
    }
    return pathname === href;
  } 
    

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-white border-b border-[#E8E8E8] py-[15.5px] px-5">
        <Image
          src={rally}
          alt="Logo"
          width={32}
          height={32}
          className="group-data-[state=collapsed]:hidden"
        />

        <Image
          src={rally}
          alt="Logo"
          width={32}
          height={32}
          className="hidden group-data-[state=collapsed]:block"
        />
      </SidebarHeader>
      <SidebarContent className="pt-4 pb-3 px-2 bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <div
                    key={item.title}
                    className="mt-1"
                    onClick={handleForceOpen}
                  >
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        onClick={() => {
                          if (isPortrait) setOpenMobile(false);
                        }}
                        className={cn(
                          "h-auto py-2 transition-all duration-200", 
                          active 
                            ? "bg-[#F8F6FD] border border-[#E1DEF5] text-[#6A59CE]" // Active State
                            : "hover:text-[#6A59CE] border border-transparent" // Inactive State
                        )}
                      >
                        <Link
                          href={item.href}
                          onClick={handleNavClick}
                          className="flex items-center gap-2 text-[#959595]"
                        >
                          {/* <Image
                            src={item.icon}
                            alt={item.title}
                            width={15}
                            height={15}
                          /> */}
                          <div className="flex gap-2">
                            <div
                              className="h-5 w-5 bg-current"
                              style={{
                                maskImage: `url(${item.icon.src})`,
                                WebkitMaskImage: `url(${item.icon.src})`,
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                              }}
                            />
                            <span className="truncate group-data-[state=collapsed]:hidden font-geist font-medium text-[15px] leading-[150%] tracking-[-0.24px]">
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                  </div>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavigation.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <div key={item.title} className="mt-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        onClick={() => {
                          if (isPortrait) setOpenMobile(false);
                        }}
                        className={cn(
                          "h-auto py-2 transition-all duration-200", 
                          active 
                            ? "bg-[#F8F6FD] border border-[#E1DEF5] text-[#6A59CE]" // Active State
                            : "hover:text-[#6A59CE] border border-transparent" // Inactive State
                        )}
                      >
                        <Link
                          href={item.href}
                          onClick={handleNavClick}
                          className="flex items-center gap-2 text-[#959595]"
                        >
                          {/* <Image
                            src={item.icon}
                            alt={item.title}
                            width={15}
                            height={15}
                          /> */}
                          <div className="flex gap-2">
                            <div
                              className="h-5 w-5 bg-current"
                              style={{
                                maskImage: `url(${item.icon.src})`,
                                WebkitMaskImage: `url(${item.icon.src})`,
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                              }}
                            />
                            <span className="truncate group-data-[state=collapsed]:hidden font-geist font-medium text-[15px] leading-[150%] tracking-[-0.24px]">
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarRail /> */}
      <SidebarFooter className="bg-white border-t border-[#E8E8E8] py-[11.5px] px-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              onClick={() => toggleDropdown("user")}
              className="flex justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent w-full"
            >
              {/* Avatar Container */}
              <div className="flex items-center gap-2">
                <Image
                  src={avatar}
                  alt="User Avatar"
                  width={35}
                  height={35}
                  className="flex aspect-square size-11 items-center justify-center rounded-lg text-white border-[0.8px] border-[#FA9874]"
                />
                <span className="font-geist font-medium text-sm text-[#1A1A1A] leading-[150%] tracking-[-0.1px]">{user.name}</span>
              </div>

              {/* Three dots icon */}
              <div className="hover:bg-[#F5F5F5] rounded-[6px] p-1 group-data-[state=collapsed]:hidden cursor-pointer">
                <MoreHorizontal className="ml-auto size-4 text-[#959595]" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
