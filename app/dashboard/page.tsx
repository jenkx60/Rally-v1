import { redirect } from "next/navigation";

const DashboardPage = () => {
  return redirect('/dashboard/events');
}
export default DashboardPage;
