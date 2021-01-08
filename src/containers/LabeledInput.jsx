import React, { useEffect, useState, useRef, useContext, useLayoutEffect } from "react"

import {TexturePorpertyContext} from "../context/texturePropertyContext"

import DownArrow from "../img/Symbols/Sprites/ArrowDown.svg"

import {generateInputs, payloadGenerator} from "../TestData/generators"

import colorPicker from "../img/Symbols/Sprites/PipetteColor.svg"

import TextureButton from "../components/TextureButton"

function LabeledInput(props) {
    const {
        id,
        label,
        labelType,
        input,
        type,
        handleChange,
        plus,
        hasButton
    } = props
    const mainProperty = props.mainProperty !== undefined ? props.mainProperty : true
    const [inputs, setInputs] = useState([])
    const {globalState, dispatch}= useContext(TexturePorpertyContext)
    const [openPopup, setOpenPopup] = useState(false)
    const initialRender = useRef(true)
    const [localLabel, setLocalLabel] = useState("")

    const [values, setValues] = useState({})

    const payload = payloadGenerator(label)
   
   

    useEffect(()=>{
        console.log(mainProperty)
        type == "colorPicker" ? setLocalLabel(input.iterable[0].label) : setLocalLabel(label)
       
        

        setInputs(generateInputs(input, type || null))
    }, [])

    return(
        <div className={`w-full h_24 flex ${ type=== "colorPicker" ? "mt-5" : "my-2"} ${mainProperty ? "my-2" : "my-4"}`}>
            <div className={` w-full flex items-center justify-between`}>
               
               {type !== "colorPicker" ?
               
               
               <p className={`${labelType === "title" ? "font-semibold" : "font-normal"} text-xs`}>{localLabel}</p>
               
            :
            <div   
            className={` bg-lightGrey h-full w_48 flex justify-center items-center text-xs`}>
            { localLabel} 
            <img className="" src={DownArrow} />
            </div>
         
            }
                    

        <div className={`flex ${type === "buttonless" && "pr-8"}`}>
                <div className="flex">

                    {inputs && inputs.map((inp) => {
                        return inp
                    })}

                </div>
                {hasButton && <TextureButton 
                type={!plus && "transparent"}
                openPopup={openPopup} 
                className={`${!mainProperty ? "ml-1" : "ml-2" }`} 
                img={!plus && colorPicker} 
                alt="pick a color" 
                setOpenPopup={setOpenPopup}/>}
        </div>

            </div>
            

        </div>
    )
}


export default LabeledInput