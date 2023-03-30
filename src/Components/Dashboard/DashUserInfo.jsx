import userImg from '../../assets/images/user-images/Bart_Simpson_200px.png';
export default function DashUserInfo() {
    return(
        <div className="container">
            <h2 className="dash_user-name">Bart Simpson</h2>
            <img src={userImg} alt="Bart Profile" className="dash__user-img" />
            <p className="dash_user-about">`My name is Bart, and I've lived in the neighborhood
            for all of my life. I like to skateboard and paint graffiti (sorry if I've tagged your 
            place before). I'm excited to help with any maintenance around your place
             in exchange for baked goods.</p>
             <p className="dash__user-status active">People in my neighborhood can see me</p>
        </div>
    )
}