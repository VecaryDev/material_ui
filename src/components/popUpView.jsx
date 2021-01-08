import React from "react"

import PopUpImageHover from "./PopUpImageHover"

function PopUpView(props){
    const {
        globalState,
        activeType,
        handleHoverStart,
        handleHoverEnd,
        hover,
        activeTexture,
        setActiveTexture,
        activeProperty
    } = props

    return (
        <div>
               <PopUpImageHover 
                    images={globalState.MaterialPorperties[activeProperty].images}
                    handleHoverStart={handleHoverStart} 
                    handleHoverEnd={handleHoverEnd} 
                    hover={hover} 
                    activeTexture={activeTexture}
                    setActiveTexture={setActiveTexture} />
                 
                     <div id="img_wrap" className="w-full h_216" style={{
                        background: globalState.MaterialPorperties[activeProperty] ? `url(${globalState.MaterialPorperties[activeProperty].images[activeType].src}) no-repeat center center / cover` : ""
                    }}>
                      </div> 

        </div>
    )
}


export default PopUpView