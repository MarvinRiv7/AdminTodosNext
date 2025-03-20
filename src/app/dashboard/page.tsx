import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <WidgetItem title="Usuario conectado S-Side">
          <div className="relative max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <img
                src={session.user?.image ?? '/yop.jpeg'}
                alt="Tania Andrew"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h6 className="text-lg font-semibold text-gray-900">{session.user?.name}</h6>
                <a href="#" className="text-sm text-blue-600">{session.user?.email}</a>
              </div>
            </div>
            <p className="mt-4 text-gray-700 text-sm">

            </p>
            <div className="flex justify-between items-center mt-4 border-t pt-4 text-sm text-gray-600">
              <p className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>United Kingdom</span>
              </p>
              <a href="#" className="flex items-center space-x-1 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
                <span>Material Tailwind</span>
              </a>
            </div >
            <div className=" text-center mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <Link  href="/dashboard/profile"  >
              Follow
            </Link>
            </div>
         
          </div>
        </WidgetItem>
      </div>
    </div>
  );
}