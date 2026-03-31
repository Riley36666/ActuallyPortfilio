import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Project from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Aboutme from "./pages/AboutMe";
import TerminalPage from "./pages/terminal";


function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Pages WITH navbar/footer */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/aboutme"
        element={
          <MainLayout>
            <Aboutme />
          </MainLayout>
        }
      />
      <Route
        path="/project"
        element={
          <MainLayout>
            <Project />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard" element={
          <MainLayout>
            <Admin />
          </MainLayout>
        }
      />
      <Route path="/terminal" element={<TerminalPage />} />
    </Routes>
  );
}

export default App;