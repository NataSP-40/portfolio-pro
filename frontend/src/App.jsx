import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import api from "./api.js";
import Profile from "./components/Profile/Profile.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
// import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen bg-softwhite">
      <Navbar />
      <main className="max-w-7xl mx-auto py-10">
        <Routes>
          <Route path="/" element={<Profile />} />
          {/* Add other routes here as needed */}
          {/* <Route path="/projects" element={<Projects />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
