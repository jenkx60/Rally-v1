"use client";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/app/components/dashboard/events/app-sidebar";
import { Separator } from "@/app/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar";
import DynamicBreadcrumb from "@/app/components/dashboard/events/dynamic-breadcrumb";
import { useRouter } from "next/navigation";
import Notification from "@/app/components/notifications/notification";
import Head from "next/head";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { checkAuth, user, isLoading } = useAuthStore();
//   const { currentUser } = useOnboardingStore();
  const [open, setOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
     return null;
  }

 
//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const res = await axionsInstance.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/check/auth-status`
//         );
//         res;
//       } catch (e) { }
//     };
//     checkToken();
//   }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 0
  //     );
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

//   if (!currentUser) {
//     return <div></div>;
//   }

  return (
    <div className="flex w-full bg-white">
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* Header with conditional fixed positioning */}
            <header
              className={`fixed top-0 z-10 flex h-16 w-full lg:w-[calc(100vw-256px)] shrink-0 items-center justify-between gap-2 border-b border-[#E8E8E8] bg-white px-4`}
            >
              <div className="flex items-center md:gap-2 md:px-2">
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DynamicBreadcrumb />
              </div>
              <div className="flex items-center gap-5 md:gap-4 pr-0 md:pr-2">
                <Notification />
                <SidebarTrigger className="lg:hidden text-[#1A1A1A] hover:bg-transparent" />
              </div>
            </header>

            {/* Content area with conditional padding to account for fixed header */}
            <div
              className={`flex flex-1 flex-col gap-4 px-4 pt-20 bg-white`}
            >
              {/* {!currentUser?.hasPasscode && (
                <PasscodeSet open={open} onOpenChange={setOpen} />
              )} */}
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
    </div>
  );
}
