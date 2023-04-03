import "./Neighbors.scss";
import NeighborsComponent from "../../Components/NeighborsComponent/NeighborsComponent";
import { Navigate } from "react-router-dom";

export default function Neighbors({loggedIn}) {
    return (
        loggedIn ? 
        <div className="neighbors">
            <NeighborsComponent />
        </div> :
        <Navigate to="/" /> 
    )
}