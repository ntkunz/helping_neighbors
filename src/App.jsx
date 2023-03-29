import './App.scss';
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import Neighbors from "./Pages/Neighbors/Neighbors";
// import Profile from "./Pages/Profile/Profile";
// import ProfileEdit from "./Pages/ProfileEdit/ProfileEdit";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {/* <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/neighbors" element={<Neighbors />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ProfileEdit />} />
        </Routes> */}
        <Footer />
      </BrowserRouter>

    </div>
  );
}
