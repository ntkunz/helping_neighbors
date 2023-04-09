import "./Neighbors.scss";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Link } from "react-router-dom";

export default function Neighbors({ neighbors }) {

// const api = process.env.REACT_APP_API_URL;


    return (
        // neighbors.length && loggedIn ? 
        <div className="neighbors">
            {neighbors.map((neighbor) => (
                <Link className="neighbor__link" key={neighbor.id} to={`/neighbor/${neighbor.user_id}`}>
                {/* <Link className="neighbor__link" key={neighbor.id}  onClick={getNeighbor}> */}
                    {/* <Neighbor key={neighbor.id} neighbor={neighbor} /> */}
                    <Neighbor neighbor={neighbor} />
                </Link>

            ))}
        </div> 
        // :
        // <Navigate to="/" /> 
    )
}