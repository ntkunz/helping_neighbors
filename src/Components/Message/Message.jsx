import "./Message.scss";

export default function Message() {

    return(
        <div className="message">
            <div className="message__top">
                <h4 className="message__title">Cody</h4>
                <p className="message__date">Tuesday - 4:26pm</p>
            </div>
            <p className="message__text">Hey, any chance you'd like me to do some of the landscaping you said you don't 
            like to do and in exchange, make me a meal once a week or something? LMK - Cody</p>
        </div>
    )
}