import './App.scss';
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Neighbors from "./pages/Neighbors/Neighbors";
import NeighborsComponent from "./Components/NeighborsComponent/NeighborsComponent";
// import Profile from "./pages/Profile/Profile";
// import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();

  function handleLoggedin(e) {
    e.preventDefault();
    setLoggedIn(!loggedIn);
    // navigate('/dashboard');
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header 
          loggedIn={loggedIn} 
          handleLoggedIn={handleLoggedin}
        />
        <div className="App__routes">
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {loggedIn ? <Route path="/dashboard" element={<Dashboard />} /> : <Route path="/" element={<LoginPage />} />}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/messages" element={<Messages />} /> */}
          <Route path="/neighbors" element={<NeighborsComponent />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/profile/:id" element={<ProfileEdit />} /> */}
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>

    </div>
  );
}
