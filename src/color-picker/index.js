import React, {useState} from "react";

const ColorPicker = ()=>{

    const [colors, setColors] = useState({colorA: '#000000', colorB: '#ffffff'})

    const onFormchange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
    
        setColors((currState) => {
          return { ...currState, [fieldName]: fieldValue };
        });
      };

    return(
        <div>
            <div style={{width:'100%', height: "500px",  backgroundImage: `linear-gradient(${colors.colorA}, ${colors.colorB})`}}>{`Color A: ${colors.colorA} Color B: ${colors.colorB}`}</div>
                <label>
                    Color A: 
                    <input style={{width: '100px'}}
                    name="colorA"
                    value={colors.colorA}
                    type="color" 
                    onChange={(e)=>{
                        onFormchange(e)
                    }}/>
                </label>
                <label>
                    Color B: 
                    <input style={{width: '100px'}}
                    name="colorB"
                    value={colors.colorB}
                    type="color"
                    onChange={(e)=>{
                        onFormchange(e)
                    }} />
                </label>

            
        </div>
    )
}

export default ColorPicker