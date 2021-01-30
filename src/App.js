import React, { useEffect, useRef, useContext, useState } from "react"

import {defaultInputs} from "./utils/generators"
import _uniqueId from 'lodash/uniqueId';
import TextSlider from "./containers/TextSlider"
import TexturePopup from "./containers/TexturePopup"
import LabeledInput from "./containers/LabeledInput"
import OpenDialog from "./containers/OpeningDialog"


import ValueDragCursor from "./img/Symbols/cursors/cursor-valueDrag-vertical.svg"

import Background from "./img/Background.png"
import Toolbar from "./img/toolbar.png"
import Navbar from "./img/navBar.png"
import leftSideBar from "./img/leftSidebar.png"

import MaterialList  from "./containers/MaterialList"

import {TexturePorpertyContext} from "./context/texturePropertyContext"

import AddMaterial from "./containers/AddMaterial"
import DashedLine from "./components/DashedLine"
import LabeledSwitch from "./containers/LabeledSwitch"
import Expand from "./containers/Expand"

import RangeInput from "./components/RangeInput"
import GrowingInput from "./components/GrowingInput"
import GrowingInputByPercentage from "./components/GrowingInputByPercentage"

document.title = "Vectary Prototype - Material UI"

function App() {
  //Reference to the 3D space, this is then posted to global state and reused later
  const WorkSpaceRef = useRef(null)
  //Context API call
  const {globalState, dispatch} = useContext(TexturePorpertyContext)

  //Reference to the Right panel
  const rightPanel = useRef(null)

  //Classnames that are reused in all wrapper objects for the input fields. This could be moved inside the component
  const advancedOptionSections= "overflow-auto px-2"

  //Growing cursor reference, it is in the page in a hidden form
  const grwothRef = useRef(null)

  //Adding workspace to the globalState
  useEffect(() => {
    dispatch({type: "ADD_WORKSPACE_REF", payload: {
      ref: WorkSpaceRef,
      grwothRef: grwothRef
    }})
  }, [WorkSpaceRef])
 
  

  return (
    <div  className="App font-inter overflow-hidden transition-none ">

      {/* Work in progress  - New Dialog on startup*/}

       <OpenDialog />

       <img ref={grwothRef} src={ValueDragCursor} className="absolute z-50 hidden" />


      <div id="MenuBar" className="w-full h_56 bg-primary z-10 relative" style={{ background: `url(${Navbar}) no-repeat center top/100% auto`}}></div>
      <div id="Workspace" className="flex">

        <div id="leftSidebarAnd3DSpace" className="w-full h-screen">
          <div id="toolbar" className="w-full h_40 bg-primaryLight" style={{ background: `url(${Toolbar}) no-repeat center top/100% auto`}}></div>
          <div className="w-full h-full flex">
              <div id="leftSideBar" className="w_prop h-full bg-almostWhite" style={{ background: `url(${leftSideBar}) no-repeat center top/100% auto`}}></div>

              <div id="3DSpace" ref={WorkSpaceRef} className=" h-full bg-almostBlack p-3" style={{
                width: "calc(100% - 248px)", 
                height: "calc(100% )",
                background: `url(${Background}) no-repeat center top/100% auto`
                }}>

                {/* The Texture Popup window is inside, hidden in the 3D space */}

                <TexturePopup />
              </div>
          </div>
        </div>

        {/* All components inside this will land in the Right Panel */}

        <div id="right_panel" className="bg-almostWhite ">

              <div   ref={rightPanel} id="sliders" 
              className="w_prop h-full items-center flex flex-col overflow-y-scroll overflow-x-hidden hideScrollBar select-none dark:bg-almostBlack" style={{height: "calc(100vh - 70px)"}}>

             

                <AddMaterial />

                <MaterialList />

                <DashedLine />

                    {/* If no properties are passed down the default slider is shown */}
                   <div className="px-4 my-2 w-full">
                   <LabeledInput type="empty" input={defaultInputs.empty()}  label="Base" labelType="title"  hasButton={true}  type="rangeInput" />
                   </div>

                    {/* Prop name is only set if specified. By default it will say "Property", 
                    you would need to write propName="Something" in order to name the slider "Something"

                    ----------------------------

                    a slider is only inactive if you specify, in this case active must equal to -- false --
                    */}
                    <TextSlider  propName="Roughness" active={false} unit={""}/>

                    {/* 
                    All props

                    propName => The name of the property e.g. Hue or Base Color or Metalness (if not set or the field is empty -> "Property")
                    active => decides if a slider is active or not. if not must be set to false (if not set it is --true--)
                    decimal => If the value should be decimal (0.001) --true-- or integer (1) --false-- / not set
                    maximum => the default maximum of the slider, the values can never be less then this, but can exceed if set manually
                    unit => "%" -> 50% ||   "$" -> 50$ || null -> 50 || if not set it will be % (e.g. 50%) by default

                    */}

                    
                    <TextSlider  propName="Metalness" active={true} decimal={false} maximum={100} unit={"%"}/>
                    <TextSlider  propName="Opacity" active={true} decimal={false} maximum={100} unit={"%"}/>
                    <TextSlider  propName="Emission" active={true} decimal={false} maximum={1000} unit={"%"}/>
                    <TextSlider  propName="Normal" active={false} decimal={false} maximum={100} unit={"%"}/>

                    <TextSlider  propName="Metalness" active={true} decimal={false} maximum={100} unit={"%"}/>
                   
                  
                    <LabeledSwitch label="Double Sided Material"  padding={true}/>


                    <Expand label="Advanced Options">
                        <div className={advancedOptionSections} >

                        <LabeledInput label="Anisotropy 0-100%" labelType="title" type="rangeInput"  hasButton={true} plus={true}   input={defaultInputs.single("%")} />
                        <LabeledInput  label="Rotation - Range" type="buttonless"  input={defaultInputs.single("°")}  />

                        </div>

                        <div className={advancedOptionSections}>

                        <LabeledInput label="Clearcoat" labelType="title" hasButton={true} plus={true}   input={defaultInputs.single("%")} />
                        <LabeledInput  label="Roughness" type="buttonless"  input={defaultInputs.single("%")}  />

                        </div>

                        <div className={advancedOptionSections}>

                        <LabeledInput label="Subsurface" labelType="title" hasButton={true} plus={true}   input={defaultInputs.single("%")} />
                        <LabeledInput  label="Radius / Thickness" type="buttonless"  input={defaultInputs.single("mm")}  />

                        </div>  

                        <div className={advancedOptionSections} style={{overflowY: "hidden", overflowX: "hidden"}}>

                        <LabeledInput label="Refraction" labelType="title" hasButton={true} icon="dropdown"   input={defaultInputs.single("%")} />
                        <LabeledInput  label="Absorbtion" hasButton={true} plus={true} icon="solid" input={defaultInputs.double("mm")}  />

                        </div> 

                        <div className={advancedOptionSections}>

                        <LabeledInput label="Reflectivity" labelType="title" hasButton={true} plus={true}   input={defaultInputs.single("%")} />

                        </div> 

                        <div className={advancedOptionSections}>

                        <LabeledInput label="Ambient Occlusion" labelType="title" hasButton={true} plus={true}   input={defaultInputs.single("%")} />

                        </div> 

                        <div className={advancedOptionSections}>

                        <LabeledInput label="Lightmap" labelType="title" hasButton={true} plus={true}   input={defaultInputs.single("%")} />

                        </div> 
                    </Expand>

                    <Expand label="Texture Transformations" padding={true}>
                        <div className={advancedOptionSections}>

                        <LabeledInput label="Tiling" hasButton={true} icon="link"  input={defaultInputs.double(null, true)} />

                        </div> 

                        <div className={advancedOptionSections}>

                        <LabeledInput label="Offset"type="buttonless"   input={defaultInputs.double(null, true)} />

                        </div> 

                        <div className={advancedOptionSections}>

                        <LabeledInput label="Rotation" type="buttonless"   input={defaultInputs.single("°")} />

                        </div> 
                      

                    </Expand>

                   
                   

                    </div>
        </div>

      </div>
     
    </div>
  );
}

export default App;
