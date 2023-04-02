import userImg from '../../assets/images/user-images/Bart_Simpson_200px.png';
import { useEffect } from 'react';
import axios from 'axios';

export default function DashUserInfo() {


useEffect(() => {

    const api = process.env.REACT_APP_API_URL;
            axios
              .get(`${api}/`)
            //   .get(`http://localhost:8080/`)
              .then((data) => {
                if (data) {
                  console.log(data.data);
                }
              })
              .catch((err) => {
                console.log("err: ", err);
              });
    }, [])

    
    return(
        <div className="dash__user-container">
            <h2 className="dash__user-name">Bart Simpson</h2>
            <img src={userImg} alt="Bart Profile" className="dash__user-img" />
            <p className="dash__user-about">`My name is Bart, and I've lived in the neighborhood
            for all of my life. I like to skateboard and paint graffiti (sorry if I've tagged your 
            place before). I'm excited to help with any maintenance around your place
             in exchange for baked goods.</p>
             <p className="dash__user-status active">People in my neighborhood can see me</p>
        </div>
    )
}