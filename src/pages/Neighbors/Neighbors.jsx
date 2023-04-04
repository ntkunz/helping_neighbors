import "./Neighbors.scss";
import NeighborsComponent from "../../Components/NeighborsComponent/NeighborsComponent";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Navigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Neighbors({loggedIn, userInfo}) {

const [ neighbors, setNeighbors ] = useState([]);

const id = useParams();
const api = process.env.REACT_APP_API_URL;


useEffect(() => {
    getNeighbors();
    //eslint-disable-next-line
}, []);

//use this to get all neighbors
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

//working on getting neighbors near user with specific id
// '/login', {params: {name: 'ABCXYZ'}
// function getNeighbors() {
//     axios
//     .get(`http://localhost:8080/users`, {params: {id: user.user_id}})
//     // .get('${api}/users')
//     .then((response) => {
//         setNeighbors(response.data);
//     })
//     .catch((error) => {
//         console.log("error", error);
//     });
// }

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