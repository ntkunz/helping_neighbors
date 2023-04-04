import './App.scss';
import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams, Navigate, useNavigate } from "react-router-dom";
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

  const [loggedIn, setLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  // let navigate = useNavigate();
  const id = useParams();

  const api = process.env.REACT_APP_API_URL;


  function handleLoggedin(e) {
    e.preventDefault();
    setLoggedIn(!loggedIn);
    getUserInfo(id);
    // navigate('/dashboard');
  }

//NOT WORKING YET
  function getUserInfo(id) {
    axios
      // .get('http://localhost:8080/users/${id}')
      .get('${api}/users/${id}')
      
      .then((response) => {
        setUserInfo(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
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
          {/* {loggedIn ? <Route path="/dashboard" element={<Dashboard />} /> : <Route path="/" element={<LoginPage />} />} */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/messages" element={<MessagesComponent  loggedIn={loggedIn}/>} /> */}
          {/* <Route path="/neighbors" element={<NeighborsComponent loggedIn={loggedIn} />} /> */}
          {loggedIn ? <Route path="/neighbors" element={<Neighbors loggedIn={loggedIn} userInfo={userInfo} />} /> : false }
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/profile/:id" element={<ProfileEdit />} /> */}
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>

    </div>
  );
}
