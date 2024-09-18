import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {

      const result = await signInWithPopup(auth, provider);
      console.log(result)
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth">
      <button
        className="bg-orange-500 text-white font-bold py-4 px-7 rounded-2xl shadow-lg 
                   transform transition duration-300 ease-in-out hover:bg-orange-600 
                   hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 
                   focus:ring-opacity-50 mb-6"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};
