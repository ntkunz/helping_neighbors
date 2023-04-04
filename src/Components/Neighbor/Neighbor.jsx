import "./Neighbor.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Neighbor({neighbor}) {

const [ response, setResponse ] = useState([]);

const [ Offering, setOffering ] = useState([]);
const [ exchange, setExchange ] = useState([]);

function getUserSkills() {
    axios
    .get(`http://localhost:8080/users/${neighbor.user_id}`)
    .then((response) => {
        console.log(response.data)
        setResponse(response.data);
        response.data.forEach((skill) => {
        if (skill.offer === 1) {
            setOffering(skill.skill);
            console.log(skill.skill)
        } else {
            setExchange(skill.skill);
            console.log(skill.skill)
        }})
    })
    .catch((error) => {
        console.log("error", error);
    });
};

useEffect(() => {
    getUserSkills();
    //eslint-disable-next-line
}, []);


console.log(response)
    // console.log(neighbor)
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
            {response.map((skills) => (
                <li className="neighbor__barter-skill">{skills.skill}</li>
            ))}

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