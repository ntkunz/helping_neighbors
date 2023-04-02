import "./MessagesComponent.scss";
import Message from "../Message/Message";


export default function MessagesCommponent() {
    return(
        <div className="messages">
            {/* <h3 className="messages__title">Messages</h3> */}

            <div className="messages__container">
                <Message />
                <Message />
                <Message />
            </div>
        </div>
    )
}   