//CURRENTLY DISABLED UNTIL I REFACTOR TO ADD ALERTS OF NEW MESSAGES//
//TODO: Add alerts for new messages and re-design ui of this page

import "./MessagersPage.scss";
import { Link } from "react-router-dom";

export default function MessagersPage({ neighbors }) {
	const api = process.env.REACT_APP_API_URL;

	if (!neighbors.length) {
		return (
			<div className="messager--alt">
				<h1 className="messager__title">
					Bummer, you currently have no neighbors currently utilizing the site
				</h1>
				<Link to="/neighbors" className="messager__link">
					Back to the neighbors page for suggestions
				</Link>
			</div>
		);
	}

	return (
		<div className="messager">
			<h1 className="messager__title">
				Message a neighbor to arrange a barter, or{" "}
				<Link to="/neighbors" className="messager__link">
					explore other neighbors
				</Link>
			</h1>
			<div className="messager__list">
				{neighbors.map((neighbor) => (
					<div className="messager__neighbor" key={neighbor.user_id}>
						<Link
							to={`/neighbor/${neighbor.user_id}`}
							className="messager__neighbor-link"
						>
							Message {neighbor.first_name}
							{neighbor.image_url === "hassan-rafhaan--unsplash.jpg" ? (
								<img
									src={`${api}/${neighbor.image_url}`}
									alt="default user profile"
									className="messager__neighbor-img"
								/>
							) : (
								<img
									src={`${api}/${neighbor.image_url}`}
									alt="user profile"
									className="messager__neighbor-img"
								/>
							)}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
