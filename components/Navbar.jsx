// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import logo from "@/assets/images/logo.png";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignOutButton,
// } from "@clerk/nextjs";
// // import { checkUser } from "@/lib/checkUser";

// const Navbar = async () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const pathname = usePathname();
//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     try {
//   //       const response = await fetch("/api/getUser");
//   //       const userData = await response.json();
//   //       setUser(userData);
//   //     } catch (error) {
//   //       console.error("Error fetching user data:", error);
//   //     }
//   //   };
//   //   fetchUser();
//   // }, []);

//   // console.log(user);

//   return (
//     <nav className="bg-blue-700 border-b border-blue-500">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-20 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
//             {/* <!-- Mobile menu button--> */}
//             <button
//               type="button"
//               id="mobile-dropdown-button"
//               className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//               onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             >
//               <span className="absolute -inset-0.5"></span>
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="block h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
//             {/* <!-- Logo --> */}
//             <Link className="flex flex-shrink-0 items-center" href="/">
//               <Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />
//               <span className="hidden md:block text-white text-2xl font-bold ml-2">
//                 Rough Lots
//               </span>
//             </Link>
//             {/* <!-- Desktop Menu Hidden below md screens --> */}
//             <div className="hidden md:ml-6 md:block">
//               <div className="flex space-x-2">
//                 <Link
//                   href="/"
//                   className={`${
//                     pathname === "/" ? "bg-black" : ""
//                   } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
//                 >
//                   Home
//                 </Link>

//                 <SignedIn>
//                   <Link
//                     href="/crystals"
//                     className={`${
//                       pathname === "/crystals" ? "bg-black" : ""
//                     } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
//                   >
//                     Rough Crystals
//                   </Link>
//                   <Link
//                     href="/crystals/add-crystal"
//                     className={`${
//                       pathname === "/crystals/add-crystal" ? "bg-black" : ""
//                     } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
//                   >
//                     Add a Crystal
//                   </Link>
//                 </SignedIn>
//               </div>
//             </div>
//           </div>

//           {/* <!-- Right Side Menu --> */}
//           <div className="hidden md:block md:ml-6">
//             <div className="flex items-center">
//               <SignedOut>
//                 <SignInButton>
//                   <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
//                     <span>Login or Register</span>
//                   </button>
//                 </SignInButton>
//               </SignedOut>
//             </div>
//           </div>

//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
//             <Link href="/messages" className="relative group">
//               <button
//                 type="button"
//                 className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//               >
//                 <span className="absolute -inset-1.5"></span>
//                 <span className="sr-only">View notifications</span>
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
//                   />
//                 </svg>
//               </button>
//               <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//                 2
//                 {/* <!-- Replace with the actual number of notifications --> */}
//               </span>
//             </Link>
//             {/* <!-- Profile dropdown button --> */}
//             <div className="relative ml-3">
//               <SignedIn>
//                 <SignOutButton />
//               </SignedIn>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <!-- Mobile menu, show/hide based on menu state. --> */}
//       {isMobileMenuOpen && (
//         <div id="mobile-menu">
//           <div className="space-y-1 px-2 pb-3 pt-2">
//             <Link
//               href="/"
//               className={`${
//                 pathname === "/" ? "bg-black" : ""
//               } text-white block rounded-md px-3 py-2 text-base font-medium`}
//             >
//               Home
//             </Link>
//             <SignedIn>
//               <Link
//                 href="/crystals"
//                 className={`${
//                   pathname === "/crystals" ? "bg-black" : ""
//                 } text-white block rounded-md px-3 py-2 text-base font-medium`}
//               >
//                 Crystals
//               </Link>
//               <Link
//                 href="/crystals/add-crystal"
//                 className={`${
//                   pathname === "/crystals/add-crystal" ? "bg-black" : ""
//                 } text-white block rounded-md px-3 py-2 text-base font-medium`}
//               >
//                 Add Crystal
//               </Link>
//             </SignedIn>
//             <SignedOut>
//               <SignInButton>
//                 <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
//                   <span>Login or Register</span>
//                 </button>
//               </SignInButton>
//             </SignedOut>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// components/Navbar.jsx
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
