import "./MessagePage.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Neighbor from "../../Components/Neighbor/Neighbor";

export default function Message({ user, getNeighbor, neighbor, neighbors }) { 


const {id} = useParams(); 
const [receiver, setReceiver] = useState([]);

useEffect(() => {
    // setReceiver(neighbors.filter((neighbor) => neighbor.user_id === id))
    const receiverArray = neighbors.filter((neighbor) => neighbor.user_id === id);
    // const receiverArray = neighbors.filter((neighbor) => neighbor.user_id === id);
    // setReceiver(receiverArray[0]);
    setReceiver(neighbors.find((neighbor) => neighbor.user_id === id));
}, [])

// useEffect(() => {
    // getMessages(user.user_id, id)

// console.log('receiver_id: ', receiver[0].user_id)
// }, [receiver])

function sendMessage() {
    console.log("message sent");
}

return (
    <div className="message">
        <div className="message_receiver">
            <Neighbor neighbor={receiver} />
            neighbor goes here
        </div>

        <div className="message__message">
            <form className="message__form" onSubmit={sendMessage}>
                <textarea type="text" name="message" placeholder="Insert your message here" />
            </form>
        </div>
    </div>


)

}