// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { TopMenu } from "@/components";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="bg-white p-2 m-2 rounded px-6 pt-6 pb-5">{children}</div>
      </div>
    </>
  );
}
