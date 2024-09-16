import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
    const subscription = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => subscription();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <>
      <div className="chat-app">
        <div className="header">
          <h1>Welcome to: {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
          {messages.map((m) => (
            <div className="message" key={m.id}>
              <span className="user">{m.user}</span>
              {m.text}
            </div>
          ))}
        </div>
        <form className="new-message-form" onSubmit={handleSubmit}>
          <input
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button className="send-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
