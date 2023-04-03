import "./Messages.scss";
import MessagesCommponent from "../../Components/MessagesComponent/MessagesComponent";

export default function Messages({ loggedIn }) { 
    return (
        {loggedIn && <MessagesComponent />}
    )
}