import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import Guest from "@/components/Guest";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { checkUser } from "@/lib/checkUser";
import EmailToAuthorize from "@/components/EmailToAuthorize";

async function HomePage() {
  const user = await checkUser();
  if (!user) {
    return (
      <>
        <SignedOut>
          <Guest />
        </SignedOut>
      </>
    );
  }
  return (
    <div>
      <SignedIn>
        {user.role === "tbd" ? (
          <EmailToAuthorize userEmail={user.email} userName={user?.name} />
        ) : (
          <div>
            {/* <Hero /> */}
            <a
              href="/addLot"
              className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Create a New Lot
            </a>
            <InfoBoxes />
          </div>
        )}
      </SignedIn>

      <Footer />
    </div>
  );
}

export default HomePage;
