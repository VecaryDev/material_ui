import React, { useEffect, useRef, useState } from "react"
import _uniqueId from 'lodash/uniqueId';
import {useOutsideClickDetection} from "../TestData/functions"

function SliderParamProp(props) {
    const {
        progress, 
        propName, 
        disabled,
        labelType,
        setMax,
        setProgress,
        maxLimit,
        unit,
        colorSlider
    } = props
    const [toInput, setToInput] = useState(false)
    const inputRef = useRef(null)
    const textRef = useRef(null)
    useOutsideClickDetection(inputRef, setToInput)

    const inputid = _uniqueId("prop_input-")

    
   useEffect(()=>{
       inputRef.current.value = progress
       textRef.current.textContent = progress
       document.querySelector(`#${inputid}`).select()
   }, [toInput])

    function switchToInput(){
        if(!disabled ){
            setToInput(!toInput)
        }
      
    }
    function keyHandler(e) {
        if(e.key == "Enter" ){
            if(e.target.value <= maxLimit){
                setMax(maxLimit)

            }else{
                setMax(e.target.value * 2)

            }
            switchToInput()
            setProgress(e.target.value)

        }
    }
    function changeHandler(e){
        
            if(e.target.value <= maxLimit){
                setMax(maxLimit)

            }else{
                setMax(e.target.value * 2)

            }
            setProgress(e.target.value)
        
        
    }
    

    return(
        <div className="flex flex-row h_16 text-xs justify-between">
            <p  className={`${labelType === "title" ? "font-semibold" : "font-normal"}`}>{propName}</p>
            <div className="flex " >
                
                <input id={`${inputid}`}
                 type="number"
                 className={` ${toInput ? "" : "hidden"} bg-none w_40 text-right appearance-hide`} 
                 placeholder={progress} 
                 autoFocus
                 onFocus={(e) => {e.target.select()}}
                 onKeyDown={keyHandler}
                 onChange={changeHandler}
                  ref={inputRef}/> 

                <p onClick={switchToInput} ref={textRef} className={`${disabled ? "text-softGrey" : ""} ${toInput ? "hidden" : ""}`}>{progress}</p>
                <p className={`${disabled ? "text-softGrey" : ""}`}>{unit === null ? "" : unit || "%"}</p>
            </div>
          
        </div>
    )
}


export default SliderParamProp