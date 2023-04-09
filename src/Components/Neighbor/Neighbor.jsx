import "./Neighbor.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Neighbor({neighbor}) {

// const [ response, setResponse ] = useState([]);

const [ offering, setOffering ] = useState([]);
const [ exchange, setExchange ] = useState([]);
const [ strDate, setStrDate ] = useState("");

function getUserSkills() {
    axios
    .get(`http://localhost:8080/users/skills/${neighbor.user_id}`)
    .then((response) => {
        const offeringSkills = [];
        const exchangeSkills = [];
        response.data.forEach((skill) => {
            if (skill.offer === 1) {
                offeringSkills.push(skill.skill);
            } else {
                exchangeSkills.push(skill.skill);
        }})
        console.log('gettin neighbor skills')
        setStrDate(neighbor.created_at.substring(0, 10));
        setOffering(offeringSkills);
        setExchange(exchangeSkills);
    })
    .catch((error) => {
        console.log("error", error);
    });
};

useEffect(() => {
    getUserSkills();
    //eslint-disable-next-line
}, [neighbor]);


return (
    <div className="neighbor">
        
        <div className="neighbor__header">
            <div className="neighbor__title">
                <h3>{neighbor.first_name}</h3>
                <p className="neighbor__member-since">Member Since</p> 
                <p className="neighbor__since">{strDate}</p>
            </div>
            <div className="neighbor__img-box"><img className="neighbor__img" src={neighbor.image_url} alt="user profile" /></div>
            
        </div>

        <div className="neighbor__bio">
        <p className="neighbor__barter-title">Offering</p>
        <ul className="neighbor__barter-skills">
            {offering.length && offering.map((offer) => (
                <li className="neighbor__barter-skill semibold">-{offer}</li>
            ))}
        </ul>
        </div>

         <div className="neighbor__bio">
        <p className="neighbor__barter-title">In Exchange For</p>
        <ul className="neighbor__barter-skills">
            {exchange.length && exchange.map((want) => (
                <li className="neighbor__barter-skill semibold">-{want}</li>
            ))}
        </ul>
        </div>

        <div className="neighbor__bio">
        <p className="neighbor__barter-title">About</p>
            <p className="neighbor__barter-skill">{neighbor.about}</p>
        </div>

        <div className="neighbor__bio">
            <p className="neighbor__barter-title">Contact</p>
            <p className="neighbor__barter-skill semibold">{neighbor.email}</p>
        </div>

         {/* <button className="neighbor__message-btn">Send a Message</button> */}
    </div>
)
}