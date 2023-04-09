import "./Neighbors.scss";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Link } from "react-router-dom";

export default function Neighbors({ neighbors }) {

// const api = process.env.REACT_APP_API_URL;


    return (
        // neighbors.length && loggedIn ? 
        <div className="neighbors">
            {/* {neighbors === [] ?  */}
            {neighbors.map((neighbor) => (
                <Link className="neighbor__link" key={neighbor.id} to={`/neighbor/${neighbor.user_id}`}>
                    <Neighbor neighbor={neighbor} />
                </Link>
            ))}
            {/* : <h3 className="neighbors__empty">There are no neighbors near you using the app. Please spread the word!</h3>} */}
        </div> 

    )
}