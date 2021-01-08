import React, {useState} from "react"
import _uniqueId from 'lodash/uniqueId';
import { v4 as uuidv4 } from 'uuid';

export const defaultImages = [{
    name: "texture_001.png",
    src: "https://i.pinimg.com/originals/2c/c1/3e/2cc13e6422218aa521474b36346b85f9.jpg",
    active: true
},{
    name: "texture_002.png",
    src: "https://image.shutterstock.com/z/stock-photo-white-crick-wall-texture-background-229832425.jpg",
    active: false
}]


export const ImageTabTypes = () => { return [
    {
        name: "Adjust",
        properties: [{
            id: uuidv4(),
            type: "slider",
            unit: "°",
            max: 180,
            min: -180,
            progress: 0,
            setProgress: (value) => {this.progress = value},
            rigid: true,
            label: "Hue"
        },
        {
            id: uuidv4(),
            type: "slider",
            unit: "°",
            max: 180,
            min: -180,
            progress: 0,
            setProgress: (value) => {this.progress = value},
            rigid: true,
            label: "Saturation"
        },
        {
            id: uuidv4(),
            type: "slider",
            unit: "°",
            max: 180,
            min: -180,
            progress: 0,
            setProgress: (value) => {this.progress = value},
            rigid: true,
            label: "Brightness"
        },
        {
            id: uuidv4(),
            type: "slider",
            unit: "°",
            max: 180,
            min: -180,
            progress: 0,
            setProgress: (value) => {this.progress = value},
            rigid: true,
            label: "Contrast"
        },
        {
            id: uuidv4(),
            type: "switch",
            label: "Invert",
            input: {
                type: "single",
                on: false
            }
        }
        ]
    },
    {
        name: "Transform",
        properties: [
        {
            id: uuidv4(),
            type: "number",
            label: "Tiling",
            labelType: "normal",
            hasButton: false,
            input: {
                type: "double",
                iterable: null,
                unit: null
            }
        },
        {
            id: uuidv4(),
            type: "number",
            label: "Offset",
            labelType: "normal",
            hasButton: false,
            input: {
                type: "double",
                iterable: null,
                unit: null
            }
        },
        {
            id: uuidv4(),
            type: "number",
            label: "Rotation",
            labelType: "normal",
            hasButton: false,
            input: {
                type: "single",
                iterable: null,
                unit: "°"
            }
        },
        {
            id: uuidv4(),
            type: "switch",
            label: "Invert",
            input: {
                type: "double",
                on: false
            }
        }
        ]
    },
    {
        name: "Overlay",
        properties: [{
            id: uuidv4(),
            type: "slider",
            unit: "°",
            colorSlider: true,
            max: 180,
            min: -180,
            rigid: true,
            label: "Hue"
        },
        {
            id: uuidv4(),
            type: "slider",
            unit: "°",
            colorSlider: true,
            max: 180,
            min: -180,
            rigid: true,
            label: "Saturation"
        },
        {
            id: uuidv4(),
            type: "slider",
            unit: "°",
            colorSlider: true,
            max: 180,
            min: -180,
            rigid: true,
            label: "Brightness"
        },
        {
            id: uuidv4(),
            type: "number",
            hasButton: true,
            input: {
                type: "colorPicker"
                
            }
        }
        ]
    }
]}


const GradientTabTypes = () => {
    return  [
        {
            name: "Adjust",
            properties: [{
                id: uuidv4(),
                type: "slider",
                unit: "°",
                colorSlider: true,
                max: 180,
                min: -180,
                rigid: true,
                label: "Hue"
            },
            {
                id: uuidv4(),
                type: "slider",
                unit: "°",
                colorSlider: true,
                max: 180,
                min: -180,
                rigid: true,
                label: "Saturation"
            },
            {
                id: uuidv4(),
                type: "slider",
                unit: "°",
                colorSlider: true,
                max: 180,
                min: -180,
                rigid: true,
                label: "Brightness"
            },
            {
                id: uuidv4(),
                type: "number",
                hasButton: true,
                input: {
                    type: "colorPicker"
                    
                }
            }
            ]
        },
        {
        name: "Transform",
        properties: [
        {
            id: uuidv4(),
            type: "number",
            label: "Tiling",
            labelType: "normal",
            hasButton: false,
            input: {
                type: "double",
                iterable: null,
                unit: null
            }
        },
        {
            id: uuidv4(),
            type: "number",
            label: "Offset",
            labelType: "normal",
            hasButton: false,
            input: {
                type: "double",
                iterable: null,
                unit: null
            }
        },
        {
            id: uuidv4(),
            type: "number",
            label: "Rotation",
            labelType: "normal",
            hasButton: false,
            input: {
                type: "single",
                iterable: null,
                unit: "°"
            }
        },
        {
            id: uuidv4(),
            type: "switch",
            label: "Invert",
            input: {
                type: "double",
                on: false
            }
        }
        ]
    }
]

}


const SolidTabTypes = () => {
    return [
        {
            name: "Adjust",
            properties: [{
                id: uuidv4(),
                type: "slider",
                unit: "°",
                colorSlider: true,
                max: 180,
                min: -180,
                rigid: true,
                label: "Hue"
            },
            {
                id: uuidv4(),
                type: "slider",
                unit: "°",
                colorSlider: true,
                max: 180,
                min: -180,
                rigid: true,
                label: "Saturation"
            },
            {
                id: uuidv4(),
                type: "slider",
                unit: "°",
                colorSlider: true,
                max: 180,
                min: -180,
                rigid: true,
                label: "Brightness"
            },
            {
                id: uuidv4(),
                type: "number",
                hasButton: true,
                input: {
                    type: "colorPicker"
                    
                }
            }
            ]
        },
    ]
}



export const TextureTypes  =() => {return [
    {name: "Image",
    active: true,
    tabTypes: ImageTabTypes()
    },
    {name: "Gradient",
    active: false,
    tabTypes: GradientTabTypes()
    }, 
    {name: "Solid",
    active: false,
    tabTypes: SolidTabTypes()
    },


]}

export const convertToColor = (hue, sat, brightness) => {
    return `hsl(${hue}, ${sat}%, ${brightness}%)`
}

export const convertToGradient = (...gradients) => {
    console.log(gradients)
}

export const gradients = {
    hue: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(254,255,0,1) 25%, rgba(0,254,255,1) 50%, rgba(252,0,255,1) 75%, rgba(255,0,0,1) 100%)",
    saturation:"linear-gradient(90deg, hsl(180,0%,50%) 0%, hsl(180,100%,50%) 100%)",
    brightness: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)"
}

