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
    setLoggedIn(!loggedIn);
    loggedIn ? navigate('/login') : navigate('/neighbors');
  }

  const getUser = (event) => {
    event.preventDefault();
    navigate('/neighbors');
    // axios
    //   .post(`http://localhost:8080/login`, {
    //     email: event.target.email.value,
    //     password: event.target.password.value,
    //   })
    //   .then((response) => {
    //     // if (response.data.token) {
    //       setLoggedIn(true);
    //       setUser(response.data);
    //       navigate('/neighbors');
    //     // }
    //   })
    //   .catch((error) => {
    //     navigate('/neighbors')
    //     console.log(error);
    //   });
  };

//NOT WORKING YET
  // function getUserInfo(id) {
  //   axios
  //     // .get('http://localhost:8080/users/${id}')
  //     .get('${api}/users/${id}')
      
  //     .then((response) => {
  //       setUserInfo(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  // }


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
