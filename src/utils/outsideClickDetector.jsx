
import React, {useEffect} from "react"



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
