

import React, { useEffect, useRef, useState } from "react"

import {map_float_range} from "../TestData/functions"

import ArrowGrowUp from "../img/Symbols/Sprites/ArrowGrowUp.svg"
import ArrowGrowDown from "../img/Symbols/Sprites/ArrowGrowDown.svg"
import ArrowGrow from "../img/Symbols/Sprites/ArrowUpDown.svg"




function Input(props) {
    const {
        iterable,
        unit,
        color,
        value
    } = props
    
    const [dynamicValue, setDynamicValue] = useState(false)
    const [multiplyer, setMultiplyer] = useState(0)
    const [update, setUpdate] = useState(0)
    const [hover, setHover] = useState(false)
    const [growIcon, setGrowIcon] = useState(ArrowGrow)
    const [indicator, setIndicator] = useState(false)
    
    const inputRef = useRef(null)



    let limit = 0.1

    let counter = 0

    let dragOver = true
    let userLocation = 0

    let num = 0

    

    useEffect(() => {

        if(multiplyer > 0) {
            setGrowIcon(ArrowGrowUp)
        }else{
            setGrowIcon(ArrowGrowDown)
        }

      


       
        if(dynamicValue === false){
            setDynamicValue(0 + unit )
        }else{
            const processedDynamicValue = parseInt(dynamicValue.split(`${unit}`).join(""))
            
            if(processedDynamicValue === 0) {
                setDynamicValue(Math.ceil(2 * multiplyer) + unit)
            }else{
               if(multiplyer > 0.005){
                    setDynamicValue(Math.ceil(processedDynamicValue + (processedDynamicValue * multiplyer)) + unit)
               }else if (multiplyer < -0.005) {
                     setDynamicValue(Math.floor(processedDynamicValue + (processedDynamicValue * multiplyer)) + unit)
                
               }else{
                    setDynamicValue(processedDynamicValue + unit)    
               }
            }
            
        }
        
    }, [multiplyer, update])

    const handleInputChange = (e) => {
       
        let newInput = e.target.value.split(`${unit}`).join("")
       
        setDynamicValue(newInput )
       
    }
    const handleSelect = (e) => {
      


    }

 
    const handleDrag = (location, dynamicData) => {
       if(inputRef !== null) {
           const difference = inputRef.current.getBoundingClientRect().top + 12 + window.scrollY - location
           let changingFactor = map_float_range(difference, -100, 100, -limit, limit)
           //console.log(dynamicValue)
          
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

            counter++
           
           
            if(changingFactor > 0){

                if(changingFactor > limit){
                    return limit
                }else{
                    return changingFactor
                }

            }else{
                
                if(changingFactor < -limit){
                    return limit * -1
                }else{
                   return changingFactor
                }

            }

            
           }
           setTimeout(() => {
              
            //console.log(dynamicValue, adjustChange(),  parseInt(dynamicValue + adjustChange() ), counter, num);
            //num += parseInt( adjustChange() )
            setMultiplyer(adjustChange())
           }, 50)
          
          

       }
       
    }
    function pauseEvent(e){
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
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
        const selection = inputRef.current.value.substring(inputRef.current.selectionStart, inputRef.current.selectionEnd);
        
        inputRef.current.select()
        console.log(selection)
        
        document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;
        
        document.exitPointerLock();
      
       // counter = 0
       
    }

    function logUserLocation(e) {
        console.log(e.clientY)
     
       if(e.clientY !== undefined){
             userLocation = e.clientY
       }
       
    }

    function exprimental(e) {
        const element = e.target

        element.requestPointerLock = element.requestPointerLock ||
			     element.mozRequestPointerLock ||
			     element.webkitRequestPointerLock;
        // Ask the browser to lock the pointer
        element.requestPointerLock();
        


        dragOver = false

        const selection = inputRef.current.value.substring(inputRef.current.selectionStart, inputRef.current.selectionEnd);
        
        if(selection === "") {
      
        function infinity() {
           
            if(!dragOver ){
                setTimeout(() => {
                    addSelfDestructingEventListener(window, "mousemove", logUserLocation) 
                   // setDynamicValue(num += multiplyer)
                  // e.target.select()
                    handleDrag(userLocation)
                    
                   // console.log("down")
                    if(counter % 2 === 0){
                        setUpdate(update+ 1)
                       }else{
                        setUpdate(false)
                       }
                      
                    infinity()
                }, 50)
            }
        }
        setTimeout(() => {
            infinity()
           
        }, 100)
    }
        
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
             onDrag={pauseEvent}
             onMouseDown={exprimental}
             onMouseUp={experimentalEnd}
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

            {(!hover && indicator) &&
              <div className="absolute right-0 h_24 flex items-center pointer-events-none "> 

              <img onDrag={pauseEvent} className="" src={growIcon} />

          </div>}
            
            
            {iterable &&  <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>   }
        </div>
    )
}

export default Input