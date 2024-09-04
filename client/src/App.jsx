import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/list/list";
import Hotel from "./pages/hotel/hotel";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/register";
import Aboutus from "./pages/About us/aboutus";
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />
        
        {/* List page routes */}
        <Route path="/hotels" element={<List />} />
        <Route path="/list" element={<List />} />

        {/* Hotel details route */}
        <Route path="/hotels/:id" element={<Hotel />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* About us page route */}
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
