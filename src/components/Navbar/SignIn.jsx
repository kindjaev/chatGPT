import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase.js";
import toast from "react-hot-toast";

function SignIn() {
  const signIn = async () => {
    // Toast notification
    const notification = toast.loading("Singing in...");
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    if (res) {
      // toast to say successful
      toast.success("Signed in", {
        id: notification,
      });
    }
  };

  return (
    <button className="login-with-google-btn" onClick={signIn}>
      Sign in
    </button>
  );
}

export default SignIn;
