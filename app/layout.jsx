import "@/assets/styles/globals.css";
export const metadata = {
  title: "RoughPartnership",
  description: 'Manage Rough Partnership'
};

// import React from 'react'

function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}

export default MainLayout;
