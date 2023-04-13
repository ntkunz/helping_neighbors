import "./Neighbors.scss";
import Neighbor from "../../Components/Neighbor/Neighbor";
import { Link } from "react-router-dom";

export default function Neighbors({ neighbors, user }) {

	return (
		// neighbors.length && loggedIn ?

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
						key={neighbor.id}
						to={`/neighbor/${neighbor.user_id}`}
					>
						<Neighbor neighbor={neighbor} />
					</Link>
				))
				) : <h2 className="neighbors__empty">There are no neighbors near you using the app. Please spread the word!</h2>} 
			</div>
		</div>
	);
}
