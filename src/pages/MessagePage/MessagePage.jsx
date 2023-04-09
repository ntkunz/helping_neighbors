import "./MessagePage.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Neighbor from "../../Components/Neighbor/Neighbor";

export default function Message({ user, getNeighbor, neighbor, neighbors }) { 


const {id} = useParams(); 
const [receiver, setReceiver] = useState([]);
const [messages, setMessages] = useState([]);

useEffect(() => {
    setReceiver([])
    const receiverArray = neighbors.filter((neighbor) => neighbor.user_id === id);
    setReceiver(neighbors.find((neighbor) => neighbor.user_id === id));
}, [neighbors])

useEffect(() => {
    getMessages(user.user_id, id)
    console.log('receiver_id: ', receiver.user_id)
    console.log('user_id: ', id)
}, [receiver])

function sendMessage() {
    console.log("message sent");
}

function getMessages(senderId, receiverId) {
    axios
    .put(`http://localhost:8080/messages`, {
        senderId: senderId, 
        receiverId: receiverId
    })
    .then((response) => {
        console.log('gettin messages')
        console.log(response.data)
        setMessages(response.data)
    })
    .catch((error) => {
        console.log("error", error);
    });
}

return (
    <div className="message">
        <div className="message_receiver">
            <Neighbor neighbor={receiver} />
        </div>

        <div className="message__output">
            {messages.map((message) => message.message)}
            messages here
        </div>

        <div className="message__message">
            <form className="message__form" onSubmit={sendMessage}>
                <textarea type="text" name="message" placeholder="Insert your message here" />
            </form>
        </div>
    </div>
)


}