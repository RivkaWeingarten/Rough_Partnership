import { SignInButton } from "@clerk/nextjs";
import React from "react";

function Guest() {
  return (
    <>
    <div className="text-center">
 <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Welcome, please sign in.</h1>
      <SignInButton>
        <button className="text-center text-white bg-light-blue-700 hover:bg-blue-900 hover:text-white rounded-md px-3 py-2">
          Login or Register
        </button>
        
      </SignInButton>
      </div>
    </>
  );
}

export default Guest;
