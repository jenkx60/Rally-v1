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
  const paths = pathname.split("/").filter(Boolean); // Filter out any empty strings

  const currentPage =
    paths.length > 0
      ? paths[paths.length - 1]
        .replace(/-/g, " ")
        .replace(/^./, (c) => c.toUpperCase())
      : "Dashboard";

  const isDashboardActive = pathname === "/dashboard";

  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {/* Breadcrumb for the Dashboard */}
          <BreadcrumbItem>
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
          </BreadcrumbItem>

          {/* Loop over each path and generate breadcrumb items */}
          {paths.slice(1).map((path, index) => {
            const href = `${paths.slice(1, index + 2).join("/")}`;
            // Capitalize the first letter of each breadcrumb
            const formattedPath = path
              .replace(/-/g, " ")
              .replace(/^./, (c) => c.toUpperCase());
            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === paths.length - 2 ? (
                    <BreadcrumbPage className="font-semibold text-black text-[0.9vw] portrait:text-[2.1vw] portrait:sm:text-[2vw]">
                      {formattedPath}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={href}
                      className="font-bold text-[0.9vw] portrait:text-[2.1vw] portrait:sm:text-[2vw]"
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
