'use client'

import { useSession, signOut, signIn } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
import { IoShieldOutline } from "react-icons/io5"
import { LuLogIn } from "react-icons/lu"

export const LogoutButton = () => {

    const {data: session, status} = useSession()

    if(status === 'loading') {
        return (
            <div className="p-2 flex items-center justify-center h-10 rounded-xl border bg-white focus:bg-white active:bg-white ">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-black group">
            <IoShieldOutline />
            <span className="group-hover:text-black">Espere.......</span>
          </button>
            </div>
        
        )
    }
    if(status === 'unauthenticated') {
        return (
            <div className="p-2 flex items-center justify-center h-10 rounded-xl border bg-blue-500 focus:bg-blue-500 active:bg-blue-500 ">
            <button 
            onClick={() => signIn()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
            <LuLogIn />
            <span className="group-hover:text-white">Login</span>
          </button>
            </div>
        
        )
    }

  return (
    <div className="p-2 flex items-center justify-center h-10 rounded-xl border bg-red-500 focus:bg-red-500 active:bg-red-500 ">
    <button 
    onClick={() => signOut()}
    className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
    <CiLogout />
    <span className="group-hover:text-white">Logout</span>
  </button>
   </div>
 
  )
}
