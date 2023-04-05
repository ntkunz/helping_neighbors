import "./NewUserPage.scss";

export default function NewUserPage() {



    return (
        <div className="new">
            <form action="" method="post" className="new__form">
                <label className="new__label"> First Name
                    <input type="text" className="new__input" name="first_name" />
                </label>
                <label className="new__label">Last Name
                    <input type="text" className="new__input" name="last_name" />
                </label>
                <label className="new__label">Password
                    <input type="password" className="new__input" name="password" />
                </label>
                <label className="new__label">Confirm Password
                    <input type="password" className="new__input" name="password_confirm" />
                </label>
                <label className="new__label">Location
                    <input type="text" className="new__input" name="location" />
                </label>
                <label className="new__label">Your Email
                    <input type="text" className="new__input" name="email" />
                </label>
                <label className="new__label">Tell your neighbors about yourself
                    <input type="text" className="new__input" name="about" />
                </label>
            </form>
        </div>
    )
}