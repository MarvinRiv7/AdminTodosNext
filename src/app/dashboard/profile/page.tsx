
import Image from "next/image";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { auth } from "@/auth";
import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

  const session = await auth();

    const user = await getUserServerSession()
   
     if(!user) redirect('/api/auth/signin');
  

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm text-center">
        {session?.user?.image && (
          <div className="flex justify-center mb-4">
            <Image
              src={session.user.image}
              width={100}
              height={100}
              className="rounded-full border-4 border-gray-300 shadow-lg"
              alt="Profile Picture"
            />
          </div>
        )}
        <h1 className="text-2xl font-semibold text-gray-800">{session?.user?.name}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 capitalize">{session?.user?.roles?.join(', ') ?? ['no-roles']}</h2>
        <p className="text-gray-500 mb-4">{session?.user?.email}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-600 hover:text-black transition transform hover:scale-110">
            <FaGithub size={30} />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110">
            <FaFacebook size={30} />
          </a>
        </div>
      </div>
    </main>
  );
}
