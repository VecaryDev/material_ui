import React, { useEffect, useState, useRef, useContext, useLayoutEffect } from "react"

import {TexturePorpertyContext} from "../context/texturePropertyContext"

import DownArrow from "../img/Symbols/Sprites/ArrowDown.svg"

import {generateInputs, payloadGenerator} from "../TestData/generators"

import colorPicker from "../img/Symbols/Sprites/PipetteColor.svg"

import Plus from "../img/Symbols/Sprites/Plus.svg"

import ColorPlaceholder from "../img/colorPlaceholder.png"

import Link from "../img/Symbols/Sprites/Link.svg"

import TextureButton from "../components/TextureButton"

import {AnisotropyDefaults} from "../TestData/DefaultData"


import {TextureTypes, defaultImages} from "../TestData/DefaultData"
import { v4 as uuidv4 } from 'uuid';
import Dropdown from "../components/dropdown"

function LabeledInput(props) {
    const {
        id,
        label,
        labelType,
        input,
        type,
        icon,
        path,
        plus,
        hasButton
    } = props
    const mainProperty = props.mainProperty !== undefined ? props.mainProperty : true
    const [inputs, setInputs] = useState([])
    const {globalState, dispatch} = useContext(TexturePorpertyContext)
    const [openPopup, setOpenPopup] = useState(false)
    const [localLabel, setLocalLabel] = useState("")

    const [buttonIcon, setButtonIcon] = useState(Plus)

    const [toggleDorpdown, setToggleDropdown] = useState(false)

    const payload = payloadGenerator(label)
   
   
    const newId =  id ? id : uuidv4()

    useEffect(()=>{
        console.log(mainProperty)
        type == "colorPicker" ? setLocalLabel(input.iterable[0].label) : setLocalLabel(label)
       
        switch (icon) {
            
            case "picker":
                setButtonIcon(colorPicker)
                break;
            case "dropdown":
                setButtonIcon(DownArrow)
                break;
            case "solid": 
                setButtonIcon(ColorPlaceholder)
                break;
            case "link":
                setButtonIcon(Link)
                break;
            default:
                setButtonIcon(Plus)
        }

        dispatch({type: "ADD_ONE_PROP", payload:{
            id: newId,
            name: label,
            textureTypes: TextureTypes(),
            images: defaultImages
        }}) 

        setInputs(generateInputs(input, type || null))
    }, [])

    useEffect(() => {
        const globalStateCopy = globalState

       if(path){
           const loadEditedProperties = globalState.MaterialPorperties[path.activeProperty].textureTypes[path.activeTexture].tabTypes[path.activeTab]
           const editedPropertyProgress = loadEditedProperties.properties.filter(x => x.id === id)[0]
           console.log(editedPropertyProgress.progress, editedPropertyProgress.id)
           //setProgress(editedPropertyProgress.progress)
       }
        
        if(globalStateCopy.MaterialPorperties.length > 0 && id === undefined && openPopup && icon !== "dropdown"){
         
            dispatch({type: "ADD_ACTIVE_MATERIAL_POPUP", payload: {
                id: globalStateCopy.MaterialPorperties.filter(x => x.name == label)[0].id
            }})
        }
        else if(openPopup && icon === "dropdown"){
            setToggleDropdown(!toggleDorpdown)
        }
            
        
    }, [openPopup])



    return(
        <div className={`w-full h_24 flex ${ type=== "colorPicker" ? "mt-5" : "my-2"} ${mainProperty ? "my-2" : "my-4"} text-almostBlack  `}>
            <div className={` w-full flex items-center justify-between relative`}>
               
               {type !== "colorPicker" ?
               
               
               <p className={`${labelType === "title" ? "font-semibold" : "font-normal"} normal-font`}>{localLabel}</p>
               
            :
            <div   
            className={` bg-lightGrey h-full w_48 flex justify-center items-center normal-font`}>
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
                img={buttonIcon} 
                alt="" 
                setOpenPopup={setOpenPopup}/>}
                {icon === "dropdown" && <Dropdown 
                setToggleDropdown={setToggleDropdown} 
                list={AnisotropyDefaults} 
                defaultState={toggleDorpdown} 
                style={{marginTop: "-4px"}}
                className={`absolute z-10 w-28 bg-almostBlack text-almostWhite ${!toggleDorpdown && "hidden"}`}/>}
        </div>

            </div>
            

        </div>
    )
}


export default LabeledInput