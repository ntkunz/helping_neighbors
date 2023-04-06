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


  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    // axios.post(`http://localhost:8080/users`, {email})
    axios.post(`${api}/users`, {email})
      .then((res) => {
        setLoggedIn(loggedIn);
        setUser(res.data);
        navigate('/neighbors');
      })
  }

  function handleLogout(e) {
    e.preventDefault();
if(loggedIn) {
    setLoggedIn(!loggedIn);
    setUser([]);
    return navigate('/login');
} else {
    return navigate('/login');
}
}

  return (
    <div className="App">
      
        <Header 
          loggedIn={loggedIn} 
          handleLogout={handleLogout}
        />
        <div className="App__routes">
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/neighbors" /> : <Navigate to="/login" />} />

          <Route path="/neighbors" element={<Neighbors loggedIn={loggedIn} user={user} />} />
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setUser={setUser} handleLogin={handleLogin} handleLogout={handleLogout} /> } />

          {/* {loggedIn ? <Route path="/neighbors" element={<Neighbors loggedIn={loggedIn} user={user} />} />
            : 
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setUser={setUser} handleLogin={handleLogin} /> } />} */}


          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
        </div>
        <Footer />
      

    </div>
  );
}
