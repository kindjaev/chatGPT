import React from "react";
import { Toaster } from "react-hot-toast";

import { query, orderBy, collection } from "firebase/firestore";
import { auth, db } from "../../utils/firebase.js";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Message from "./Message.jsx";
import { useEffect } from "react";

function ChatMessages({ id }) {
  const [user] = useAuthState(auth);

  // GET MESSAGES FROM THE DATABASE
  const [messages, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.email, "chats", id, "messages"),
        orderBy("timestamp", "asc")
      )
  );

  const scroll = document.querySelector("#scroll");

  useEffect(() => {
    messages && scroll.lastChild.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Toaster position="top-right" />
      <div id="scroll">
        {messages &&
          messages?.docs.map((message) => (
            <Message message={message} key={message.id} />
          ))}
      </div>
    </div>
  );
}

export default ChatMessages;
