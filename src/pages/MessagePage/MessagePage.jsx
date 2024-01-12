import "./MessagePage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Neighbor from "../../components/Neighbor/Neighbor";
import dynamictimestamp from "../../utils/dynamictimestamp";
import purify from "../../utils/purify";

export default function Message({ user, neighbors, socket }) {

	const { id } = useParams();
	const [receiver, setReceiver] = useState([]);
	const [messages, setMessages] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorActive, setErrorActive] = useState(false);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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
		//eslint-disable-next-line
	}, [receiver]);

	function sendMessage(e) {
		// below to prevent form submit, if needed
		if (e && e.preventDefault) {
			e.preventDefault();
		}

		if (message.trim() === "") {
			setErrorMessage("Please enter a message");
			setErrorActive(true);
			return;
		}
		setErrorActive(false);

		//disable form while sending
		setIsLoading(true);

		const messageToSend = {
			senderId: user.user_id,
			receiverId: receiver.user_id,
			message: purify(message),
		}

		socket.emit("sendMessageToApi", messageToSend);
		setIsLoading(false);
		setMessage("");
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
