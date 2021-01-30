import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from "react"

import {TexturePorpertyContext} from "../context/texturePropertyContext"

import { v4 as uuidv4 } from 'uuid';

import {TextureTypes, defaultImages} from "../TestData/DefaultData"

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
    
    //the progress of the slider e.g. 57%
    const [progress, setProgress]= useState(0)
    //if true slider is not movable

    const [disabled, setDisabled] = useState(false)
    //Maximum for the slider
    const [max, setMax] = useState(100)
    //opens TexturePopup if certain conditions are fulfuilled
    const [openPopup, setOpenPopup] = useState(false)
    //Context API call
    const {globalState, dispatch} = useContext(TexturePorpertyContext)

    const sliderRef = useRef(null)

    //If it has been generated it has an ID, otherwise it is undefined so sets it to a new ID
    const newId =  id ? id : uuidv4()
   
    useEffect(() => {
        // Adding the textureSLider to global state on ceration
        dispatch({type: "ADD_ONE_PROP", payload:{
            id: newId,
            name: propName,
            textureTypes: TextureTypes(),
            images: defaultImages
        }})     

       
        
   
    }, [])

   

    useEffect(() => {
        const globalStateCopy = globalState

        //Gets the saved data based on the passed in path
       if(path){
           const loadEditedProperties = globalState.MaterialPorperties[path.activeProperty].textureTypes[path.activeTexture].tabTypes[path.activeTab]
           const editedPropertyProgress = loadEditedProperties.properties.filter(x => x.id === id)[0]
           console.log(editedPropertyProgress.progress, editedPropertyProgress.id)
           setProgress(editedPropertyProgress.progress)
       }
        
        if(globalStateCopy.MaterialPorperties.length > 0 && id === undefined){
           
            //if component is not generated and has properties open the popup
            dispatch({type: "ADD_ACTIVE_MATERIAL_POPUP", payload: {
                id: globalStateCopy.MaterialPorperties.filter(x => x.name == propName)[0].id
            }})
        }
            
        
    }, [openPopup])

    useEffect(() => {
        //update progress on globalstate for "this"
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
        //sets values to user input / defaults
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