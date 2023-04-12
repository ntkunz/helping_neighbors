import "./MessagePage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Neighbor from "../../Components/Neighbor/Neighbor";
import dynamictimestamp from "../../utils/dynamictimestamp";

export default function Message({ user, neighbors }) {

	const api = process.env.REACT_APP_API_URL;

	const { id } = useParams();
	
	const [receiver, setReceiver] = useState([]);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setReceiver(neighbors.find((neighbor) => neighbor.user_id === id));
	}, [neighbors]);

	useEffect(() => {
		getMessages(user.user_id, id);
	}, [receiver]);

	function sendMessage(e) {
		e.preventDefault();
		axios
			.post(`${api}/messages`, {
				senderId: user.user_id,
				receiverId: id,
				message: document.querySelector(".message__input").value,
			})
			.then((response) => {
				// console.log('message response :',response.data);
				getMessages(user.user_id, id);
				document.querySelector(".message__input").value = "";
			})
			.catch((error) => {
				console.log("error sending new message", error);
			});
	}

	function getMessages(senderId, receiverId) {
		// setInterval((
		axios
			.put(`${api}/messages`, {
				senderId: senderId,
				receiverId: receiverId,
			})
			.then((response) => {
				const sortedMessages = response.data.sort(function(x, y){
					return y.unix_timestamp - x.unix_timestamp;
				})
				setMessages(response.data);
			})
			.catch((error) => {
				console.log("error", error);
			});
		// ), 3000);
		// setTimeout(()=>{getMessages(senderId, receiverId)}, 2000)
	}


	return (
		<div className="message__container">
			<h1 className="message__title">
				Message {receiver.first_name} to arrange a barter, or{" "}
				<Link to="/neighbors" className="message__link">
					explore other neighbors
				</Link>
			</h1>
			<div className="message">
				<div className="message__receiver">
					<Neighbor neighbor={receiver} />
				</div>

				<div className="message__messages">
					<div className="message__message">
						<form className="message__form" onSubmit={sendMessage}>
							<textarea
								className="message__input"
								type="text"
								name="message"
								placeholder="Insert your message here"
							/>
							<button className="message__btn" type="submit">
								Send Message
							</button>
						</form>
					</div>

					<div className="message__output">
						<h3 className="message__neighbor">
							Messages with {receiver.first_name}
						</h3>
						{messages.map((message) => (
							<div className="message__box">
								{message.sender_id === user.user_id ? (
									<>
									<p className="message__text sent">{message.message}</p>
									<p className="message__info sent">
										Sent {dynamictimestamp(message.unix_timestamp)} by{" "}
										<span className="semibold">{user.first_name}</span>
									</p>
									</>
								) : (
									<>
									<p className="message__text received">{message.message}</p>
									<p className="message__info received">
										Sent {dynamictimestamp(message.unix_timestamp)} by{" "}
										<span className="semibold">{receiver.first_name}</span>
									</p>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
