"use client";

import { redirect, useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter()

  return (
    router.push('/dashboard/events')
  );
}
export default DashboardPage;
