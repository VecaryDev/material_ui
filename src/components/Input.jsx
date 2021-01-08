import React from "react"


function Input(props) {
    const {
        iterable,
        unit,
        color,
        value
    } = props
    
    const handleInputChange = (e) => {
        let newInput = e.target.value.split(`${unit}`).join("")
        e.target.value = newInput + unit
       
    }
    const handleSelect = (e) => {
        e.target.select()
    }

    return (
        <div className={`${color ? "w_32 ml-1" : "w_56 ml-2"} h_24  relative flex items-center `}>


            <input onClick={handleSelect} onChange={handleInputChange} defaultValue={`${color ? value : `0${unit}`}`} 
            className={`bg-lightGrey w-full h-full rounded ${iterable ? "pl-4" : "pl-1"}  text-xs` } />
            {iterable &&  <p className="text-xs absolute pl-1 text-midGrey">{iterable}</p>   }
        </div>
    )
}

export default Input