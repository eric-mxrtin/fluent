import "./App.css";
import React, { useState, useEffect } from "react";


import { signOut } from "firebase/auth";
import { auth } from "./services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import { Auth } from "./components/Auth";
import { Survey } from "./components/Survey";
import { Queue } from "./components/Queue";
import { Chat } from "./components/Chat";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [room, setRoom] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [inQueue, setInQueue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("English");
  const [userType, setUserType] = useState(null);
  const [proficiency, setProficiency] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const authToken = cookies.get("auth-token");
        if (authToken) {
          setIsAuth(true);
        }
      } else {
        setIsAuth(false);
        cookies.remove("auth-token");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
    setShowSurvey(false);
    setInQueue(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} setShowSurvey={setShowSurvey} />;
  }

  if (showSurvey) {
    return (
      <Survey
        signUserOut={signUserOut}
        setLanguage={setLanguage}
        setProficiency={setProficiency}
        setUserType={setUserType}
        userType={userType}
        auth={auth}
        setInQueue={setInQueue}
        setShowSurvey={setShowSurvey}
      />
    );
  }

  if (inQueue) {
    return (
      <Queue
        user={auth.currentUser}
        language={language}
        userType={userType}
        proficiency={proficiency}
        setRoom={setRoom}
        setInQueue={setInQueue}
      />
    );
  }

  if (room) {
    return <Chat room={room} language={language}/>;
  }

  return <div>Something went wrong. Please refresh the page.</div>;
}

export default App;
