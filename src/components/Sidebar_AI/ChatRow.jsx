import { BsChatRightDots, BsTrash } from "react-icons/bs";

import { doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useNavigate, Link } from "react-router-dom";

import { auth, db } from "../../utils/firebase.js";

// ACTIVE VS NOT ACTIVE CHAT ROW STYLES
const style = {
  active:
    "py-2 px-3 flex justify-between items-center bg-gray-800 rounded text-gray-300",
  notActive: "py-2 px-3 flex  justify-between items-center hover:bg-gray-800",
};

function ChatRow({ id: userId, chatRow }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  let { id } = useParams();

  const { title } = chatRow;

  // DELETE CHAT ROW
  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", user?.email, "chats", userId));
    navigate("/chat");
  };

  return (
    <Link
      to={`/chat/${userId}`}
      className={id == userId ? style.active : style.notActive}
    >
      <div className="flex items-center ">
        <BsChatRightDots className=" h-5 w-5" />
        <div className=" ml-2 mr-2">
          {/* if title length more than 25 char then show firs 25 char */}
          {title && (
            <p>{title.length > 25 ? title.substring(0, 25) + "..." : title}</p>
          )}
        </div>
      </div>
      <BsTrash
        className=" h-5 w-5 hover:text-red-500 justify-auto"
        onClick={deleteChat}
      />
    </Link>
  );
}

export default ChatRow;
