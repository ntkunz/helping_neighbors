import "./Dashboard.scss";
import DashUserInfo from "../../Components/Dashboard/DashUserInfo";
import DashNeighbors from "../../Components/Dashboard/DashNeighbors";


export default function Dashboard() {
    return ( 
        <div className="dashboard">
            <DashNeighbors className="dashboard__neighbors"/>
            <DashUserInfo />
        </div>

    )
}
