import React from "react";

function SignIn() {
  return (
    <div className="w-[90%] md:w-1/2 lg:w-1/4 rounded-lg flex flex-col bg-white shadow-xl">
      <input
        className="m-3 outline-none border rounded-lg p-2 focus:border-blue-700 transition duration-300"
        type="text"
        placeholder="Email"
      />
      <input
        className="m-3 outline-none border rounded-md p-2 focus:border-blue-700 transition duration-300"
        type="password"
        placeholder="Password"
      />
      <button className="m-3 p-2 font-semibold text-sm bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md text-white">
        Sign In
      </button>
      <p className="p-2 flex justify-center text-sm font-semibold">
        Don't have an account.
        <span className="pl-1 text-blue-600 hover:text-blue-700 cursor-pointer">Sign Up</span>
      </p>
    </div>
  );
}

export default SignIn;
