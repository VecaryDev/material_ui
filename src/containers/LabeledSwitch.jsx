import React, { useEffect, useState } from "react"
import { generateInputs, defaultInputs } from "../TestData/generators"

import Switch from "../components/Switch"


function LabeledSwitch(props){
    const {
        label,
        labelType,
        padding,
        handleChange,
        input
        } = props
    const [inputs, setInputs] = useState([])
    

    useEffect(() => {
       
        setInputs(generateInputs(input  || defaultInputs.single(), "switch"))
    }, [input])

    return(
        <div className={` ${padding && "px-4"} flex w-full h_24 text-xs font-semibold justify-between items-center`}>

            <p className={`${labelType === "title" ? "font-semibold" : "font-normal"}`}>{label}</p>
            <div className="flex">
                {inputs.map((elem, index) => {
                    return elem
                })}
            </div>
        </div>
    )
}


export default LabeledSwitch