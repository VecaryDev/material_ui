import React from "react"
import  Plus from "../img/Symbols/Sprites/Signs_Plus_1.svg"



function TextureButton(props) {
    const {
        setOpenPopup,
        openPopup,
        type,
        className,
    
    } = props

    function handleClick(){
        setOpenPopup(!openPopup)
    }
    return(
        <>
        <button onClick={handleClick}  className={`${className !== undefined ? className : "ml-2"} ${type == "circle" ? "rounded-xl overflow-hidden bg-lightGrey" 
        : type=== "transparent" ? "" : "bg-lightGrey"} 
        icon  focus:outline-none  focus:ring-1 focus:ring-primary  focus:almostBlack rounded-sm flex justify-center items-center `}>
            <img src={`${props.img || Plus}`}  alt={`${props.alt || "add texture"}`}/>
        </button>
          
        </>
    )
}


export default TextureButton