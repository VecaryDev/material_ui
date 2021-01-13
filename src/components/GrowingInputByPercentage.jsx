

import React, { useEffect, useRef, useState } from "react"

import {map_float_range} from "../TestData/functions"

import ArrowGrowUp from "../img/Symbols/Sprites/ArrowGrowUp.svg"
import ArrowGrowDown from "../img/Symbols/Sprites/ArrowGrowDown.svg"
import ArrowGrow from "../img/Symbols/Sprites/ArrowUpDown.svg"


function GrowingInputByPercentage(props) {
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

    const inputRef = useRef(null)



    let limit = 0.99

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

        console.log(dynamicValue, multiplyer, 1 * multiplyer, dynamicValue + (dynamicValue * multiplyer))
        if(dynamicValue === false){
            setDynamicValue(0 )
        }else{
            if(dynamicValue === 0) {
                setDynamicValue(Math.ceil(2 * multiplyer))
            }else{
                setDynamicValue(Math.ceil(dynamicValue + (dynamicValue * multiplyer)))
            }
            
        }
        
    }, [multiplyer, update])

    const handleInputChange = (e) => {
       
        let newInput = e.target.value.split(`${unit}`).join("")
       
        setDynamicValue(newInput )
       
    }
    const handleSelect = (e) => {
        e.target.select()


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
             userLocation = e.clientY
       }
       
    }

    function exprimental(e) {
        
        dragOver = false
        function infinity() {
           
            if(!dragOver){
                setTimeout(() => {
                    addSelfDestructingEventListener(window, "mousemove", logUserLocation) 
                   // setDynamicValue(num += multiplyer)
                   
                    handleDrag(userLocation)
                    
                    console.log("down")
                    if(counter % 2 === 0){
                        setUpdate(update+ 1)
                       }else{
                        setUpdate(false)
                       }
                      
                    infinity()
                }, 100)
            }
        }
        setTimeout(() => {
            infinity()
        }, 500)
        
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
             onDrag={handleDragEnd}
             onMouseDown={exprimental}
             onMouseUp={experimentalEnd}
            onDrop={handleDragEnd}
            
            ref={inputRef}
            value={dynamicValue} 
            onChange={handleInputChange}
            defaultValue={`${color ? value : `0${unit}`}`} 
            className={`bg-lightGrey w-full h-full rounded ${iterable ? "pl-4" : "pl-1"}  normal-font` } />
            
            {hover && 
            <div className="absolute right-0 h_24 flex items-center pointer-events-none "> 

                <img onDrag={handleDragEnd} className="" src={growIcon} />

            </div>

            }
            
            
            {iterable &&  <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>   }
        </div>
    )
}

export default GrowingInputByPercentage