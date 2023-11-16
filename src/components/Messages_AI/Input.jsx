import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase.js";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

function Input({ id }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  // const [messages, setMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    const text = input.trim();
    setInput("");

    // MESSAGE OBJECT
    const message = {
      text,
      timestamp: serverTimestamp(),
      user: {
        id: user?.email,
        name: user?.displayName,
        avatar: `https://ui-avatars.com/api/?name=${user?.displayName}`,
      },
    };

    // ADD MESSAGE INTO FIREBASE STORAGE
    await addDoc(
      collection(db, "users", user?.email, "chats", id, "messages"),
      message
    );

    // Toast notification
    const notification = toast.loading("ChatGPT is thinking...");

    // FETCH DATA FROM CHATGPT
    const res = await fetch("https://icanhazdadjoke.com/slack");
    const ai = await res.json();
    const aiText = ai.attachments[0].text;

    // AI MESSAGE
    const aiMessage = {
      text: aiText,
      timestamp: serverTimestamp(),
      user: {
        id: "ChatGPT",
        name: "ChatGPT",
        avatar: `https://ui-avatars.com/api/?name=AI`,
      },
    };

    // toast to say successful
    toast.success("ChatGPT has responded successfully", {
      id: notification,
    });

    // ADD AI MESSAGE TO FIREBASE STORE
    await addDoc(
      collection(db, "users", user?.email, "chats", id, "messages"),
      aiMessage
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex px-8 rounded-lg border text-lg shadow-md mx-auto text-[#404040]"
        id="input-form"
      >
        <input
          type="text"
          className="bg-transparent flex-1 m-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
          placeholder="Send a message..."
          value={input}
          disabled={!user}
          onChange={(ev) => setInput(ev.target.value)}
        />

        <button
          type="submit"
          className="text-2xl text-[#404040] ml-4 p-4 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={!user || !input}
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
}

export default Input;
