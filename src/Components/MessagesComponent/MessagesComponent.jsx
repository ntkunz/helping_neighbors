import "./MessagesComponent.scss";
import Message from "../Message/Message";
import { NavLink } from "react-router-dom";

export default function MessagesCommponent( { loggedIn }) {
    return(
        <div className="messages">
            {/* <h3 className="messages__title">Messages</h3> */}

            <div className="messages__container">
                <Message />
                <Message />
                <Message />
            </div>
            <NavLink to="/messages" className="messages__link"><button  className="messages__btn">All Messages</button></NavLink>
        </div>
    )
}   