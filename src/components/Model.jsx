import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineWechat } from "react-icons/ai";

import NewChat from "./Sidebar_AI/NewChat";

import { query, orderBy, collection } from "firebase/firestore";
import { auth, db } from "../utils/firebase.js";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import ChatRow from "./Sidebar_AI/ChatRow";

import { useState } from "react";

export default function Model() {
  const [user] = useAuthState(auth);
  const [chats, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.email, "chats"),
        orderBy("timestamp", "desc")
      )
  );

  const [open, setOpen] = useState(false);
  const handleClick = (e, value) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    setOpen(value);
  };

  return (
    <div className="">
      {!open && (
        <div
          className="px-8 py-1 border-none rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 "
          onClick={() => setOpen(true)}
        >
          <AiOutlineWechat
            className="h-9 w-9 text-gray-400 pulse"
            aria-hidden="true"
          />
        </div>
      )}

      {open && (
        <div
          className=" h-[calc(100vh-48px)] w-screen bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 z-0 "
          onClick={(e) => handleClick(e, false)}
        >
          <AiOutlineCloseCircle
            onClick={(e) => handleClick(e, false)}
            className="h-10 w-10 text-gray-700 mx-auto mb-1"
          />
          <div className="mx-auto z-10  w-[70vw] origin-top-right rounded-md  border border-gray-700 text-gray-700">
            <NewChat />
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} chatRow={chat.data()} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
