import "./Neighbors.scss";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Neighbors({ neighbors, user }) {

// useEffect(() => {
// 	getUserSkills();
// }, [user]);

const api = process.env.REACT_APP_API_URL;


	// added 4/25 to attempt to rtrieve all neighbors in one call
		//get the skills of the neighbor *later pass this up to where retrieving the neighbors
		// function getUserSkills() {
		// 	axios
		// 		.post(`${api}/users/skills/`, { user })
		// 		.then((response) => {
		// 			console.log("response in getNeighbors call", response.data)


		// 			// const offeringSkills = [];
		// 			// const exchangeSkills = [];
		// 			// response.data.forEach((skill) => {
		// 			// 	if (skill.offer === 1) {
		// 			// 		offeringSkills.push(skill.skill);
		// 			// 	} else {
		// 			// 		exchangeSkills.push(skill.skill);
		// 			// 	}
		// 			// });
		// 			// //format date of neighbor creation
		// 			// setStrDate(neighbor.created_at.substring(0, 10));
		// 			// setOffering(offeringSkills);
		// 			// setExchange(exchangeSkills);
		// 		})
		// 		.catch((error) => {
		// 			console.log("error getting user skills", error);
		// 		});
		// }
	


	return (
		<div className="neighbors__container">
			<h1 className="login__title">
				Welcome {user.first_name}, click a neighbor's card to message them and
				arrange a barter
			</h1>

			<div className="neighbors">
				{neighbors.length > 0 ? (
					neighbors.map((neighbor) => (
						<Link
							className="neighbor__link"
							key={neighbor.user_id}
							to={`/neighbor/${neighbor.user_id}`}
						>
							<Neighbor key={neighbor.user_id} neighbor={neighbor} />
						</Link>
					))
				) : (
					<h2 className="neighbors__empty">
						There are no neighbors near you using the app. Please spread the
						word!
					</h2>
				)}
			</div>
		</div>
	);
}
