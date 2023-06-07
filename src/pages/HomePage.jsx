import Features from "../components/HomePage/Features";
import Hero from "../components/HomePage/Hero";
import Navbar from "../components/Navbar/Navbar";
import "../styles/homePage.css";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="homepage">
      <div className="container max-w-7xl mx-auto">
        <Toaster position="top-right" />
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
