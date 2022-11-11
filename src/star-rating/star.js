import React from "react";
import {BsStar} from "react-icons/bs"
import {BsStarFill} from "react-icons/bs"

const Star = ({style}) => {
    return(
        style === "filled" ? <BsStarFill style={{color: 'orange'}}/>: <BsStar/>
        
    )
}

export default Star;