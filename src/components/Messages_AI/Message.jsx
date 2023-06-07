import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase.js";
import { TypeText } from "../../utils/TypeText.jsx";

const style = {
  user: "flex items-center text-primaryPurple p-3 pr-4 bg-gray-300 rounded-lg m-1 justify-start",
  ai: "flex items-center text-primaryPurple p-3 pr-4 bg-gray-300 rounded-lg m-1 justify-end",
};

function Message({ message }) {
  const [user] = useAuthState(auth);
  const { text, user: userData, timestamp } = message.data();

  const time = Math.ceil(Date.now() / 1000);

  return (
    <div className="mx-auto px-2 mb-2">
      {/* display messages of the user on the left and ai on the right*/}
      {userData.id == user?.email ? (
        <div className="flex items-center p-3 pr-4 text-gray-700 rounded-lg m-1 justify-end bg-gray-200">
          <p>{text}</p>
          <img
            src={userData.avatar}
            alt="user avatar"
            className="ml-2 w-[40px] rounded-lg"
          />
        </div>
      ) : (
        <div className="flex items-center text-gray-700 p-3 pr-4  rounded-lg m-1 justify-start bg-gray-200">
          <img
            src={userData.avatar}
            alt="ai avatar"
            className="mr-2 w-[40px] rounded-lg"
          />
          {timestamp && timestamp.seconds + 5 < time ? (
            <p>{text}</p>
          ) : (
            <TypeText data={text} />
          )}
        </div>
      )}
    </div>
  );
}

export default Message;
