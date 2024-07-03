// import React from 'react'
import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import Guest from "@/components/Guest";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PriceList from "@/components/PriceList";

function HomePage() {
  return (
    <div>
      <SignedIn>
        <Hero />
        <InfoBoxes />
        <PriceList />
      </SignedIn>
      <SignedOut>
        <Guest />
      </SignedOut>
      <Footer />
    </div>
  );
}

export default HomePage;
