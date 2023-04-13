import "./MessagersPage.scss";
import { Link } from "react-router-dom";



export default function MessagersPage({ neighbors }) {

	const imgUrl = process.env.REACT_APP_IMG_URL;

    return (
        <div className="Messager">
        <h1 className="messager__title">
            Message a neighbor to arrange a barter, or{" "}
            <Link to="/neighbors" className="messager__link">
                explore other neighbors
            </Link>
        </h1>
        <div className="messager__list">


            {neighbors.map((neighbor) => (
                <div className="messager__neighbor">
                    <Link
                        to={`/neighbor/${neighbor.user_id}`}
                        className="messager__neighbor-link"
                    >
                        Message {neighbor.first_name}
                        <img
                            src={`${imgUrl}${neighbor.image_url}`}
                            alt="random user profile picture"
                            className="messager__neighbor-img"
                        />
                    </Link>
                </div>
            ))}

            
        </div>
    </div>
    )
}