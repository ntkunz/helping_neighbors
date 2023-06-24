import "./Neighbor.scss";
import { useEffect, useState } from "react";

export default function Neighbor({ neighbor }) {
	const api = process.env.REACT_APP_API_URL;

	const [offering, setOffering] = useState([]);
	const [exchange, setExchange] = useState([]);
	const [strDate, setStrDate] = useState("");

	//set information to neighbor card
	useEffect(() => {
		const offeringSkills = [];
		const exchangeSkills = [];
		//sort offers and desires from neighbor.barters object
		Object.keys(neighbor.barters).forEach((key) => {
			if (neighbor.barters[key] === 1) {
				offeringSkills.push(` ${key}`);
			} else {
				exchangeSkills.push(` ${key}`);
			}
		});
		//format date of neighbor creation
		setStrDate(neighbor.created_at.substring(0, 10));
		setOffering(offeringSkills);
		setExchange(exchangeSkills);
		//eslint-disable-next-line
	}, [neighbor]);

	return (
		<>
			{strDate !== "" ? (
				<div className="neighbor">
					<div className="neighbor__header">
						<div className="neighbor__title">
							<h3>{neighbor.first_name}</h3>
							<p className="neighbor__member-since">Member Since</p>
							<p className="neighbor__since">{strDate}</p>
						</div>
						<div className="neighbor__img-box">
							{/* if neighbor.image_url is default then src does not have api before it, else it does */}
							{neighbor.image_url === "https://source.unsplash.com/featured" ? (
								<img
									id="neighbor__img"
									className="neighbor__img"
									src={`${neighbor.image_url}`}
									alt="default user profile"
								/>
							) : (
								<img
									id="neighbor__img"
									className="neighbor__img"
									src={`${api}/${neighbor.image_url}`}
									alt="user profile"
								/>
							)}
						</div>
					</div>

					<div className="neighbor__bio">
						<p className="neighbor__barter-title">Offering</p>
						<ul className="neighbor__barter-skills">
							{offering.length &&
								offering.map((offer) => (
									<li className="neighbor__barter-skill semibold" key={offer}>
										-{offer}
									</li>
								))}
						</ul>
					</div>

					<div className="neighbor__bio">
						<p className="neighbor__barter-title">In Exchange For</p>
						<ul className="neighbor__barter-skills">
							{exchange.length &&
								exchange.map((want) => (
									<li className="neighbor__barter-skill semibold" key={want}>
										-{want}
									</li>
								))}
						</ul>
					</div>

					<div className="neighbor__bio">
						<p className="neighbor__barter-title semibold">About</p>
						<p className="neighbor__barter-skill">{neighbor.about}</p>
					</div>
				</div>
			) : (
				<div className="neighbor__placeholder"></div>
			)}
		</>
	);
}
