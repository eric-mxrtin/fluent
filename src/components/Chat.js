import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../services/firebase-config";

export const Chat = ({ room, language }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "rooms", room, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      userImage: auth.currentUser.photoURL
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-orange-500 p-4">
        <h1 className="text-white text-xl font-bold">{language} Room</h1>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex ${m.userId === auth.currentUser.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${m.userId === auth.currentUser.uid ? 'bg-orange-500 text-white' : 'bg-white'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <img src={m.userImage} alt="user-pfp" className="h-6 w-6 rounded-full"/>
                <span className="font-semibold text-sm">{m.user}</span>
              </div>
              <p className="text-sm">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 flex space-x-2">
        <input
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button 
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};