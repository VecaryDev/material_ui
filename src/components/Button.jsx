import React from "react"


function Button(props){
    const {
        buttonText,
        label,
        type
    
    } = props
    return(
        <div id="upload-texture " className={`${type == "circle" ? "rounded-xl overflow-hidden" : ""}`}>
            <button className="w-full text-xs w-full  focus:ring focus:outline-none
            flex items-center justify-center 
            hover:bg-almostWhite hover:text-almostBlack 
            transition-colors cursor-pointer mb-1 h_24 
            border border-almostWhite rounded-sm">{buttonText || "Button"}</button>

            {label && 
               <p className="w-full text-center text-xs">{label}</p>
            }
            
        </div>
    )
}


export default Button