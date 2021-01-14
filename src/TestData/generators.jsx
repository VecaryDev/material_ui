import React from "react"
import TextSlider  from "../containers/TextSlider"
import Input from "../components/Input"
import RangeInput from "../components/RangeInput"
import LabeledSwitch from "../containers/LabeledSwitch"
import LabeledInput from "../containers/LabeledInput"

import {TextureTypes} from "./DefaultData"
import _uniqueId from 'lodash/uniqueId';
import Switch from "../components/Switch"

import { v4 as uuidv4 } from 'uuid';

export const defaultInputs = {
    empty: () => {
        return {
            iterable: [],
            unit: undefined
        }
    },
    single: (unit = null) => {
       return {
            iterable: [0],
            unit: unit 
        }
    },
    double: (unit = null, iterable) => {
        return {
            iterable: iterable ? ["X", "Y"] : [0, 0],
            unit: unit 
        }
    },
    triple: (unit = null, iterable) => {
        return {
            iterable: iterable ? ["X", "Y", "Z"] : [0, 0, 0],
            unit: unit 
        }
    },
    color: () => {
        return {
            iterable: [
                {
                    label: "RGB",
                    default: [255,255,255]
                },
                {
                    label: "HSB",
                    default: [360, 100, 100]
                },
                {
                    label: "HEX",
                    default: ["#fffff"]
                }
            ]
        }
    }
}

export  const newSwitch = (swt) => {
                  
    switch (swt.type){
        case "single": 
            return defaultInputs.single()

        case "double":
            return defaultInputs.double(null, true)
  
    }
}

export const generateProperties = (listOfProperties, path) => {
    let propertyArray = []
    console.log(listOfProperties, path)
    listOfProperties.properties.map((property, index) =>{
        
        switch(property.type) {
            case "slider":
                propertyArray.push( <TextSlider 
                    id={property.id}
                    key={property.id} 
                    path={path}
                    propName={property.label} 
                    active={true} 
                    decimal={false} 
                    colorSlider={property.colorSlider || false}
                    maximum={property.max} 
                    minimum={property.min}
                    labelType={"normal"}
                    unit={null} 
                    
                    hasButton={false}/>)
                    break;
            case "switch":
               
              console.log(newSwitch(property.input), property.input , "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")

                    propertyArray.push(
                        <LabeledSwitch
                            key={property.id}
                            label={property.label}
                            labelType={"normal"}
                            input={newSwitch(property.input)}
                        />
                    )

                    break;
            case "number":
                const newNumberInput = (input) => {
                    switch (input.type){
                        case "single":
                            return defaultInputs.single(input.unit, input.iterable)
                       
                        case "double":
                            return defaultInputs.double(input.unit, input.iterable)
                        
                        case "triple": 
                            return defaultInputs.triple(input.unit, input.iterable)

                        case "colorPicker":
                            return defaultInputs.color()
                       
                    }
                }
               
                console.log("HERE")
                propertyArray.push(
                
                <LabeledInput 
                key={property.id}
                id={_uniqueId("LabeledInput-")}  
                label={property.label}  
                labelType={`${property.labelType}`}    
                hasButton={property.hasButton}  
                type={property.input.type}
                mainProperty={false}
                input={newNumberInput(property.input)}   />
                
                )

                    break;
            
        }
    })
    return propertyArray
}


export const generateInputs = (inputs, type = null) => {
    
    const inputIterable = inputs.iterable || [0]

    const inputArray = []   

    console.log(inputIterable)
    inputIterable.map((elem, index) => {
        
        const newiterable = (inputs.iterable && inputs.iterable[0] != 0) ? inputs.iterable[index] : ""
        const newUnit = (inputs.iterable && inputs.unit != null) ? inputs.unit : ""

        const newId = uuidv4()

        switch(type) {
            case "switch": 
            inputArray.push(<Switch key={newId} id={newId} axis={newiterable} unit={newUnit}  />)
            break;

            case "colorPicker": 
            console.log("COLORPICKER")
           
            inputArray.push(<Input key={newId} id={newId} unit={null} value={inputIterable[0].default[index]} color={true}/>)

            break;
            case "rangeInput":

            inputArray.push(<RangeInput key={newId} iterable={newiterable} unit={newUnit} />)

            break;

            default:
            inputArray.push(<Input key={newId} iterable={newiterable} unit={newUnit} />)
            break;
        }

    })
    
    return inputArray
}


export const payloadGenerator = (type) => {
    const newTabTypes = TextureTypes
  
    return {
      id: _uniqueId(`${type}-`),
      type: type,
      TextureTypes: newTabTypes
    }
  }

