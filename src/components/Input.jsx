import React, { useEffect, useRef, useState } from "react"

import {map_range} from "../TestData/functions"


function Input(props) {
    const {
        iterable,
        unit,
        color,
        value
    } = props
    
    const [dynamicValue, setDynamicValue] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        setDynamicValue(0)
    }, [value])

    const handleInputChange = (e) => {
        let newInput = e.target.value.split(`${unit}`).join("")
       
        setDynamicValue(newInput + unit)
       
    }
    const handleSelect = (e) => {
        e.target.select()


    }
    const handleDrag = (e) => {
       if(inputRef !== null) {
           const difference = inputRef.current.getBoundingClientRect().top + window.scrollY - e.clientY
           let changingFactor = map_range(difference, -100, 100, -2, 2)
           console.log(changingFactor)
           setDynamicValue(dynamicValue + changingFactor)

       }
       
    }
    const hangleDragEnd =() => {
       
    }
    
    useEffect(() => {
       console.log(dynamicValue)
    }, [dynamicValue])

    return (
        <div className={`${color ? "w_32 ml-1" : "w_56 ml-1"} h_24  relative flex items-center `}>


            <input onClick={handleSelect} onDrag={handleDrag} ref={inputRef} value={dynamicValue} onChange={handleInputChange} defaultValue={`${color ? value : `0${unit}`}`} 
            className={`bg-lightGrey w-full h-full rounded ${iterable ? "pl-4" : "pl-1"}  normal-font` } />
            {iterable &&  <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>   }
        </div>
    )
}

export default Input