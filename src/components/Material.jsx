import React, {useEffect, useState} from "react"

import Minus from "../img/Symbols/Sprites/Minus.svg"
import MatPicker from "../img/Symbols/Sprites/PipetteMaterial.svg"
import Duplicate from "../img/Symbols/Sprites/Copy.svg"



function Mateial(){
    const [hover, setHover] = useState(false)

function addHover(){
    setHover(true)
}

function removeHover(){
    setHover(false)
}

    return(
       <div onMouseEnter={addHover} onMouseLeave={removeHover} className=" flex items-center px-2 my-2 justify-between">
           <div className="flex items-center">
                <div className="w_24 h_24 rounded-xl overflow-hidden border border-midGrey">
                    <img className="w-full h-full" src="https://www.vectary.com/viewer/scripts/NewMatcap.png" alt="img"/>
                </div>

                <div className="pl-2 normal-font text-midGrey">
                    <p className="w_80 overflow-hidden overflow-ellipsis whitespace-nowrap">asdasdasdasdasdasdasdasdasdasdasdd</p>
                </div>
           </div>

           <div className="flex ">
                <div className={`${hover ? "flex" : "hidden"} w_24 h_24 hover:bg-lightGrey items-center justify-center`}><img src={Duplicate} /></div>
                <div className={`${hover ? "flex" : "hidden"} w_24 h_24 hover:bg-lightGrey items-center justify-center`}><img src={MatPicker} /></div>
                <div className="w_24 h_24 hover:bg-lightGrey flex items-center justify-center"> <img src={Minus} /></div>
           </div>

       </div>
    )
}

export default Mateial