"use client";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/app/components/dashboard/app-sidebar";
import { Separator } from "@/app/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar";
import DynamicBreadcrumb from "@/app/components/dashboard/dynamic-breadcrumb";
import { useRouter } from "next/navigation";
// import QuickAction from "@/components/dashboard/quick-action";
// import Notification from "@/app/dashboard/";
// import { useOnboardingStore } from "@/store/use-onboarding-store";
import Head from "next/head";
// import axionsInstance from "@/lib/axios";
// import PasscodeSet from "@/components/businessOnboarding/passcode-set";
// import { PendingFeatureGuardProvider } from "@/components/pending-feature-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
//   const { currentUser } = useOnboardingStore();
  const [open, setOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     if (!currentUser) {
//       router.push("/login");
//     }
//   }, [currentUser]);

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
    <div className="flex h-screen w-full bg-white">
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* Header with conditional fixed positioning */}
            <header
              className={`flex portrait:w-screen h-16 items-center justify-between border-b border-[#E8E8E8] px-2 sm:px-4 transition-all duration-800 ease-in-out group-has-[data-collapsible=icon]/sidebar-wrapper:h-12`}
            >
              <div className="flex items-center gap-2 px-2">
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DynamicBreadcrumb />
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                {/* <Notification /> */}
                {/* <QuickAction /> */}
              </div>
            </header>

            {/* Content area with conditional padding to account for fixed header */}
            <div
              className={`flex portrait:w-screen flex-1 flex-col gap-4 portrait:px-4 px-6 portrait:sm:px-4 pt-2 portrait:sm:pt-4 bg-white overflow-y-auto`}
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
