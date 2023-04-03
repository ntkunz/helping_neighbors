import "./Neighbors.scss";
import NeighborsComponent from "../../Components/NeighborsComponent/NeighborsComponent";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Neighbors({loggedIn}) {

const [ neighbors, setNeighbors ] = useState([]);

const api = process.env.REACT_APP_API_URL;

useEffect(() => {
    getNeighbors();
    //eslint-disable-next-line
}, []);

function getNeighbors() {
    axios
    .get(`${api}/users`)
    .then((response) => {
        setNeighbors(response.data);
    })
    .catch((error) => {
        console.log("error", error);
    });
}

// {videosMinusMain.map((video) => (
//     <Link key={video.id} to={`/videos/${video.id}`}>
//         <Video video={video} /> 
//     </Link>
// ))}


    return (
        loggedIn ? 
        <div className="neighbors">
            {neighbors.map((neighbor) => (
                <Link className="neighbor__link" key={neighbor.id} to={`/neighbor/${neighbor.id}`}>
                    {/* <Neighbor key={neighbor.id} neighbor={neighbor} /> */}
                    <Neighbor neighbor={neighbor} />
                </Link>
            ))}
        </div> :
        <Navigate to="/" /> 
    )
}