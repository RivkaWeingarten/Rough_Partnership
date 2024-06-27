import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "RoughPartnership",
  description: 'Manage Rough Partnership'
};

// import React from 'react'

function MainLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
    </ClerkProvider>
  );
}

export default MainLayout;
