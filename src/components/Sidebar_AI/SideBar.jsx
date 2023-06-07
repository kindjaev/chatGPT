import React from "react";
import NewChat from "./NewChat";

import { query, orderBy, collection } from "firebase/firestore";
import { auth, db } from "../../utils/firebase.js";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import ChatRow from "./ChatRow";

function SideBar() {
  const [user] = useAuthState(auth);
  const [chats, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.email, "chats"),
        orderBy("timestamp", "desc")
      )
  );

  return (
    <div>
      {/* NEW CHAT SUBMIT FORM */}
      <div className="px-3 py-2">
        <NewChat />
      </div>
      {/* TITLES OF THE CHATS  */}
      <div className="px-3">
        {chats?.docs.map((chat) => (
          <ChatRow key={chat.id} id={chat.id} chatRow={chat.data()} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
