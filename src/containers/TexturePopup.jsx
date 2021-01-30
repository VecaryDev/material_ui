import React, { useContext, useEffect, useRef, useState } from "react"

import {TexturePorpertyContext} from "../context/texturePropertyContext"
 
import {generateProperties} from "../TestData/generators"

import Dropdown from "../components/dropdown"
import PopUpView from "../components/popUpView"
import Tab from "../components/Tab"

function useOutsideAlerter(ref, dispatch, globalState) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if(globalState.MetaData.WorkspaceRef && event.target === globalState.MetaData.WorkspaceRef.current){
                    
                    dispatch({type: "CLOSE_POPUP"})
                }

            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, globalState]);
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

function TexturePopup(props) {
    const {globalState, dispatch}= useContext(TexturePorpertyContext)
    
    const [open, setOpen] = useState(true)
    const [hover, setHover] = useState(false)
    const popUpWindow = useRef(null)
    
    const [activeProperty, setActiveProperty] = useState(0) // The index of the active property e.g. Metalness
    const [activeTexture, setActiveTexture] = useState(0) //The index of the active TextureType (Solid / Gradient / Image)
    const [activeTab, setActiveTab] = useState(0) //The index of the active submenu currently open (e.g. Adjust / Transform)
    const [activeType, setActiveType] = useState(0) // 


    const [properties, setProperties] = useState([])

    useOutsideAlerter(popUpWindow, dispatch, globalState)
    
   useEffect(() => {
    setActiveTab(0)
    console.log(activeTab, activeTexture, activeProperty, activeType)
}, [activeTexture])

    useEffect(() => {
     

           setOpen(globalState.MetaData.activeTexturePopup !== "")
           setActiveTab(0)
           setActiveType(0)
           setActiveTexture(0)
           if(globalState.MetaData.activeTexturePopup !== "") {
               const globalStateCopy = globalState
            let currentSelection = globalStateCopy.MaterialPorperties.filter(x => x.id === globalState.MetaData.activeTexturePopup)[0]
            setActiveProperty(globalState.MaterialPorperties.indexOf(currentSelection))

            
           }
        
    }, [globalState.MetaData.activeTexturePopup])

   useEffect(() => {
   
    if(activeProperty !== undefined 
        && globalState.MaterialPorperties[activeProperty] !== undefined 
        && globalState.MaterialPorperties[activeProperty].textureTypes[activeTexture].tabTypes[activeTab] !== undefined) {

        const path = {
            activeProperty: activeProperty,
            activeTexture: activeTexture,
            activeTab: activeTab,
        }
            const currentlySelectedProps = globalState.MaterialPorperties[activeProperty].textureTypes[activeTexture].tabTypes[activeTab]
            setProperties(currentlySelectedProps)
            const newProperties = generateProperties(currentlySelectedProps, path)
            setProperties(newProperties)


            
    }
    const test = {
        activeProperty: activeProperty,
        activeTexture: activeTexture,
        activeTab: activeTab,
        activeType: activeType
    }

    console.table(activeTab, activeTexture, activeType, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    if( globalState.MaterialPorperties[activeProperty] !== undefined) {
        console.log(globalState.MaterialPorperties[activeProperty].textureTypes[activeTexture])
    }

    
   }, [activeProperty,activeTexture, activeTab, activeType, open])


    function handleHoverStart() {
       
        setHover(true)
    }

    function handleHoverEnd(){
        
        setHover(false)
    }


  
    return(
        <div className="flex justify-end pt-60 select-none "
   >
       {globalState.MaterialPorperties[activeType] ? 
         <div ref={popUpWindow} 
         className={`${open ? "" : "hidden"} 
         w_props-row  bg-white absolute rounded-sm  `} 
         style={{minHeight: "350px"}}>

               <PopUpView  
                       globalState={globalState}
                       activeType={activeType}
                       handleHoverStart={handleHoverStart}
                       handleHoverEnd={handleHoverEnd}
                       hover={hover}
                       activeTexture={activeTexture}
                       setActiveTexture={setActiveType}
                       activeProperty={activeProperty}
                       type={globalState.MaterialPorperties[activeProperty].textureTypes[activeType]}
               />  
           
               
             <div id="popUp_Properties transition-all duration-100 " className="p-4 ">
                
                 
                <Dropdown list={globalState.MaterialPorperties[activeProperty].textureTypes} type="solid" dropdownSelection={activeTexture} setDropdownSelection={setActiveTexture} />
                

               {globalState.MaterialPorperties[activeProperty].textureTypes[activeTexture].tabTypes.length > 1 && 
                <Tab tabOptions={ globalState.MaterialPorperties[activeProperty].textureTypes[activeTexture].tabTypes} active={activeTab} setActive={setActiveTab}/>
                } 
                

               {properties && properties.map((prop) => {
                   return prop
               })}

             </div>
         </div>
         : <div></div> }
   </div>
    )
}


export default TexturePopup