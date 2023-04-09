import './App.scss';
import { useState, useEffect } from "react";
import {  Routes, Route, useParams, Navigate, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewUserPage from "./pages/NewUserPage/NewUserPage";
import Neighbors from "./pages/Neighbors/Neighbors";
import MessagePage from "./pages/MessagePage/MessagePage";
import axios from 'axios';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState([]);
  const [ neighbors, setNeighbors ] = useState([]);

  let navigate = useNavigate();
  const id = useParams();

  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getNeighbors(user.location)
    navigate('/neighbors');
  }, [userEmail]);

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    axios.post(`${api}/users`, {email})
      .then((res) => {
        setLoggedIn(true);
        setUser(res.data[0]);
        setUserEmail(res.data[0].email);
      })
  }

  function handleLogout(e) {
    e.preventDefault();
    if(loggedIn) {
        setLoggedIn(!loggedIn);
        setUser({});
        return navigate('/login');
    } else {
        return navigate('/login');
    }
  }

  function getNeighbors(location) {
    const userLocation = location;
    axios
    .put(`${api}/users`, userLocation)
    .then((response) => {
        const onlyNeighbors = response.data.filter((neighbor) => neighbor.email !== userEmail);
        setNeighbors(onlyNeighbors);
    })
    .catch((error) => {
        console.log("error", error);
    });
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
          <Route path="/neighbors" element={<Neighbors loggedIn={loggedIn} user={user} getNeighbors={getNeighbors} neighbors={neighbors} />} />
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setUser={setUser} handleLogin={handleLogin} handleLogout={handleLogout} /> } />
          <Route path="/signup" element={<NewUserPage loggedIn={loggedIn} user={user} setUser={setUser} setLoggedIn={setLoggedIn} />} />
          <Route path="/neighbor/:id" element={<MessagePage user={user} neighbors={neighbors} />} />
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
