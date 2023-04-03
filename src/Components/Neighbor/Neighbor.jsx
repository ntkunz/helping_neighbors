import "./Neighbor.scss"

export default function Neighbor({neighbor}) {

    console.log(neighbor)
return (
    <div className="neighbor">
        
        <div className="neighbor__header">
            <div className="neighbor__title">
                <h4>{neighbor.first_name}</h4>
                <p className="neighbor__member-since">Member Since <span className="neighbor__since">{neighbor.created_at}</span></p>
            </div>
            <div className="neighbor__img"></div>
        </div>

        <div className="neighbor__bio">
        <p className="neighbor__barter-title">Offering</p>
        <ul className="neighbor__barter-skills">
            <li className="neighbor__barter-skill">Maintenance</li>
            <li className="neighbor__barter-skill">Mechanical</li>
        </ul>
        </div>

         <div className="neighbor__bio">
        <p className="neighbor__barter-title">In Exchange For</p>
        <ul className="neighbor__barter-skills">
            <li className="neighbor__barter-skill">Cooking</li>
            <li className="neighbor__barter-skill">Pet Sitting</li>
            <li className="neighbor__barter-skill">Running Errands</li>
        </ul>
        </div>


          <div className="neighbor__bio">
        <p className="neighbor__barter-title">Contact</p>
            <p className="neighbor__barter-skill">{neighbor.email}</p>
        </div>

         {/* <button className="neighbor__message-btn">Send a Message</button> */}
    </div>
)
}
