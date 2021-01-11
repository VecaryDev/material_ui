import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from "react"

import {TexturePorpertyContext} from "../context/texturePropertyContext"

import { v4 as uuidv4 } from 'uuid';


import {TextureTypes, defaultImages} from "../TestData/DefaultData"

import {payloadGenerator} from "../TestData/generators"

import Slider from "../components/Slider"
import SliderParamProp from "../components/Slider_Param_Prop"
import TextureButton from "../components/TextureButton"

import ColoredSlider from "../components/ColoredSlider"


function TextSlider(props){
    const {
        id,
        active, 
        decimal,
        maximum,
        minimum,
        unit,
        labelType,
        hasButton = true,
        emptyButtonSpace,
        path
    
    } = props
   
    const propName = props.propName || "Parameter"
    const colorSlider = props.colorSlider || false

    const [progress, setProgress]= useState(0)
    const [disabled, setDisabled] = useState(false)
    const [max, setMax] = useState(100)
    const [openPopup, setOpenPopup] = useState(false)
    const [offset, setOffset] = useState(0)

    const {globalState, dispatch} = useContext(TexturePorpertyContext)

    const sliderRef = useRef(null)

    const newId =  id ? id : uuidv4()
   
    useEffect(() => {
        
        dispatch({type: "ADD_ONE_PROP", payload:{
            id: newId,
            name: propName,
            textureTypes: TextureTypes(),
            images: defaultImages
        }})     

       
        
   
    }, [])

   

    useEffect(() => {
        const globalStateCopy = globalState

       if(path){
           const loadEditedProperties = globalState.MaterialPorperties[path.activeProperty].textureTypes[path.activeTexture].tabTypes[path.activeTab]
           const editedPropertyProgress = loadEditedProperties.properties.filter(x => x.id === id)[0]
           console.log(editedPropertyProgress.progress, editedPropertyProgress.id)
           setProgress(editedPropertyProgress.progress)
       }
        
        if(globalStateCopy.MaterialPorperties.length > 0 && id === undefined){
           
            dispatch({type: "ADD_ACTIVE_MATERIAL_POPUP", payload: {
                id: globalStateCopy.MaterialPorperties.filter(x => x.name == propName)[0].id
            }})
        }
            
        
    }, [openPopup])

    useEffect(() => {
        if(id !== undefined && progress > 0){
            console.log("UPDATE")
            dispatch({type: "UPDATE_POPUP_PROPERTY", payload: {
                path: path,
                id: id,
                progress: progress
            }})
        }
    }, [progress])

    useEffect(() => {
        if(globalState.MetaData.activeTexturePopup === id) {
            console.log(propName)
        }
    }, [globalState.MetaData.activeTexturePopup])

    useEffect(() => {
        if(globalState.MetaData.offsetY){
            setOffset(globalState.MetaData.offsetY)
        }
    }, [globalState.MetaData.offsetY])

    useEffect(() => {
        if(active !== undefined){
            setDisabled(!active)
        }
        if(maximum !== undefined){
            setMax(maximum)
        }
    }, [active, maximum])

    useEffect(() =>{
       // console.log(max, progress, minimum)
        if(progress < maximum){
            setMax(maximum)
        }

    }, [progress, max])

    return (
        <div ref={sliderRef} className={`${hasButton === true ? " h_32 my-2 px-2" : "h_24 my-4 "} text-almostBlack `}>
        <div className={`w-full h-full  flex  justify-between `}>
         
            <div className={`${hasButton != false ? "w_184" : "w-full"} ${emptyButtonSpace && "pr-4"}`}>

                <SliderParamProp 
                
                propName={propName} 
                maxLimit={100} 
                minimum={minimum}
                
                labelType={labelType || "title"}
                progress={progress} 
                disabled={disabled} 
                setMax={setMax} 
                setProgress={setProgress}
                unit={unit}
                progress={progress}
                colorSlider={colorSlider}
                />

            {colorSlider ?

            <ColoredSlider 
            
            
            setProgress={setProgress} 
            propName={propName} 
            progress={progress}  
            max={maximum} 
            min={minimum} />

            :

            <Slider 
            offset={offset}   
            hasButton={hasButton != undefined ? hasButton : true} 
            setProgress={setProgress} 
            disabled={disabled} 
            progress={progress} 
            max={max} 
            maxLimit={100}
            min={minimum}
            decimal={decimal}/>
            
            }
               

            </div>
               {hasButton && !emptyButtonSpace && <TextureButton openPopup={openPopup} setOpenPopup={setOpenPopup} /> }
        </div>
        </div>
    )
}

export default TextSlider