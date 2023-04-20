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
		//eslint-disable-next-line
	}, [neighbors]);

	useEffect(() => {
		//only retrieve messages once receiver is set to avoid 400 error
		if (receiver.user_id) {
			getMessages(user.user_id, receiver.user_id);
			//set interval to retrieve messages every 2 seconds
			const messageInt = setInterval(() => {
				getMessages(user.user_id, receiver.user_id);
			}, 2000);
			//clear interval when component unmounts
			return () => {
				clearInterval(messageInt);
			};
		}
		//eslint-disable-next-line
	}, [receiver]);

	function sendMessage(e) {
		e.preventDefault();
		const message = document.querySelector(".message__input").value;
		if (message === "") {
			document.querySelector(".error").style.display = "inline-block";
			return;
		}
		document.querySelector(".error").style.display = "none";
		axios
			.post(`${api}/messages`, {
				senderId: user.user_id,
				receiverId: receiver.user_id,
				message: document.querySelector(".message__input").value,
			})
			.then((response) => {
				document.querySelector(".message__input").value = "";
			})
			.catch((error) => {
				console.log("error sending new message", error);
			});
	}

	function getMessages(senderId, receiverId) {
		axios
			.put(`${api}/messages`, {
				senderId: senderId,
				receiverId: receiverId,
			})
			.then((response) => {
				const sortedMessages = response.data.sort(function (x, y) {
					return y.unix_timestamp - x.unix_timestamp;
				});
				setMessages(sortedMessages);
			})
			.catch((error) => {
				console.log("error", error);
			});
		// setTimeout(()=>{getMessages(user.user_id, receiver.user_id)}, 2000);
	}

	return (
		<div className="message__container">
			<h1 className="message__title">
				{user.first_name}, message {receiver.first_name} to arrange a barter, or{" "}
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
							<p className="error">Message must not be blank</p>
						</form>
					</div>

					<div className="message__output">
						{messages.map((message) => (
							<div className="message__box" key={message.id}>
								{message.sender_id === user.user_id ? (
									<>
										<p className="message__info sent">
											Sent {dynamictimestamp(message.unix_timestamp)} by{" "}
											<span className="semibold">{user.first_name}</span>
										</p>
										<p className="message__text sent">{message.message}</p>
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
