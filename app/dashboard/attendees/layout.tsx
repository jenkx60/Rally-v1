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
  return <div className="max-w-screen">{children}</div>;
}
