import { useState, useEffect, useCallback } from "react";

// The responsibility of this component is to load the text character by character, enhancing user interaction within the application.
export const TypeText = ({ data }) => {
  // it accepts AI response
  // console.log(data)
  const [plainText, setPlainText] = useState(""); //storage of output text
  const [index, setIndex] = useState(0); // this variable helps to iterate the function call
  const newData = [...data]; //store AI response in an array by character

  // rerender the code every time when plainText is updated
  useEffect(() => {
    // run the code every 20ms
    const typeText = setTimeout(() => {
      if (index < newData.length) {
        // this condition helps to run the code while index is less than the length of the string
        setPlainText((prev) => prev + newData[index]); // update outputted data with new character
        setIndex((prev) => prev + 1); // update index to go though all the characters
      } else {
        // stop to run code very 20ms
        clearTimeout(typeText);
      }
    }, 20);
  }, [plainText]);

  return <p>{plainText}</p>;
};
