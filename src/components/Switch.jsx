import React, { useEffect, useRef, useState } from "react"
import { generateInputs } from "../utils/generators"



function Switch(props){
    const {
        id,
        axis,
        unit
        } = props
        const checkboxRef = useRef(null)
        const [state, setState] = useState(false)

        console.log(id, axis)
        function handleChange(e){
            console.log(checkboxRef.current.checked)
            
            setState(!state)
            checkboxRef.current.checked = state
        }

    return(
        <div id={id} onClick={handleChange} className={` w_56 h-full flex justify-between items-center ml-2`}>
            <p className="font-normal normal-font text-midGrey pl-1">{axis}</p>
            <div  className={` ${state ? "bg-primary justify-end" :  "bg-midGrey"}  rounded-xl w_24 h-3 flex `}>

                <div id="knot" className="w-2 h-2 bg-almostWhite m-0.5 rounded-xl">
                        <input ref={checkboxRef} className="opacity-0 w-0 h-0" type="checkbox" />
                </div>
                
            </div>
        </div>
    )
}


export default Switch