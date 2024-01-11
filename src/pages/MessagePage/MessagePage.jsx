import "./MessagePage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Neighbor from "../../components/Neighbor/Neighbor";
import dynamictimestamp from "../../utils/dynamictimestamp";
import purify from "../../utils/purify";
import { socket } from "../../socket";
// import io from 'socket.io-client';

export default function Message({ user, neighbors }) {

	// TODO: Send only neighbor whose id is clicked from Neighbors page

	const api = process.env.REACT_APP_API_URL;
	const { id } = useParams();
	const [receiver, setReceiver] = useState([]);
	const [messages, setMessages] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorActive, setErrorActive] = useState(false);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [isConnected, setIsConnected] = useState(socket.connected);

	// const socket = useRef(null);

	useEffect(() => {
		setReceiver(neighbors.find((neighbor) => neighbor.user_id === id));
		//eslint-disable-next-line
	}, [neighbors]);

	// TESTING: This below works to send message through socket
	// now updateing to work with socketio docs and their react best practices

	// useEffect(() => {
	// 	// const socket = io(`${api}/messages`, {
	// 	// const socket = io(`ws://localhost:8080`, {
	// 	socket.current = io(`ws://localhost:8080`, {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 		},
	// 		withCredentials: true,
	// 		// path: `/messages`,
	// 	}); // Replace 'api' with your server's Socket.IO endpoint

	// 	// socket.current.on("connect", () => {
	// 	// 	socket.emit("join", {
	// 	// 		user_id: user.user_id,
	// 	// 		receiver_id: receiver.user_id,
	// 	// 	});
	// 	// })
	// 	// Add event listeners and emit events as needed


	// 	return () => {
	// 		socket.current.disconnect(); // Clean up the socket connection when the component unmounts
	// 	};
	// }, []);

	// TESTING: V2
	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('sendMessage', sendMessage);
		socket.on('receiveMessage', (messageData) => {
			console.log('Received message:', messageData);
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('sendMessage', sendMessage);
			socket.off('receiveMessage', receiveMessage);
		};
	}, []);


	useEffect(() => {
		if (receiver.user_id) {
			getMessages(user.user_id, receiver.user_id);
			//set interval to retrieve messages every 2 seconds
			const messageInt = setInterval(() => {
				getMessages(user.user_id, receiver.user_id);
			}, 2000);
			return () => {
				clearInterval(messageInt);
			};
		}
		//eslint-disable-next-line
	}, [receiver]);

	function sendMessage(e) {
		e.preventDefault();
		setIsLoading(true);
		// setFooEvents(previous => [...previous, value]);

		socket.emit("sendMessage", {
			senderId: user.user_id,
			receiverId: receiver.user_id,
			message: purify(message),
		}, (received) => {
			console.log('received', received);
		})
		setIsLoading(false);
		setMessage("");
	}

	function receiveMessage(receivedMessage) {
		console.log('Received Message: ', receivedMessage)
	}


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

	function getMessages(senderId, receiverId) {
		axios
			.put(
				`${api}/messages`,
				{
					senderId: senderId,
					receiverId: receiverId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			.then((response) => {
				const sortedMessages = response.data.sort(function (x, y) {
					return y.unix_timestamp - x.unix_timestamp;
				});
				setMessages(sortedMessages);
			})
			.catch((error) => {
				setErrorMessage("Error getting messages");
				setErrorActive(true);
			});
	}

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
