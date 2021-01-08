import React, {useEffect} from "react"

export function map_range(value, low1, high1, low2, high2) {
    return Math.floor(low2 + ((high2 - low2) * (value - low1)) / (high1 - low1))
}

export function map_float_range(value, low1, high1, low2, high2) {
    return (low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)).toFixed(3)
}


export function useOutsideClickDetection(ref, setProp) {
    useEffect(() => {

        function handleClikcOutseideElement(event){
            if(ref.current && !ref.current.contains(event.target)){
               setProp(false)
            }
        }


        document.addEventListener("mousedown", handleClikcOutseideElement)

        return ()=> {
            document.addEventListener("mousedown", handleClikcOutseideElement)
           
        }

    }, [ref])
}


export function useOutsideClickDetectionSwitch(ref, setProp, prop) {
    useEffect(() => {

        function handleClikcOutseideElement(event){
            if(ref.current && !ref.current.contains(event.target)){
               setProp(!prop)
            }
        }


        document.addEventListener("mousedown", handleClikcOutseideElement)

        return ()=> {
            document.addEventListener("mousedown", handleClikcOutseideElement)
           
        }

    }, [ref])
}


export function setDefaultTexture(payload, id){
        
    payload.img = [{
        name: "texture_001.png",
        src: "https://i.pinimg.com/originals/2c/c1/3e/2cc13e6422218aa521474b36346b85f9.jpg",
        active: true
    },{
        name: "texture_002.png",
        src: "https://image.shutterstock.com/z/stock-photo-white-crick-wall-texture-background-229832425.jpg",
        active: false
    }]
    payload.id = id
   }
