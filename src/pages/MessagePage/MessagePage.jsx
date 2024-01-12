import "./MessagePage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Neighbor from "../../components/Neighbor/Neighbor";
import dynamictimestamp from "../../utils/dynamictimestamp";
import purify from "../../utils/purify";
// import { socket } from "../../socket";
// import io from 'socket.io-client';

export default function Message({ user, neighbors, socket }) {

	// TODO: Send only neighbor whose id is clicked from Neighbors page

	const api = process.env.REACT_APP_API_URL;
	const { id } = useParams();
	const [receiver, setReceiver] = useState([]);
	const [messages, setMessages] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorActive, setErrorActive] = useState(false);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// const [isConnected, setIsConnected] = useState(socket.connected);

	// const socket = useRef(null);

	useEffect(() => {
		setReceiver(neighbors.find((neighbor) => neighbor.user_id === id));
		//eslint-disable-next-line
	}, [neighbors]);

	useEffect(() => {
		if (receiver.user_id) {
			socket.emit("joinRoom", user.user_id, receiver.user_id); // joinRoom
			socket.on("conversation", (messages) => {
				const sortedMessages = messages.sort(function (a, b) {
					return b.unix_timestamp - a.unix_timestamp;
				});
				setMessages(sortedMessages);
			})
		}
		return () => {
			socket.off("conversation");
		}
	}, [receiver]);

	// TESTING: This below works to send message through socket
	// now updateing to work with socketio docs and their react best practices

	// TESTING: V2 
	// below works, logging the response to the console
	// now trying to have it retrieve all messages for those users from the 
	// database on load and whenever updated

	// useEffect(() => {
	// 	socket.on("sendResponseToClient", (response) => {
	// 		console.log('sendResponseToClient', response);
	// 		// setIsLoading(false);
	// 	})
	// 	return () => {
	// 		socket.off("sendResponseToClient");
	// 	}
	// }, []);



	// useEffect(() => {
	// 	if (receiver.user_id) {
	// 		getMessages(user.user_id, receiver.user_id);
	// 		//set interval to retrieve messages every 2 seconds
	// 		//TESTING: belowturned off for socket test
	// 		// const messageInt = setInterval(() => {
	// 		// 	getMessages(user.user_id, receiver.user_id);
	// 		// }, 2000);
	// 		// return () => {
	// 		// 	clearInterval(messageInt);
	// 		// };
	// 	}
	// 	//eslint-disable-next-line
	// }, [receiver]);

	function sendMessage(e) {
		// console.log('e', e)
		if (e && e.preventDefault) {
			e.preventDefault();
		}

		setIsLoading(true);
		// setFooEvents(previous => [...previous, value]);

		const messageToSend = {
			senderId: user.user_id,
			receiverId: receiver.user_id,
			message: purify(message),
		}

		// socket.emit("sendMessageToApi", {
		// 	senderId: user.user_id,
		// 	receiverId: receiver.user_id,
		// 	message: purify(message),
		// }, (receiveMessage) => {
		socket.emit("sendMessageToApi", messageToSend);
		// setMessages([...messages, messageToSend]);
		setIsLoading(false);
		setMessage("");
	}

	// function receiveMessage(receivedMessage) {
	// 	console.log('Received Message: ', receivedMessage)
	// }


	// TODO : Add proper error handling
	// function sendMessage(e) {
	// 	e.preventDefault();
	// 	const message = e.target.message.value;

	// 	if (message.trim() === "") {
	// 		setErrorMessage("Please enter a message");
	// 		setErrorActive(true);
	// 		return;
	// 	}
	// 	setErrorActive(false);

	// 	// TESTING: 
	// 	// send with socket rather than with axios
	// 	socket.current.emit("sendMessage", {
	// 		senderId: user.user_id,
	// 		receiverId: receiver.user_id,
	// 		message: purify(message),
	// 	})

	// 	// axios
	// 	// 	.post(
	// 	// 		`${api}/messages`,
	// 	// 		{
	// 	// 			senderId: user.user_id,
	// 	// 			receiverId: receiver.user_id,
	// 	// 			message: purify(message),
	// 	// 		},
	// 	// 		{
	// 	// 			headers: {
	// 	// 				"Content-Type": "application/json",
	// 	// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 	// 			},
	// 	// 		}
	// 	// 	)
	// 	// 	.then(() => {
	// 	e.target.message.value = "";
	// 	// })
	// 	// .catch((error) => {
	// 	// 	setErrorMessage("Error sending message");
	// 	// 	setErrorActive(true);
	// 	// });
	// }

	// function getMessages(senderId, receiverId) {
	// 	axios
	// 		.put(
	// 			`${api}/messages`,
	// 			{
	// 				senderId: senderId,
	// 				receiverId: receiverId,
	// 			},
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 				},
	// 			}
	// 		)
	// 		.then((response) => {
	// 			const sortedMessages = response.data.sort(function (x, y) {
	// 				return y.unix_timestamp - x.unix_timestamp;
	// 			});
	// 			setMessages(sortedMessages);
	// 		})
	// 		.catch((error) => {
	// 			setErrorMessage("Error getting messages");
	// 			setErrorActive(true);
	// 		});
	// }

	return (
		<div className='message__container'>
			<h1 className='message__title'>
				{user.first_name}, message {purify(receiver.first_name)} to arrange a
				barter, or{" "}
				<Link to='/' className='message__link'>
					explore other neighbors
				</Link>
			</h1>
			<div className='message'>
				{/* ternary to allow update once receiver set and display card */}
				{receiver.user_id && (
					<div className='message__receiver'>
						<Neighbor neighbor={receiver} />
					</div>
				)}

				<div className='message__messages'>
					<div className='message__message'>
						<form className='message__form' onSubmit={sendMessage}>
							<textarea
								className='message__input'
								type='text'
								name='message'
								placeholder='Insert your message here'
								value={message}
								onChange={e => setMessage(e.target.value)}
							/>
							<button className='message__btn' type='submit' disabled={isLoading}>
								Send Message
							</button>
							{errorActive && <p className='message__error'>{errorMessage}</p>}
						</form>
					</div>

					<div className='message__output'>
						{messages.map((message) => (
							<div className='message__box' key={message.id}>
								{message.sender_id === user.user_id ? (
									<>
										<p className='message__info sent'>
											Sent {dynamictimestamp(message.unix_timestamp)} by{" "}
											<span className='semibold'>{user.first_name}</span>
										</p>
										<p className='message__text sent'>
											{purify(message.message)}
										</p>
									</>
								) : (
									<>
										<p className='message__text received'>
											{purify(message.message)}
										</p>
										<p className='message__info received'>
											Sent {dynamictimestamp(message.unix_timestamp)} by{" "}
											<span className='semibold'>{receiver.first_name}</span>
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
