import React from "react";

const Language = ({className, language}) => {
    return (
        <img className={className} src={language.src} alt={language.code}/>
    )
}


export default Language;