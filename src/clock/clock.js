import React, {useEffect} from "react";
import { useState } from "react";

const Clock = () => {

    const [clock, setClock] = useState(new Date().toLocaleTimeString())
    
    useEffect(()=>{
        const intervalID = setInterval(()=>{
            
            const time = new Date().toLocaleTimeString();
            setClock(time)
        },1000)

        return ()=>{
            clearInterval(intervalID)
        }
    },[])

    return (
        <div style={{
            border: "3px solid #2b2d42",
            borderRadius: "5px",
            width: "200px",
            textAlign: "center",
            padding: "10px 0",
            color: "#edf2f4",
            backgroundColor: "#8d99ae"

        }}>{clock}</div>
    )
}

export default Clock