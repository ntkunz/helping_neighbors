import "./Dashboard.scss";
import UserInfoComponent from "../../Components/UserInfoComponent/UserInfoComponent";
import NeighborsComponent from "../../Components/NeighborsComponent/NeighborsComponent";
import MessagesComponent from "../../Components/MessagesComponent/MessagesComponent";


export default function Dashboard() {
    return ( 
        <div className="dashboard">
            <div className="dashboard__messages">
                <MessagesComponent />
            </div>
            <div className="dashboard__neighbors">
                <NeighborsComponent />
            </div>
        </div>

    )
}
