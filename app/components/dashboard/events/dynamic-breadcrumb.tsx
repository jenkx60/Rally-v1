"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path && path !== "dashboard");

  const currentPage =
    paths.length > 0
      ? paths[paths.length - 1]
        .replace(/-/g, " ")
        .replace(/^./, (c) => c.toUpperCase())
      : "";

  const isDashboardActive = pathname === "/dashboard";

  return (
    <>
      <Breadcrumb className="hidden md:flex z-50">
        <BreadcrumbList>
          {/* Breadcrumb for the Dashboard */}
          {/* <BreadcrumbItem>
            {isDashboardActive ? (
              <BreadcrumbLink
                href="/dashboard"
                className="text-black text-[0.9vw] portrait:text-[2.1vw] portrait:sm:text-[2vw] font-bold"
              >
                Dashboard
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
                href="/dashboard"
                className="text-gray-400 text-[0.9vw] portrait:text-[2.1vw] portrait:sm:text-[2vw] font-bold transition-colors"
              >
                Dashboard
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>*/}
          {/* Loop over each path and generate breadcrumb items */}
          {paths.map((path, index) => {
            const href = `/dashboard/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;
            // Capitalize the first letter of each breadcrumb
            const formattedPath = path
              .replace(/-/g, " ")
              .replace(/^./, (c) => c.toUpperCase());
            return (
              <React.Fragment key={path}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-geist font-medium text-black text-sm leading-[150%] tracking-[-0.1px] portrait:text-[2.1vw] portrait:sm:text-[2vw]">
                      {formattedPath}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={href}
                      className="font-geist font-medium text-sm leading-[150%] tracking-[-0.1px] portrait:text-[2.1vw] portrait:sm:text-[2vw] text-[#959595] hover:text-black transition-colors"
                    >
                      {formattedPath}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex md:hidden font-bold text-lg py-2 px-1">
        {currentPage}
      </div>
    </>
  );
};

export default DynamicBreadcrumb;
