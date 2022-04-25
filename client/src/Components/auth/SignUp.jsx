import React, { useState } from "react";

function SignUp({ setSignIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {};
  return (
    <div className="w-[90%] md:w-1/2 lg:w-1/4 rounded-lg flex flex-col bg-white shadow-xl">
      <form className="flex flex-col">
        <input
          className="m-3 outline-none border rounded-lg p-2 focus:border-blue-700 transition duration-300"
          type="text"
          placeholder="Name"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="m-3 outline-none border rounded-lg p-2 focus:border-blue-700 transition duration-300"
          type="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="m-3 outline-none border rounded-md p-2 focus:border-blue-700 transition duration-300"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="m-3 p-2 font-semibold text-sm bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md text-white"
        >
          Sign Up
        </button>
      </form>
      <p className="p-2 flex justify-center text-sm font-semibold">
        Already have an account.
        <span
          onClick={() => setSignIn(true)}
          className="pl-1 text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </div>
  );
}

export default SignUp;
