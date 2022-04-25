import { useState } from "react";
import Logo from "./Components/Logo";
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
function App() {
  const [signIn, setSignIn] = useState(true);
  return (
    <section className="w-full min-h-screen flex flex-col bg-gray-100 justify-center items-center">
      <div className="w-full mb-4 flex flex-col items-center text-6xl">
        <Logo />
        <p className="text-base text-gray-700 font-semibold">
          fastest way to message !
        </p>
      </div>
      <div className="w-full flex justify-center">
        {signIn ? (
          <SignIn setSignIn={setSignIn} />
        ) : (
          <SignUp setSignIn={setSignIn} />
        )}
      </div>
    </section>
  );
}

export default App;
