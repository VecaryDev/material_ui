

import React, { useEffect, useRef, useState } from "react"

import {map_float_range} from "../TestData/functions"

import ArrowGrowUp from "../img/Symbols/Sprites/ArrowGrowUp.svg"
import ArrowGrowDown from "../img/Symbols/Sprites/ArrowGrowDown.svg"
import ArrowGrow from "../img/Symbols/Sprites/ArrowUpDown.svg"



function RangeInput(props) {
    const {
        iterable,
        unit,
        color,
        value
    } = props
    
    const [dynamicValue, setDynamicValue] = useState(false)
    const [multiplyer, setMultiplyer] = useState(0)
    const [hover, setHover] = useState(false)
    const [growIcon, setGrowIcon] = useState(ArrowGrow)
    const [indicator, setIndicator] = useState(false)

    let oldValue = 0


    const inputRef = useRef(null)

    let counter = 0

    let dragOver = true
    let userLocation = 0

let num = 0




    useEffect(() => {
        if(unit !== undefined){
            setDynamicValue(0 + unit )
        }else {
            setDynamicValue(0 )
        }
    }, [value])


    const handleInputChange = (e) => {
        let newInput = e.target.value.split(`${unit}`).join("")
       
        setDynamicValue(newInput )
       
    }
    const handleSelect = (e) => {
        e.target.select()


    }

 
    const handleDrag = (location, oldLocation) => {
       if(inputRef !== null) {
           const difference = inputRef.current.getBoundingClientRect().top + 12 + window.scrollY - location
           let changingFactor = parseInt(map_float_range(difference, -100, 100, 0, 100))
           console.log(location, oldLocation)
          
           const adjustChange = () => {
              // console.log(dynamicValue +  Math.pow(2, Math.log10(difference )- 1))
             //  console.log(Math.pow(2, Math.log10(difference)), Math.log10(difference - 1), difference)
            //    if(difference > 0) {
                   
            //         return Math.ceil( Math.pow(2, changingFactor ))
            //    }
            //    else if(difference < 0 ){
            //     return  Math.floor( Math.pow(2, changingFactor * -1)) * -1
            //    }
            //    else{
            //        return 0;
                    
            //    }

            if(changingFactor > 100){
                return 100
            }else if(changingFactor < 0 ){
                return 0
            }else{
                return changingFactor
            }
           }
           setTimeout(() => {
              
            //console.log(dynamicValue, adjustChange(),  parseInt(dynamicValue + adjustChange() ), counter, num);
            //num += parseInt( adjustChange() )
            console.log(location - oldLocation)
            num += location - oldLocation
           
            setDynamicValue(adjustChange() + unit)
           }, 50)
          
          

       }
       
    }
    const handleDragEnd = (e) => {
       e.preventDefault();
    }
    
    let addSelfDestructingEventListener = (element, eventType, callback) => {
        let handler = (e) => {
            callback(e);
            element.removeEventListener(eventType, handler);
        };
        element.addEventListener(eventType, handler);
    };

    function tryit() {
      //  console.log("UP")
        dragOver = true
        
       // counter = 0
       
    }

    function logUserLocation(e) {
        console.log(e.clientY)
       
       if(e.clientY !== undefined){
             oldValue =  userLocation
             userLocation = e.clientY
       }
       
    }
    function pauseEvent(e){
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
    }

    function exprimental(e) {
        dragOver = false
        function infinity() {
            if(!dragOver){
                setTimeout(() => {
                    addSelfDestructingEventListener(window, "mousemove", logUserLocation) 
                   // setDynamicValue(num += multiplyer)
                    handleDrag(userLocation, oldValue)
                    
                    console.log("down")
                    infinity()
                }, 10)
            }
        }
        setTimeout(infinity, 100)
        
        addSelfDestructingEventListener(window, "mouseup", tryit) 
    }

    function experimentalEnd() {
        console.log("up")
    }
    
    useEffect(() => {
      // console.log(dynamicValue)
    }, [dynamicValue])

    return (
        <div 
        onMouseOver={() => { setHover(true); setGrowIcon(ArrowGrow) } }
        onMouseLeave={() => { setHover(false) } } 
        
        className={`${color ? "w_32 ml-1" : "w_56 ml-1"} h_24  relative flex items-center `}>


            <input onClick={handleSelect}
             onDrag={handleDrag}
             onMouseDown={exprimental}
             onMouseUp={experimentalEnd}
            onDrop={handleDragEnd}
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

            {(!hover && indicator) &&
              <div className="absolute right-0 h_24 flex items-center pointer-events-none "> 

              <img onDrag={pauseEvent} className="" src={growIcon} />

          </div>}
            
            {iterable &&  <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>   }
        </div>
    )
}

export default RangeInput