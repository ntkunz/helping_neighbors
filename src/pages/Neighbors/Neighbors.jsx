import "./Neighbors.scss";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Navigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Neighbors({loggedIn, user}) {

const [ neighbors, setNeighbors ] = useState([]);

const id = useParams();
const api = process.env.REACT_APP_API_URL;
let userEmail = user[0].email;

useEffect(() => {
    getNeighbors();
    //eslint-disable-next-line
}, []);

//THIS WORKS AND CAN BE USED TO RETURN ALL USERS------------------
// function getNeighbors() {
//     axios
//     .get(`http://localhost:8080/users`, {userEmail})
//     // .get('${api}/users')
//     .then((response) => {
//         const onlyNeighbors = response.data.filter((neighbor) => neighbor.email !== userEmail);
//         setNeighbors(onlyNeighbors);
//     })
//     .catch((error) => {
//         console.log("error", error);
//     });
// }

////working on getting neighbors near user BASED OFF OF LOCATION
function getNeighbors() {
    //WORKING HERE BEFORE CHECKIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const userLocation = user[0].location;
    console.log('userLocation variable: ', userLocation)
    axios
    .put(`http://localhost:8080/users`, userLocation)
    // .get('${api}/users', {userLocation})
    .then((response) => {
        console.log('response.data : ', response.data);
        const onlyNeighbors = response.data.filter((neighbor) => neighbor.email !== userEmail);
        setNeighbors(onlyNeighbors);
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