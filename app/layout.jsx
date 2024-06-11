import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "RoughPartnership",
  description: 'Manage Rough Partnership'
};

// import React from 'react'

function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

export default MainLayout;
