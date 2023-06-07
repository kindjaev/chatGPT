import React from "react";
import cardsData from "../../database.json";
import ai from "../../assets/icons/ai.png";
import ai2 from "../../assets/icons/ai2.png";
import ai3 from "../../assets/icons/ai3.png";

function Features() {
  const icons = [ai, ai2, ai3];
  // const newdata = cardsData.map((item, i) => ({ ...item, icon: icons[i] }));
  let i = 0;
  let newData = [];
  for (let j = 0; j < cardsData.length; j++) {
    newData.push({ ...cardsData[j], icon: icons[i] });
    if (i < 2) {
      i++;
    } else {
      i = 0;
    }
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl text-primaryPurple">Features</h2>
      <div className="card-container flex overflow-auto">
        {newData &&
          newData.map((item, i) => (
            <div
              key={i}
              className="min-w-[350px] h-[380px] p-8 shadow-lg rounded-lg mr-5 mb-5 flex flex-col items-center justify-between card text-gray-600"
            >
              <p className="h-[55%] overflow-auto fade ">{item.text}</p>
              <img
                src={item.icon}
                alt="ai icon"
                width="120px"
                className="mt-3"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Features;
