import React from "react";
import {BsStar} from "react-icons/bs"
import {BsStarFill} from "react-icons/bs"

const Star = (props) => {
    return(
        props.style === "filled" ? <BsStarFill/>: <BsStar/>
        
    )
}

export default Star;