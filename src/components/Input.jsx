

import React, { useEffect, useRef, useState, useContext } from "react"

import {map_float_range} from "../TestData/functions"

import ArrowGrowUp from "../img/Symbols/Sprites/ArrowGrowUp.svg"
import ArrowGrowDown from "../img/Symbols/Sprites/ArrowGrowDown.svg"
import ArrowGrow from "../img/Symbols/Sprites/ArrowUpDown.svg"


import {TexturePorpertyContext} from "../context/texturePropertyContext"

import { v4 as uuidv4 } from 'uuid';

import {addSelfDestructingEventListener, pauseEvent} from "../TestData/functions"


function Input(props) {
    const {
        iterable,
        unit,
        color,
        value
    } = props
    const {globalState, dispatch} = useContext(TexturePorpertyContext)
    const [dynamicValue, setDynamicValue] = useState(false)
    const [multiplyer, setMultiplyer] = useState({x: 0, y:0})
    const [sliderState, setSliderState] = useState("")

    const [cursorPos, setCursorPos] = useState({x: 0, y: 0})
    const [hover, setHover] = useState(false)
    const [growIcon, setGrowIcon] = useState(ArrowGrow)
    const [indicator, setIndicator] = useState(false)
   
    
    const [inputCoordinates, setInputCoordinates] = useState(null)

    const inputRef = useRef(null)

    const sliderCursor = globalState.MetaData.grwothRef.current

    let limit = 0.1


    useEffect(() => {
        setDynamicValue(dynamicValue + multiplyer.y *-1)
        const newPos = {
            x:  cursorPos.x + multiplyer.x ,
            y: cursorPos.y + multiplyer.y >  window.innerHeight ? 0 : cursorPos.y + multiplyer.y > 0 ? cursorPos.y + multiplyer.y : window.innerHeight
        }

        setCursorPos(newPos)
        console.log(newPos,  cursorPos)

      

        sliderCursor.style.top = `${cursorPos.y}px`
        sliderCursor.style.left = `${cursorPos.x}px`
        
       // sliderCursor.style.left = `${e.clientX}px`

    }, [multiplyer])

    function changeCallback(e) {
       if(inputRef !== null ) {
           
            if(document.pointerLockElement === inputRef.current || document.webkitPointerLockElement === inputRef.current){
               if(sliderState !== "active") {
              //  console.log("Added")
                document.addEventListener("mousemove", moveCallback, true);
                setSliderState("active")
               }
            }else{
                if(sliderState !== "inactive") {
                //    console.log(document.removeEventListener("mousemove", moveCallback, true))
                document.removeEventListener("mousemove", moveCallback, true);
                setSliderState("inactive")
                }
            }

       }
       
    }

    function moveCallback(e) {
        var movementX = e.movementX ||
        e.mozMovementX          ||
        e.webkitMovementX       ||
        0,
    movementY = e.movementY ||
        e.mozMovementY      ||
        e.webkitMovementY   ||
        0;
      

        sliderCursor.classList.remove("hidden")

        if(inputRef !== null) {
            setMultiplyer({x: movementX  , y: movementY  })
        }
       
    }


    useEffect(() => {
        if(inputRef !== null){
            setInputCoordinates(inputRef.current.getBoundingClientRect())
            setCursorPos({x: inputRef.current.getBoundingClientRect().x + 35, y: inputRef.current.getBoundingClientRect().top })
           console.log( globalState.MetaData.offsetY )
        }
    }, [globalState.MetaData])

useEffect(() => {

    document.addEventListener('pointerlockchange', changeCallback, false);
    document.addEventListener('mozpointerlockchange', changeCallback, false);
    document.addEventListener('webkitpointerlockchange', changeCallback, false);

    // Hook mouse move events
    setDynamicValue(0)
}, [])
    

    const handleInputChange = (e) => {
       
        let newInput = e.target.value.split(`${unit}`).join("")
       
        setDynamicValue(newInput )
       
    }
    const handleSelect = (e) => {
      
      

    }


    function tryit() {
 
        
        document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;

        document.removeEventListener("mousemove", moveCallback, true);
        
        document.exitPointerLock();

        
        sliderCursor.style.top = `0px`
        sliderCursor.style.left = `0px`
        if(sliderCursor.classList !== undefined){
            sliderCursor.classList.add("hidden")
            const nullValue = {x: 0, y:0}
            setCursorPos({
                x: inputRef.current.getBoundingClientRect().x + 50,
                y: inputRef.current.getBoundingClientRect().top
            })
            setMultiplyer(nullValue)
            console.log("end")
        }
      
       
    }


    function executeSliderChange(e) {
        const element = e.target
        

        element.requestPointerLock = element.requestPointerLock ||
			     element.mozRequestPointerLock ||
			     element.webkitRequestPointerLock;
        // Ask the browser to lock the pointer
        element.requestPointerLock();
        
     

        addSelfDestructingEventListener(window, "mouseup", tryit) 
    }


    
    useEffect(() => {
      // console.log(dynamicValue)
    }, [dynamicValue])

    return (
        <div 

        onMouseOver={() => { setHover(true); setGrowIcon(ArrowGrow) } }
        onMouseLeave={() => { setHover(false) } } 
        
        className={`${color ? "w_32 ml-1" : "w_56 ml-1"} h_24  relative flex items-center `}>


            <input
            id={uuidv4()}
            onClick={handleSelect}
             onDrag={pauseEvent}
             onMouseDown={executeSliderChange}
            
            onDrop={pauseEvent}
            onFocus={() => {setIndicator(true)}}
            onBlur={() => {setIndicator(false)}}
            ref={inputRef}
            value={dynamicValue} 
           
            onChange={handleInputChange}
            defaultValue={`${color ? value : `0${unit}`}`} 
            className={`bg-lightGrey w-full h-full rounded ${iterable ? "pl-4" : "pl-1"}  normal-font` } />
            
            { hover && 
            <div className="absolute right-0 h_24 flex items-center pointer-events-none "> 

                <img onDrag={pauseEvent} className="" src={growIcon} />

            </div>

            }

           

           
            
            {iterable &&  <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>   }
        </div>
    )
}

export default Input