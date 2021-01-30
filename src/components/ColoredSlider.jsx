import React, { useEffect, useState } from "react"
import Draggable from 'react-draggable';

import {gradients} from "../TestData/DefaultData"

import {map_range, map_float_range} from "../utils/remap"


function ColoredSlider(props){
    const {
        setProgress,
        progress,
        disabled,
        min,
        max,
        decimal,
        propName,
        hasButton
    } = props

    const maximumPosition = 171

    const[drag, setDrag] = useState(false)
    const [lastPosition, setLastPosition] = useState(0)
    const [dragPos, setDragPos] = useState(0)

    const [background, setBackground] = useState("")

    const [knotColor, setKnotColor] = useState("")


    useEffect(()=>{
      

        switch(propName.toLowerCase()) {
            case "hue":
                setKnotColor(`hsl(${map_range(progress, -180, 180, 0, 360 )}, 100%, 50%)`)
                setBackground(gradients.hue)
            break;
            case "saturation":
                setKnotColor(`hsl(180, ${map_range(progress, -100, 100, 0, 100 )}%, 50%)`)
                setBackground(gradients.saturation)
            break;
            case "brightness":
                setKnotColor(` hsl(180, 0%, ${map_range(progress, -100, 100, 0, 100 )}%)`)
                setBackground(gradients.brightness)
            break;
            
        }
        
    }, [propName])


    useEffect(()=>{
        switch(propName.toLowerCase()) {
            case "hue":
                setKnotColor(`hsl(${map_range(progress, -180, 180, 0, 360 )}, 100%, 50%)`)
               
            break;
            case "saturation":
                setKnotColor(`hsl(180, ${map_range(progress, -100, 100, 0, 100 )}%, 50%)`)
               
            break;
            case "brightness":
                setKnotColor(`hsl(180, 0%, ${map_range(progress, -100, 100, 0, 100 )}%)`)
              
            break;
            
        }
       
       
    }, [progress])

    useEffect(() => {
        
            setDragPos(maximumPosition/2)
        
    }, [max])


    function Drag(){
        setDrag(true)
    }

    function DragOff(){
        setDrag(false)
    }

    function setValue(e, o){
       

        
        if(!disabled){
            if(o.x < maximumPosition) {
                setDragPos(o.x)
            }else{
                setDragPos(maximumPosition)
            }
            if(decimal === true){
                setProgress(map_float_range(o.x, 0,maximumPosition,0,max))
            }else{
                setProgress(map_range(o.x, 0,maximumPosition, min || 0,max))
            }
           
            setLastPosition(o.x)
        }
    }
    return(
        <div className="flex items-center h_16 w-full">
        <Draggable
        axis={disabled ? "none" : "x"}
        bounds={{left: 0, top: 0, right: maximumPosition, bottom: 0}}
        onStart={Drag}
        onStop={DragOff}
        onDrag={setValue}
        position={{x: dragPos, y: 0}}
        >
            
                <div className={`absolute  ${drag ? "knotBig" : "knot" } b_border flex justify-center items-center border-solid border-2 border-almostWhite`} 
                style={{
                    backgroundColor: knotColor
                }}>
                
                </div>
            
        </Draggable>
        <div className={`w-full h-1 rounded-xl`} style={{
            background: "rgb(255,0,0)",
            background: `${background}`
        }}></div>
        
    </div>
    )

}


export default ColoredSlider