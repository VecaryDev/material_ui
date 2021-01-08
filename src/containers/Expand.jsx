import React, { useState } from "react"

import ExpandHandle from "../img/Symbols/Sprites/ExpandOpened.svg"

function Expand(props) {
    const {
        label
    } = props
    const [open, setOpen] = useState(false)

    function clickHandler() {
        setOpen(!open)
    }


    return (
        <div className="w_prop ">
            <div className="px-4">
            <div onClick={clickHandler} className="text-sm w-full  h_40 flex items-end cursor-pointer mb-2">
                <img src={ExpandHandle} alt="expand" style={{
                    marginLeft: "-6px",
                    transform: !open && "rotate(-90deg)"
                    
                    }} />
                <p className="font-semibold">{label}</p>
            </div>
            {open && props.children}

            </div>
           
        </div>
    )
}


export default Expand