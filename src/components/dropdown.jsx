import React, { useContext, useState } from "react"
import DownArrowBlack from "../img/Symbols/Sprites/Signs_ArrowDown_1.svg"
import DownArrowWhite from "../img/Symbols/Sprites/Signs_ArrowDown_3.svg"


function Dropdown(props){
    const {
        type,
        list,
        optionTitle,
        dropdownSelection,
        setDropdownSelection
    } = props

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleSelection = (e) => {
        const selectionTarget = parseInt(e.target.id.split("-")[1])
        
        setDropdownSelection(selectionTarget)
       
    }

    function handleDropdown(){
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <div id="texture_dropdown" 
        onClick={handleDropdown}
        className={` cursor-pointer w-full mb-4 h_24  rounded z-10 relative
         ${dropdownOpen ? " " : "overflow-hidden" } ${type == "solid" ? "text-almostBlack " : "border border-almostWhite"}`} 
       >

            <ul id="texture_dropdown-list " 
            className={`list-none ${dropdownOpen ? " bg-almostBlack text-almostWhite border border-almostBlack" 
            : type == "solid" ? "bg-lightGrey border border-lightGrey" : "border border-almostBlack"} w_wide-10 ` }

             style={{

                outline: "thin solid #252525"
            }}>

                {optionTitle &&  <li className="pl-1 text-sm  flex justify-between">{optionTitle}
                <img src={type == "solid" ? DownArrowBlack : DownArrowWhite} className="w_24 h_24  flex justify-center items-center select-none"></img></li>
                }
               

                {list && list.map((item,index) => {
                    return <li key={index} 
                    onClick={handleSelection}
                    id={`dropdown_item_${optionTitle}-${index}`}
                    className={`${index === dropdownSelection && dropdownOpen ? "bg-darkGrey" : ""} 
                    pl-1 text-sm h_24 flex w-full justify-between
                    ${index > 0 && "hover:bg-darkGrey"}`}>{item.name} {(index == 0 && type === "solid") && <img src={dropdownOpen ? DownArrowWhite : DownArrowBlack} /> } </li>
                })}
              
                
            </ul>
    </div>
    )
}


export default Dropdown