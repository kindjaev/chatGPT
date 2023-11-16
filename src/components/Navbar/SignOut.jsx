import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase.js";
import toast from "react-hot-toast";

function SignOut() {
  const handleClick = async () => {
    const notification = toast.loading("Singing out...");
    await signOut(auth);
    localStorage.removeItem("user");
    // toast to say successful
    toast.success("Signed out", {
      id: notification,
    });
  };

  return (
    <button
      className="rounded-lg py-1 px-4 ring-2 ring-primaryPurple hover:bg-primaryPurple hover:text-white"
      onClick={handleClick}
    >
      Sign out
    </button>
  );
}

export default SignOut;
