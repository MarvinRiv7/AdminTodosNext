import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { CiMenuBurger, CiSearch, CiChat1, CiBellOn, CiShoppingBasket, CiLogout } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { LogoutButton } from "./LogoutButton";


const getTotalCount = (cart: {[id: string]: number}):number => {
  let items = 0
  Object.values(cart).forEach((value) => {
    items += value as number
  })

  return items
}

export const TopMenu = async () => {

  const cookiesStore = await cookies()
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}')

  const totalitems = getTotalCount(cart)


  return (
    <div className="sticky z-10 top-0 h-16 bg-gray-200 lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        {/* Título del Dashboard (se muestra en pantallas grandes) */}
        <h5 className="text-2xl text-black font-medium lg:block text-center">
          Dashboard
        </h5>

        {/* Botón del menú (se muestra solo en pantallas pequeñas) */}
        <button className="w-12 h-16 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>

        {/* Contenedor de búsqueda y botones */}
        <div className="flex space-x-2">
          {/* Input de búsqueda (visible en pantallas medianas y grandes) */}
          <div className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <CiSearch />
              </span>
              <input
                type="search"
                name="leadingIcon"
                id="leadingIcon"
                placeholder="Search here"
                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
              />
            </div>
          </div>

          {/* Botón de búsqueda para móviles */}
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
            <CiSearch size={20} />
          </button>
          {/* Botón de notificaciones */}
          <Link href={'/dashboard/cart'}  className="p-2 flex items-center justify-center h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
            {
              (totalitems > 0) && ( <span className="text-sm mr-0.5 text-blue-600 font-bold">{totalitems}</span>)
            }
           
            <FaShoppingCart size={30} />
          </Link>
          <LogoutButton/>
        </div>
      </div>
    </div>
  );
};
