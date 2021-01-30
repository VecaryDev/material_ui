import React from "react"

import PopUpImageHover from "./PopUpImageHover"
import GradientView from "./GradientView"

import Draggable from "react-draggable"

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
             {activeTexture === 0 ?
             <>
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
                        {/* IMAGE TEXTURE */}
                      </div> 
                      </>



                      : activeTexture === 1 ?
                       <div className="w-full h_216 ">
                           {/* GRADIENT COLOR */}

                           <GradientView />
                       </div> 
                       
                      :




                       <div className="w-full h_216" style={{
                          background: `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,255,255,1) 100%)`,
                      }}>
                          {/* SOLID COLOR */}
                          <div className="absolute w-full h_216" style={{
                              background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)",
                          }}></div>
                          <Draggable 
                          bounds="parent"
                          
                          >
                              <div className="w-3 h-3 rounded-xl border" style={{
                                  borderColor: "rgba(0,0,0,0.1)"
                              }}>
                                  <div className="w-full h-full rounded-xl border border-almostWhite "></div>
                              </div>
                          </Draggable>
                      </div>
                         
                     }

        </div>
    )
}


export default PopUpView