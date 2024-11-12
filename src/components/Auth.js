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
    <main className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center p-6">
      {/* Header */}
      <h1 className="text-4xl md:text-4xl font-bold text-orange-600 mb-2">
        Learn Languages. Speak Fluent.
      </h1>
      <p className="text-lg md:text-xl text-orange-500 max-w-lg mb-6">
        Connect with native speakers and gain real-time coaching. All in one place.
      </p>
  
      {/* Email input and Button */}
      <div className="flex flex-col md:flex-row items-center gap-3 mb-10">
        <input 
          type="email" 
          placeholder="What's your email?" 
          className="w-full md:w-80 px-4 py-3 border border-orange-300 rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
        />
        <button 
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50" onClick={signInWithGoogle}
        >
          Get started for free
        </button>
      </div>
    </main>
  );
  
};
