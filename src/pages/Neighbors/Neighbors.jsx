import "./Neighbors.scss";
import Neighbor from "../../components/Neighbor/Neighbor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchNeighbors from "../../utils/fetchNeighbors";

export default function Neighbors({
	loggedIn,
	setLoggedIn,
	user,
	setUser,
	neighbors,
	setNeighbors,
	token,
}) {
	const navigate = useNavigate();

	useEffect(() => {
		if (user.email) {
			fetchNeighbors()
				.then((neighbors) => {
					setNeighbors(neighbors);
					setLoggedIn(true);
				})
				.catch(() => navigate("/"));
		} else {
			navigate("/");
		}
		// eslint-disable-next-line
	}, [user]);

	if (!loggedIn) {
		return null;
	} else if (neighbors.length < 2) {
		return (
			<div className='neighbors__container'>
				<h1 className='neighbors__title'>
					Welcome to Helping Neighbors {user.first_name}
				</h1>
				<main className='neighbors--alt'>
					<Neighbor key={neighbors[0].user_id} neighbor={neighbors[0]} loggedInUser={user.user_id} />
					<div className="neighbors__alt-text">
						<h2 className='neighbors__subtitle'>
							You do not currently have any neighbors using the site. Please
							spread the word!
						</h2>
						<p className='neighbors__tip'>
							Tip: Edit your address in the profile tab to be within 1/2 kilometer
							of 455 Granville St, Vancouver, BC to see some test users
						</p>
						<p className='neighbors__paragraph'>
							There are many benefits to connecting with neighbors, which you know
							since you're here. I'd suggest you let people at the local cafe or
							shops know about the site, mention it to neighbors in passing, or
							share the site on local social media groups.
						</p>
						<p className='neighbors__paragraph'>
							This may help get your neighbors involved so that everyone around
							you can benefit.{" "}
						</p>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className='neighbors__container'>
			<h1 className='neighbors__title'>
				Welcome {user.first_name}, click a neighbor's card to message them and
				arrange a barter
			</h1>

			<div className='neighbors'>
				{neighbors.map((neighbor) => (
					<Neighbor key={neighbor.user_id} neighbor={neighbor} />
				))}
			</div>
		</div>
	);
}
