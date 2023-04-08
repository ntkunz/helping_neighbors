import "./LoginPage.scss";
import { Link } from "react-router-dom";

export default function LoginPage({ handleLogin }) {
    return (

        <div className="login">

            <div className="login-info">
                <div className="login-info__qa">
                    <h2 className="login-info__quest">Why Helping Neighbors?</h2>
                    {/* <p className="login-info__answer">Helping Neighbors is a way to connect with people around you interested in exchanging skills and experiences. We believe that a sharing, connected neighborhood has many benefits for everyone's health, safety, and sense of purpose.</p> */}
                    <p className="login-info__answer">Offering your skills to neighbors can be a great way to connect with people in your community who need help with something that you're skilled in. You can also encourage your neighbors to share their skills and expertise, creating a community where everyone contributes and benefits. This can not only help your neighbors but also create a sense of belonging, safety, and mutual support within your community.</p>
                    {/* <p className="login-info__answer">Joining Helping Neighbors can help you save money and build strong community connections. Through bartering your skills or services with your neighbors, you can get things done without spending any money and without having to leave your community.</p> */}
                    {/* <p className="login-info__answer">This process can be a fun and fulfilling way to connect with people who share similar interests and skills. Additionally, bartering can also help you develop new skills and expand your knowledge base, as you learn from your neighbors and share your own expertise. Overall, participating in a bartering community is an excellent way to save money, build connections, and expand your skillset.</p> */}
                </div>
            </div>

            <div className="login-info">
                <div className="login-info__qa">
                    <h2 className="login-info__quest">Get Involved</h2>
                    {/* <p className="login-info__answer">Let your neighbors know what you could use some help with and what you have to offer in exchange. You will be able to see other neighbors using the app based off of your address, arrange an exchange, and have some fun in the process.</p> */}
                    <p className="login-info__answer">Identify your skills and think about how they can benefit your neighbors. For example, if you have experience in gardening, you could offer to help your neighbors with their garden or give them tips on how to grow their own vegetables. Similarly, if you're skilled in carpentry, you could offer to help with repairs or build something for a neighbor who needs it.</p>
                    {/* <p className="login-info__answer">Offering your skills to neighbors can be a great way to connect with people in your community who need help with something that you're skilled in. You can also encourage your neighbors to share their skills and expertise, creating a community where everyone contributes and benefits. This can not only help your neighbors but also create a sense of belonging, safety, and mutual support within your community.</p> */}
                </div>
            </div>


            <div className="login-form">
                <form className="login-form" onSubmit={handleLogin} method="post">
                    <p className="login-form__label">Email</p>
                    <input type="text" className="login-form__input" name="email" placeholder="your email@something.com" />    
                    <p className="login-form__label">Password</p>
                    <input type="password" className="login-form__input" name="password" />    
                    <button className="login-form__btn">Submit</button>
                    <Link className="login-form__btn signup" to="/signup">Sign Up</Link>
                </form>
            </div>
        </div>
    );
}