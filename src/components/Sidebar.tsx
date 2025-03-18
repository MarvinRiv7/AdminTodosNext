import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import { IoCalendar, IoCheckboxOutline, IoListOutline } from "react-icons/io5";
import { LiaCookieSolid } from "react-icons/lia";
import { LuShoppingBasket } from "react-icons/lu";

const MenuItems = [
  {
    icon: <IoCalendar/>,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline/>,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline/>,
    title: 'Server Actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <LiaCookieSolid />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <LuShoppingBasket />,
    title: 'Productos',
    path: '/dashboard/products'
  },
]
 


export const Sidebar = () => {
  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen  bg-gray-200 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4 flex flex-col items-center justify-center">
            {/* TODO: Next/Link hacia dashboard */}
          </div>

          <div className="mt-8 text-center">
            {/* Next/Image */}
            <Image
              src="/yop.jpeg"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              width={300}
              height={300}
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              Marvin Johalmo Rivas Ramirez🚀
            </h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>
          <ul className="space-y-2 tracking-wide mt-8">
            {
              MenuItems.map(item => (
                <SidebarItem key={item.path} {...item}/>
              ))
            }
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
