import { useNavigate } from "react-router-dom";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase.js";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";

function NewChat() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  // CREATE NEW CHAT ROW
  const createNewChat = async (ev) => {
    ev.preventDefault();

    if (!title) return;
    const input = title.trim();
    setTitle("");

    // ADD DOCUMENT TO FIREBASE STORE
    const doc = await addDoc(collection(db, "users", user?.email, "chats"), {
      title: input,
      userId: user?.email,
      timestamp: serverTimestamp(),
    });
    // send user to the new chat page
    return navigate(`/chat/${doc.id}`);
  };

  return (
    <form
      onClick={createNewChat}
      className="flex  mx-auto items-center py-2 px-3 border rounded-md"
    >
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New chat"
        value={title}
        className="flex-1 bg-transparent focus:outline-none"
      />
      <button type="submit" className="text-2xl">
        <AiOutlinePlusCircle />
      </button>
    </form>
  );
}

export default NewChat;
