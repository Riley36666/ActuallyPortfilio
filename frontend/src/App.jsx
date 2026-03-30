import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home"
import Project from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Aboutme from "./pages/AboutMe";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/aboutme" element={<Aboutme />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;