import Input from "./Input";
import ChatMessages from "./ChatMessages";
import { useParams } from "react-router-dom";
import logo from "../../assets/whale-logo.png";

function Chat() {
  let { id } = useParams();

  return (
    <div className="flex flex-col overflow-auto">
      {id ? (
        <div className="flex flex-col h-[calc(100vh-48px)]  overflow-auto">
          <div className="flex-1 mt-10 md:mt-2">
            <ChatMessages id={id} />
          </div>
          <div className="p-4" id="scrollTo">
            <Input id={id} />
          </div>
        </div>
      ) : (
        <div className=" text-white text-6xl h-[calc(100vh-48px)] flex justify-center items-center">
          <img src={logo} alt="whale" className="p-4" />
        </div>
      )}
    </div>
  );
}

export default Chat;
