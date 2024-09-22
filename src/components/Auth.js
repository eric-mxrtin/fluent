import { auth, provider } from "../services/firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = ({ setIsAuth, setShowSurvey }) => {
  const signInWithGoogle = async () => {
    try {

      const result = await signInWithPopup(auth, provider);
      console.log(result)
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      setShowSurvey(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">Fluent</h1>
      <h2 className="text-2xl font-semibold text-orange-500 mb-2">
        Connect with native language speakers instantly.
      </h2>
      <p className="text-lg text-orange-300 mb-4">
        Join us in mastering new languages one conversation at a time!
      </p>
      <h2 className="text-xl text-orange-400 mb-6">
        First, let's get you signed in.
      </h2>
      <button
        className="bg-orange-500 text-white font-bold py-4 px-7 rounded-2xl shadow-lg 
                   transform transition duration-300 ease-in-out hover:bg-orange-600 
                   hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 
                   focus:ring-opacity-50 mb-6"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
  </main>
  );
};
