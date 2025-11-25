"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AttendeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/dashboard/banking");
  // }, []);
  return <div className="w-full min-h-screen min-w-screen">{children}</div>;
}
