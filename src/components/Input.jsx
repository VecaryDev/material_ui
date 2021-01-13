import React, { useEffect, useRef, useState } from "react"

import {map_float_range} from "../TestData/functions"


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
       
        setDynamicValue(newInput )
       
    }
    const handleSelect = (e) => {
        e.target.select()


    }
    const handleDrag = (e) => {
       if(inputRef !== null) {
           const difference = inputRef.current.getBoundingClientRect().top + 12 + window.scrollY - e.clientY
           let changingFactor = parseInt(map_float_range(difference, -1000, 1000, -5, 5))
           const adjustChange = () => {
               console.log(Math.pow(2, Math.log10(difference)), Math.log10(difference - 1), difference)
               if(difference > 0) {
                   
                    return Math.ceil(dynamicValue +  Math.pow(2, Math.log10(difference )- 1 ))
               }
               else if(difference < 0 ){
                return  Math.floor(dynamicValue -  Math.pow(2, Math.log10(difference  * -1) - 1))
               }
               else{
                   return dynamicValue;
                    
               }
           }
           setTimeout(() => {
            console.log(adjustChange());
            setDynamicValue(adjustChange() )
           }, 50)
          
          

       }
       
    }
    const preventDefaultBehavior =(e) => {
       e.preventDefault()
    }
    
    useEffect(() => {
      // console.log(dynamicValue)
    }, [dynamicValue])

    return (
        <div className={`${color ? "w_32 ml-1" : "w_56 ml-1"} h_24  relative flex items-center `}>


            <input onClick={handleSelect} onDrag={handleDrag} onDrop={preventDefaultBehavior} ref={inputRef} value={dynamicValue} onChange={handleInputChange} defaultValue={`${color ? value : `0${unit}`}`} 
            className={`bg-lightGrey w-full h-full rounded ${iterable ? "pl-4" : "pl-1"}  normal-font` } />
            {iterable &&  <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>   }
        </div>
    )
}

export default Input