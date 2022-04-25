import React, { useState } from "react";

function SignIn({ setSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log(email);
    console.log(password);
  };
  return (
    <div className="w-[90%] md:w-1/2 lg:w-1/4 rounded-lg flex flex-col bg-white shadow-xl">
      <form className="flex flex-col">
        <input
          className="m-3 outline-none border rounded-lg p-2 focus:border-blue-700 transition duration-300"
          type="email"
          required={true}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="m-3 outline-none border rounded-md p-2 focus:border-blue-700 transition duration-300"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignIn}
          className="m-3 p-2 font-semibold text-sm bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md text-white"
        >
          Sign In
        </button>
      </form>
      <p className="p-2 flex justify-center text-sm font-semibold">
        Don't have an account.
        <span
          onClick={() => setSignIn(false)}
          className="pl-1 text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default SignIn;
