import { SignInButton } from "@clerk/nextjs";
import React from "react";

function Guest() {
  return (
    <>
      <h1>Welcome, Please Sign in</h1>
      <SignInButton>
        <button className="text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
          Login or Register
        </button>
      </SignInButton>
    </>
  );
}

export default Guest;
