import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import { TabBar } from "@/components";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";



export const metadata = {
 title: 'Cookies Page',
 description: 'Cookies Page',
};

export default async function CookiesPage() {

   const user = await getUserServerSession()
  
    if(!user) redirect('/api/auth/signin');

  const cookieStore = await cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={+cookieTab}/>
        </div>
    </div>
  );
}