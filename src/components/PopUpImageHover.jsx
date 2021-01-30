import React from "react"

import Button from "../components/Button"
import Dropdown from "../components/dropdown"

import Reset from "../img/Symbols/Sprites/Reset.svg"
import Download from "../img/Symbols/Sprites/Download.svg"

function PopUpImageHover({images, handleHoverStart,  handleHoverEnd, hover, activeTexture , setActiveTexture}){

    return (
        <handle>
        <div id="img_hover"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        style={{background: hover && "rgba(37,37,37,0.9)"}} className="w-full h_216 absolute p-4 flex flex-col transition duration-100  text-almostWhite">
            
            {hover && 
            <>
                <div id="top_icon-wrap " className="w-full  flex justify-between">
                    <img className="w_24 h_24  hover:bg-strongGrey hover:border-strongGrey" src={Reset} />
                    <img className="w_24 h_24 hover:bg-strongGrey hover:border-strongGrey" src={Download} />
                </div>

                <div id="content_wrap" className="mt-10" >

                    <Dropdown list={images} optionTitle="Select Texture" dropdownSelection={activeTexture} setDropdownSelection={setActiveTexture} />

                    <Button buttonText={"Upload File"} label={"or drag & drop / paste it here"} />

                </div>
           </>

        }
        </div>
        </handle>
    )
}


export default PopUpImageHover