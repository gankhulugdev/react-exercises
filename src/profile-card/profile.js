import React from "react";

const Profile = (props) => {
    const [firstName, lastName] = props.name.split(" ");

    return(
        <div className="profile">
            <div className="initialLetter">{firstName[0]+lastName[0]}</div>
            <div className="nameTitle">
                <div className="name">{props.name}</div>
                <div className="title">{props.title}</div>
            </div>
        </div>
    )
}

export default Profile;