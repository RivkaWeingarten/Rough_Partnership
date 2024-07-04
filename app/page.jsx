import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import Guest from "@/components/Guest";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PriceList from "@/components/PriceList";
import { checkUser } from "@/lib/checkUser";
import EmailToAuthorize from "@/components/EmailToAuthorize";

async function HomePage() {
  const user = await checkUser();

  return (
    <div>
      <SignedIn>
        {user.role === "tbd" ? (
          <EmailToAuthorize userEmail={user.email} userName={user?.name} />
        ) : (
          <>
            <Hero />
            <InfoBoxes />
            <PriceList />
          </>
        )}
      </SignedIn>
      <SignedOut>
        <Guest />
      </SignedOut>
      <Footer />
    </div>
  );
}

export default HomePage;
