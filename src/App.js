import React, { useEffect, useRef, useContext, useState } from "react"

import {defaultInputs} from "./TestData/generators"
import _uniqueId from 'lodash/uniqueId';
import TextSlider from "./containers/TextSlider"
import TexturePopup from "./containers/TexturePopup"
import LabeledInput from "./containers/LabeledInput"

import { v4 as uuidv4 } from 'uuid';

import MaterialList  from "./containers/MaterialList"

import {TexturePorpertyContext} from "./context/texturePropertyContext"

import AddMaterial from "./containers/AddMaterial"
import DashedLine from "./components/DashedLine"
import LabeledSwitch from "./containers/LabeledSwitch"


function App() {
  const WorkSpaceRef = useRef(null)
  const {globalState, dispatch} = useContext(TexturePorpertyContext)
  const [firstChildInitialPos, setFirstChildInitialPos] = useState(0)
  const rightPanel = useRef(null)

  useEffect(() => {
    dispatch({type: "ADD_WORKSPACE_REF", payload: {
      ref: WorkSpaceRef
    }})
  }, [WorkSpaceRef])
  useEffect( () => {
    
    setFirstChildInitialPos(rightPanel !== null && rightPanel.current.children[0].getBoundingClientRect().top)
  }, [])

  function handleScroll(e){
    const firstChildCurrentPos = rightPanel.current.children[0].getBoundingClientRect()
    let offset = 0
    if(firstChildCurrentPos <= firstChildInitialPos + 56) {
      rightPanel.current.scrollTop = 0
    }else{
      offset = firstChildCurrentPos.top - 74 + window.scrollY
    }

    
    console.log(firstChildCurrentPos.top + window.scrollY )
    dispatch({type: "SET_SCROLL_OFFSET", payload: {
      offsetY: offset
    }})
  }

  return (
    <div  className="App font-inter overflow-hidden transition-none ">

      <div id="MenuBar" className="w-full h_56 bg-primary z-10 relative"></div>
      <div id="Workspace" className="flex">

        <div id="leftSidebarAnd3DSpace" className="w-full h-screen">
          <div id="toolbar" className="w-full h_40 bg-primaryLight"></div>
          <div className="w-full h-full flex">
              <div id="leftSideBar" className="w_prop h-full bg-almostWhite"></div>
              <div id="3DSpace" ref={WorkSpaceRef} className=" h-full bg-almostBlack p-3" style={{width: "calc(100% - 248px)", height: "calc(100% )"}}>
                <TexturePopup />
              </div>
          </div>
        </div>

        <div id="right_panel" className="bg-almostWhite">

              <div onScroll={handleScroll}  ref={rightPanel} id="sliders" className="w_prop h-full items-center flex flex-col overflow-y-scroll overflow-x-hidden hideScrollBar" style={{height: "calc(100vh - 70px)"}}>

                <AddMaterial />

                <MaterialList />

                <DashedLine />

                    {/* If no properties are passed down the default slider is shown */}
                    <TextSlider  />

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

                    <TextSlider  propName="Base" active={true} decimal={true} maximum={100} unit={"%"}/>
                    <TextSlider  propName="Metalness" active={true} decimal={false} maximum={100} unit={"%"}/>
                    <TextSlider  propName="Opacity" active={true} decimal={false} maximum={100} unit={"%"}/>
                    <TextSlider  propName="Emission" active={true} decimal={false} maximum={1000} unit={"%"}/>
                    <TextSlider  propName="Normal" active={false} decimal={false} maximum={100} unit={"%"}/>

                    <TextSlider  propName="Metalness" active={true} decimal={false} maximum={100} unit={"%"}/>
                   
                  
                    <LabeledSwitch label="Double Sided Material"  padding={true}/>

                    <div>
                      Advanced Options
                    </div>

                    <div>
                    <TextSlider  propName="Normal" active={true} decimal={false} maximum={100} unit={"%"}/>
                    
                    <LabeledInput id={uuidv4()}  label="Hello"  labelType="title"   hasButton={true} input={defaultInputs.double()} />
                    </div>
                   
                   

                    </div>
        </div>

      </div>
     
    </div>
  );
}

export default App;
