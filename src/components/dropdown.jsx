import React, { useContext, useEffect, useState } from "react"
import DownArrowBlack from "../img/Symbols/Sprites/Signs_ArrowDown_1.svg"
import DownArrowWhite from "../img/Symbols/Sprites/Signs_ArrowDown_3.svg"


function Dropdown(props){
    const {
        type,
        list,
        optionTitle,
        dropdownSelection,
        setDropdownSelection,
        className,
        defaultState,
        setToggleDropdown,
        style
    } = props

    
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleSelection = (e) => {
        const selectionTarget = parseInt(e.target.id.split("-")[1])
        if(setToggleDropdown === undefined){
            if(dropdownOpen){
                setDropdownSelection(selectionTarget)
            }
        }else{
            setToggleDropdown(false)
        }
       
       
    }

    useEffect(() => {
       if(defaultState !== undefined){
        setDropdownOpen(defaultState)
       }
    }, [defaultState])

    function handleDropdown(){
        if(setToggleDropdown === undefined){

            setDropdownOpen(!dropdownOpen)
        }else{
            setToggleDropdown(!dropdownOpen)
        }
    }

    return (
        <div id="texture_dropdown" 
        onClick={handleDropdown}
        className={`${className ? className : "relative w-full"}   mb-4 h_24  rounded z-10 
         ${dropdownOpen ? " " : "overflow-hidden" } ${type == "solid" ? "text-almostBlack " : "border border-almostWhite"}`} 
         style={style}
       >

            <ul id="texture_dropdown-list " 
            className={`list-none ${dropdownOpen ? " bg-almostBlack text-almostWhite border border-almostBlack" 
            : type == "solid" ? "bg-lightGrey border border-lightGrey" : "border border-almostBlack"} w_wide-10 ` }

             style={{
                transform: `translate(0px, -${dropdownSelection * 24}px)`,
                outline: "thin solid #252525"
            }}>

                {optionTitle &&  <li className="pl-1 text-sm  flex justify-between">{optionTitle}
                <img src={type == "solid" ? DownArrowBlack : DownArrowWhite} className="w_24 h_24  flex justify-center items-center select-none"></img></li>
                }

                 {(type === "solid") && 
                 <img className="absolute right-0 m-0.5" 
                 style={{ transform: `translate(0px, ${dropdownSelection * 24}px)`}} 
                 src={dropdownOpen ? DownArrowWhite : DownArrowBlack} /> } 
               
                
                {list && list.map((item,index) => {
                    return <li key={index} 
                    onClick={handleSelection}
                    id={`dropdown_item_${optionTitle}-${index}`}
                    className={`${index === dropdownSelection && dropdownOpen ? "text-primary" : ""} 
                    pl-1 text-sm h_24 flex w-full justify-between normal-font font-semibold
                    ${(index !== dropdownSelection && dropdownOpen) && "hover:bg-primary"}`}>{item.name}</li>
                })}
              
                
            </ul>
    </div>
    )
}


export default Dropdown