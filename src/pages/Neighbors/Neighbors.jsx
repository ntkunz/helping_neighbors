import "./Neighbors.scss";
import NeighborsComponent from "../../Components/NeighborsComponent/NeighborsComponent";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Navigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Neighbors({loggedIn}) {

const [ neighbors, setNeighbors ] = useState([]);

const id = useParams();
const api = process.env.REACT_APP_API_URL;

useEffect(() => {
    getNeighbors();
    //eslint-disable-next-line
}, []);

function getNeighbors() {
    axios
    .get(`http://localhost:8080/users`)
    // .get('${api}/users')
    .then((response) => {
        setNeighbors(response.data);
    })
    .catch((error) => {
        console.log("error", error);
    });
}

    return (
        // neighbors.length && loggedIn ? 
        <div className="neighbors">
            {neighbors.map((neighbor) => (
                <Link className="neighbor__link" key={neighbor.id} to={`/neighbor/${neighbor.user_id}`}>
                    {/* <Neighbor key={neighbor.id} neighbor={neighbor} /> */}
                    <Neighbor neighbor={neighbor} />
                </Link>
            ))}
        </div> 
        // :
        // <Navigate to="/" /> 
    )
}