import React from "react";

const Language = (props) => {
    return (
        <img className={props.className} src={props.language.src} alt={props.language.code}/>
    )
}


export default Language;