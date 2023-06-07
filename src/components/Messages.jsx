import { useState, useEffect } from "react";
import { TypeText } from "../utils/TypeText";
const Messages = ({ data }) => {
  const [input, answer, messages, setMessages] = data;

  // const [messages, setMessages] = useState([])
  console.log(messages);
  function addMessage() {}
  return (
    <div>
      {messages &&
        messages.map((item) => {
          <TypeText data={item} />;
        })}
    </div>
  );
};

export default Messages;
