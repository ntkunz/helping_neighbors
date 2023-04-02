import "./Message.scss";

export default function Message() {

    return(
        <div className="message">
            <div className="message__top">
                <h4 className="message__title">Cody Lucas</h4>
                <p className="message__date">Tuesday - 4:26pm</p>
            </div>
            <p className="message__text">Hey, I'm looking for a place to stay for a few days. I'm a good guy, I promise!</p>
        </div>
    )
}