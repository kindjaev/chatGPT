import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NewChat from "./components/NewChat";
// import Chat from "./pages/Layout";
// import Query from './components/Query'
// import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/NotFound";

function App() {
  const [user] = useAuthState(auth);
  user && localStorage.setItem("user", JSON.stringify(user.email));
  let userAuth = localStorage.getItem("user");

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute user={userAuth} />}>
            <Route exact path="/chat" element={<Layout />} />
            <Route exact path="/chat/:id" element={<Layout />} />
          </Route>
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <NotFound />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
