import "./Footer.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/icons/close-24px.svg";

export default function Footer() {
	const [about, setAbout] = useState(false);
	const [terms, setTerms] = useState(false);
	const [contact, setContact] = useState(false);

	//hide or display footer informations functions
	function handleAbout(e) {
		e.preventDefault();
		setAbout(!about);
		setTerms(false);
		setContact(false);
	}

	function handleTerms(e) {
		e.preventDefault();
		setTerms(!terms);
		setAbout(false);
		setContact(false);
	}

	function handleContact(e) {
		e.preventDefault();
		setContact(!contact);
		setAbout(false);
		setTerms(false);
	}

	return (
		<div className="footer">
			{about && (
				<Link className="footer__info" onClick={handleAbout}>
					<div className="footer__section">
						<img
							className="footer__icon"
							src={closeIcon}
							alt="icon to close footer informaion"
						/>
						<p className="footer__paragraph first-paragraph">
							There are many reasons why being a helping neighbor feels good,
							and just as many reasons why having helping neighbors nearby will
							help you feel safe connected.
						</p>

						<p className="footer__paragraph">
							Knowing your neighbors can provide numerous health benefits, such
							as increased social support, which has been linked to better
							mental health, and increased physical activity, which can improve
							cardiovascular health, energy levels, and reduce the risk of
							chronic health conditions. Additionally, spending time outdoors
							with your neighbors can provide a mental health boost, as exposure
							to nature has been linked to reduced stress and improved mood.
							Moreover, promoting a safer and more secure neighborhood can
							contribute to better overall health outcomes by reducing stress
							and anxiety related to safety concerns, and promoting a sense of
							wellbeing and security within the community. Therefore, building
							friendly relationships with your neighbors can provide a variety
							of health benefits that can contribute to a healthier and happier
							lifestyle.
						</p>
					</div>
				</Link>
			)}

			{terms && (
				<Link className="footer__info" onClick={handleTerms}>
					<div className="footer__section">
						<img
							className="footer__icon"
							src={closeIcon}
							alt="icon to close footer informaion"
						/>
						<p className="footer__paragraph first-paragraph">
							We are excited to provide a platform for our neighbors to connect
							and exchange services
						</p>
						<p className="footer__paragraph">
							This website facilitates the initial introduction between you and
							your neighbors nearby. We encourage all users to engage with one
							another respectfully and to build positive relationships within
							the community. Please be considerate of others and conduct
							yourself in a neighborly and friendly manner when communicating
							through the website. Remember, the purpose of this platform is to
							foster a sense of community, safety, and togetherness, so let's
							work together to create a positive and welcoming environment for
							everyone. This is your neighborhood. By using this site you agree
							to be a respectful person to all users of this website, both
							online and in real life. Enjoy meeting your neighbors and building
							a strong and supportive community!
						</p>
					</div>
				</Link>
			)}

			{contact && (
				<Link className="footer__info" onClick={handleContact}>
					<div className="footer__section">
						<img
							className="footer__icon"
							src={closeIcon}
							alt="icon to close footer informaion"
						/>
						<p className="footer__paragraph first-paragraph">
							Thank you for having a desire to build a better world through
							human connecntion and bartering!
						</p>
						<p className="footer__paragraph">
							If you'd like to get ahold of us, please email us at
							info.helping.neighbors@gmail.com
						</p>
					</div>
				</Link>
			)}

			<section className="footer__nav">
				<Link
					className={terms ? "footer__link footer__active" : "footer__link"}
					onClick={handleTerms}
				>
					<h3 className="footer__label">Terms</h3>
				</Link>
				<Link
					className={about ? "footer__link footer__active" : "footer__link"}
					onClick={handleAbout}
				>
					<h3 className="footer__label">Benefits</h3>
				</Link>
				<Link
					className={contact ? "footer__link footer__active" : "footer__link"}
					onClick={handleContact}
				>
					<h3 className="footer__label">Contact</h3>
				</Link>
			</section>
		</div>
	);
}
