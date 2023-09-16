import "./MessagePage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Neighbor from "../../components/Neighbor/Neighbor";
import dynamictimestamp from "../../utils/dynamictimestamp";
import purify from "../../utils/purify";

export default function Message({ user, neighbors }) {
	const api = process.env.REACT_APP_API_URL;
	const { id } = useParams();
	const [receiver, setReceiver] = useState([]);
	const [messages, setMessages] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorActive, setErrorActive] = useState(false);

	useEffect(() => {
		setReceiver(neighbors.find((neighbor) => neighbor.user_id === id));
		//eslint-disable-next-line
	}, [neighbors]);

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

	// TODO : Add proper error handling
	function sendMessage(e) {
		e.preventDefault();
		const message = e.target.message.value;

		if (message.trim() === "") {
			setErrorMessage("Please enter a message");
			setErrorActive(true);
			return;
		}
		setErrorActive(false);

		axios
			.post(
				`${api}/messages`,
				{
					senderId: user.user_id,
					receiverId: receiver.user_id,
					message: purify(message),
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			.then(() => {
				e.target.message.value = "";
			})
			.catch((error) => {
				setErrorMessage("Error sending message");
				setErrorActive(true);
			});
	}

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
							/>
							<button className='message__btn' type='submit'>
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
