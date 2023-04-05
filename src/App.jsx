import './App.scss';
import { useState } from "react";
import {  Routes, Route, useParams, Navigate, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import Neighbors from "./pages/Neighbors/Neighbors";
import axios from 'axios';

// import NeighborsComponent from "./Components/NeighborsComponent/NeighborsComponent";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Messages from "./pages/Messages/Messages";
// import MessagesComponent from "./Components/MessagesComponent/MessagesComponent";
// import Profile from "./pages/Profile/Profile";
// import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  let navigate = useNavigate();
  const id = useParams();

  const api = process.env.REACT_APP_API_URL;


  function handleLoggedin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    axios.post(`${api}/users/login`, {email, password})
      .then(res => {
        console.log(res.data);
        setLoggedIn(true);
        setUser(res.data);
        navigate('/neighbors');
      })
  }

  return (
    <div className="App">
      
        <Header 
          loggedIn={loggedIn} 
          handleLoggedIn={handleLoggedin}
        />
        <div className="App__routes">
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/neighbors" /> : <Navigate to="/login" />} />
          {loggedIn ? <Route path="/neighbors" element={<Neighbors loggedIn={loggedIn} user={user} />} />
            : 
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} handleLoggedIn={handleLoggedin}/> } />}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
        </div>
        <Footer />
      

    </div>
  );
}
