
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

export default async function Navbar() {
  const user = await checkUser();

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image className="h-10 w-auto" src={logo} alt="Rough" />
              <span className="text-white text-2xl font-bold ml-2">Rough Lots</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
          
            <SignedIn>
              <span className="text-white">Welcome, {user?.name || "User"} {user?.company}</span>
              <SignOutButton>
                <button className="text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                  Logout
                </button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                  Login or Register
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
