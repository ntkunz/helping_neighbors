import "./NeighborsComponent.scss";
import Neighbor from "../Neighbor/Neighbor";

export default function NeighborsComponent({ neighbors }) {
    return (
        <div className="neighbors">
            {/* <h3 className="neighbors__header">neighbors</h3> */}

            <Neighbor />
            <Neighbor />
            <Neighbor />
        </div>
    )
}