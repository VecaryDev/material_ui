import React, { useEffect, useRef, useState } from "react"
import Draggable from 'react-draggable';

import {map_range, map_float_range} from "../TestData/functions"

function Slider(props) {
    const {
        setProgress,
        disabled,
        min,
        max,
        decimal,
        hasButton,
        progress,
        maxLimit
    } = props

    const maximumPosition =  171

    const[drag, setDrag] = useState(false)
    const [lastPosition, setLastPosition] = useState(0)
    const [dragPos, setDragPos] = useState(0)

    const sliderComponentRef = useRef(null)

    const remappedValue = (o) => {
        if(decimal){
            return map_float_range(o, 0,maximumPosition,0,max) }
         else{
             return map_range(o, 0,maximumPosition, min || 0,max)}
            } 

        const reveredRemap = (pos) => {
            if(decimal){
                return map_float_range(pos, min || 0, max, 0, maximumPosition)
            }else{
                return  map_range(pos, min || 0, max,  0,maximumPosition)
            }
        }



    useEffect(() => {
        if(max > 100){
           // setDragPos(maximumPosition/2)
        }
    }, [max])

    useEffect(() => {
        if(progress !== dragPos  ){
           
            setDragPos(reveredRemap(progress))
        }

    }, [progress])



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
          
                setProgress(remappedValue(o.x))
            
           
            setLastPosition(o.x)
        }
    }

    return (
    <div ref={sliderComponentRef} className="flex items-center h_16 relative">
        <Draggable
        axis={disabled ? "none" : "x"}
        bounds={{left: 0, top: 0, right: maximumPosition, bottom: 0}}
        onStart={Drag}
        onStop={DragOff}
        onDrag={setValue}
        position={{x: dragPos, y:  0}}
        >
            
            <div className={`relative  ${drag ? "knotBig" : "knot" } ${disabled ? "bg-softGrey" : "bg-midGrey"} 
            z-10 flex justify-center items-center border-solid border-2 border-almostWhite`}>
                <div className={`${drag ? "knotMidBig" : "knotMid"}  bg-almostWhite`}></div>
                
            </div>
        </Draggable>
        <div className={`track bg-softGrey track absolute`}></div>
        
    </div>
    )
}


export default Slider