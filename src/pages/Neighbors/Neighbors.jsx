import "./Neighbors.scss";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Link } from "react-router-dom";

export default function Neighbors({ neighbors, user }) {
	if (!neighbors.length) {
		return (
			<div className="neighbors__container--alt">
				<h1 className="neighbors__title">
					Welcome to the Helping Neighbors site {user.first_name}
				</h1>
				<h2 className="neighbors__subtitle">
					You do not currently have any neighbors using the site. Please spread
					the word!
				</h2>
				<p>Tip: Edit your address in the profile tab to be within 1/2 kilometer of 455 Granville St, Vancouver, BC to see some test users</p>
				<p>There are many benefits to connecting with neighbors, which you know since you're here. I'd suggest 
					you let people at the local cafe or shops know about the site, mention it to neighbors in passing, or share 
					the site on local social media groups. 
				</p>
				<p>This may help get your neighbors involved so that everyone around you can benefit. </p>
				<p>If you'd like to see the site in action before you put the work in, you can edit your profile address to 
					be within 1/2 kilometer of 455 Granville St, Vancouver, BC to see some test users.
				</p>
			</div>
		);
	}

	return (
		<div className="neighbors__container">
			<h1 className="neighbors__title">
				Welcome {user.first_name}, click a neighbor's card to message them and
				arrange a barter
			</h1>

			<div className="neighbors">
				{neighbors.map((neighbor) => (
				<Link
					className="neighbor__link"
					key={neighbor.user_id}
					to={`/neighbor/${neighbor.user_id}`}
				>
					<Neighbor key={neighbor.user_id} neighbor={neighbor} />
				</Link>
				))}
			</div>
		</div>
	);
}
