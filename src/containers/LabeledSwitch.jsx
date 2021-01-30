import React, { useEffect, useState } from "react"
import { generateInputs, defaultInputs } from "../utils/generators"



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
       // Generates input based on the JS object passed to the input porop
        setInputs(generateInputs(input  || defaultInputs.single(), "switch"))
    }, [input])

    return(
        <div className={` ${padding && "px-4 my-2"} flex w-full h_24 normal-font font-semibold justify-between items-center text-almostBlack`}>

            <p className={`${labelType === "title" ? "font-semibold" : "font-normal"}`}>{label}</p>
            <div className="flex h_24">
                {inputs.map((elem, index) => {
                    return elem
                })}
            </div>
        </div>
    )
}


export default LabeledSwitch