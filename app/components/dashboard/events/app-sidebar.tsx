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
import profile from '@/public/Sidebar/profile.svg';
import logout from '@/public/Sidebar/logout.svg';
import { usePathname, useRouter } from "next/navigation";
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
import { DoorOpen, MoreHorizontal, User2 } from "lucide-react";
import { title } from "process";
import { cn } from "@/lib/utils";
import {CalendarDays, Settings} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

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
  const router = useRouter();

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

  const handleViewProfile = () => {
    router.push("/dashboard/profile")
  }

  const handleLogout = () => {
    router.push("/")
  }

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

  const profileEmail = "divinemere6@gmail.com"
    

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
                            : "hover:text-[#6A59CE] hover:bg-[#FAFAFA] border border-transparent" // Inactive State
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
                            : "hover:text-[#6A59CE] hover:bg-[#FAFAFA] border border-transparent" // Inactive State
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
              variant='plain'
              // onClick={() => toggleDropdown("user")}
              className="flex justify-between w-full p-0"
            >
              {/* Avatar Container */}
              <div className="flex items-center gap-2 ">
                <Image
                  src={avatar}
                  alt="User Avatar"
                  width={35}
                  height={35}
                  className="flex aspect-square size-8 pt-1 items-center justify-center rounded-md text-white border-[0.8px] border-[#FA9874] bg-[#F8F6FD]"
                />
                <span className="font-geist font-medium text-sm text-[#1A1A1A] leading-[150%] tracking-[-0.1px]">{user.name}</span>
              </div>

              {/* Three dots icon */}
              <Popover>
                <PopoverTrigger asChild className="hover:bg-[#FAFAFA] flex items-center justify-center rounded-[6px] size-6 group-data-[state=collapsed]:hidden cursor-pointer">
                    <MoreHorizontal className="size-4 text-[#959595]" />
                </PopoverTrigger>
                <PopoverContent align="start" className="bg-white rounded-[12px] border border-[#0000000D] p-3 gap-2 shadow shadow-[#0000000D] w-[238px]">
                    <div className="p-2">
                      <p className="font-geist font-medium text-sm text-[#767676] leading-[150%] tracking-[-0.1px]">{profileEmail}</p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-1">
                      <button className="flex justify-between rounded-lg py-1.5 px-2 font-geist font-medium text-[#333333] text-[15px] leading-[150%] tracking-[-0.2px]" onClick={handleViewProfile}>
                        View profile
                        <Image
                          src={profile}
                          alt="Profile"
                          width={20}
                          height={20} 
                        />
                      </button>
                      <button className="flex justify-between rounded-lg py-1.5 px-2 font-geist font-medium text-[#EF4444] text-[15px] leading-[150%] tracking-[-0.2px]" onClick={handleLogout}>
                        Log out
                        <Image
                          src={logout}
                          alt="Logout"
                          width={20}
                          height={20} 
                        />
                      </button>
                    </div>
                </PopoverContent>
              </Popover>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
