import React, { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"

import {map_range} from "../utils/remap"


function GradientView() {
    const [knotStartPos, setknotStartPos] = useState({
        x: 10,
        y: 190
    })
    const [knotEndPos, setknotEndPos] = useState({
        x: 190,
        y: 10
    })
    const [gradientAngle, setGradeintAngle] = useState(0)
    const [lineCoordinates, setLineCoordinates] = useState({})
    const [activeKnot, setActiveKnot] = useState({
        start:true,
        end: false
    })
    const [update, setUpdate] = useState(null)
    const [gradientArea, setGradientArea] = useState(null)
    const [vectorLength, setVectorLength] = useState(0)
    const [gradientEndPoints, setGradientEndPoints] = useState({
        start: 0,
        end: 100
    })
    const gradientBoxRef = useRef(null)
 
    const knot1 = useRef(null)
    const knot2 = useRef(null)






    useEffect(()=> {

        
        const lineVector = {
            x: knotEndPos.x - knotStartPos.x,
            y: knotEndPos.y - knotStartPos.y,
           
        }

        const lineVectorLength =   Math.sqrt(Math.pow(lineVector.x, 2) + Math.pow(lineVector.y, 2))

        setVectorLength(lineVectorLength)
        console.log("update")
    //  console.log("the Vector of the parametric line:" +  `216 = ${knotStartPos.x} +  ${lineVector.x}t,` + ` y = ${knotStartPos.y} + t * ${lineVector.y}` )
        
    //   console.log(`0 = ${knotStartPos.x} + t * ${lineVector.x}`)
    //   console.log(`t = ${knotStartPos.x * -1} / ${lineVector.x}`)

    

      const getParametricEquasion = (value, axis) => {
          if(axis === "x"){
            return (value - knotStartPos.x) / lineVector.x 
          }else {
            return (value - knotStartPos.y) / lineVector.y 
          }
      } 

      //console.log(`t = ${getParametricEquasion(0, "x")} , ${getParametricEquasion(216, "x")}, ${getParametricEquasion(0, "y")} , ${getParametricEquasion(216, "y")}`)
      
      const left =  {
          label: "left",
          value: (knotStartPos.y + (getParametricEquasion(0, "x") * lineVector.y)),
          supplementaryValue: {
              x: 0
          }
      }
      const right = {
          label: "right",
          value:  (knotStartPos.y + (getParametricEquasion(216, "x") * lineVector.y)),
          supplementaryValue: {
              x: 216
          }
      }
      const top = {
          label: "top",
          value : (knotStartPos.x + (getParametricEquasion(0, "y") * lineVector.x)),
          supplementaryValue: {
              y: 0
          }
      }
      const bottom = {
          label: "bottom",
          value: (knotStartPos.x + (getParametricEquasion(216, "y") * lineVector.x)),
          supplementaryValue: {
              y: 216
          }
      }

     function getCollisionCoordinates() {
        const collisionCoordinates = []

        const collisionEdges = [top, left, bottom, right].filter(x => x.value >= 0 && x.value <= 216).map(i => {
          
          let newCoordinate = {}
            if(i.supplementaryValue.x === undefined){
                
              newCoordinate = {
                  label: i.label,
                  x: i.value,
                  y: i.supplementaryValue.y
              }
            
            }else if(i.supplementaryValue.y === undefined) {
             
              newCoordinate = {
                  label: i.label,
                  x: i.supplementaryValue.x,
                  y: i.value
              } 
             
  
            }
            collisionCoordinates.push(newCoordinate)
        })  
        return collisionCoordinates
     }

     const collisionVector = {
         x: getCollisionCoordinates()[1].x - getCollisionCoordinates()[0].x,
         y: getCollisionCoordinates()[1].y  - getCollisionCoordinates()[0].y
     }
     const startPercentage = (knotStartPos.x - getCollisionCoordinates()[0].x) / collisionVector.x
     
     const endPercentage = (knotEndPos.x - getCollisionCoordinates()[0].x) / collisionVector.x


     //45 -135

  
     function invertIfAboveCertanAngle(percentage) {
         return gradientAngle <45 && gradientAngle > -135 ?  parseInt(Math.abs(100 - (percentage * 100))) :  parseInt(endPercentage * 100)
     }
   
        //console.log(getCollisionCoordinates(), collisionVector, startPercentage, endPercentage)

     setGradientEndPoints({
        start: startPercentage > endPercentage ? parseInt(endPercentage * 100) : parseInt(startPercentage * 100),
        end:  startPercentage > endPercentage ? parseInt(startPercentage * 100) : parseInt(endPercentage * 100)
     })

        const result = () => {
            const degreeFromCosin = Math.floor(Math.acos(lineVector.y / lineVectorLength) * (180 / Math.PI) ) 
            const sinValue = Math.asin(lineVector.x / lineVectorLength)

            if(sinValue > 0){
                //console.log(sinValue, Math.acos(lineVector.y / lineVectorLength))
                return degreeFromCosin * -1
            }else {
               // console.log(Math.acos(lineVector.y / lineVectorLength))
                return degreeFromCosin
            }
        }
        setGradeintAngle(result()  )
        setLineCoordinates({
            startX: map_range(knotStartPos.x, 0, 100, 0, 216),
            startY: map_range(knotStartPos.y, 0, 100, 0, 216),
            endX: map_range(knotEndPos.x, 0, 100, 0, 216),
            endY: map_range(knotEndPos.y, 0, 100, 0, 216)
        })





    }, [knotEndPos, knotStartPos, update])

    useEffect(() => {
      //  console.log(gradientEndPoints, gradientAngle)
    }, [gradientEndPoints])

    useEffect(() => {
        if(gradientBoxRef !== null) {
            const boundingBox = gradientBoxRef.current.getBoundingClientRect()
            setGradientArea(boundingBox)
        }
    }, [gradientBoxRef])

    function handlePositionChange(e, setState, state) {
        

        if(gradientArea !== null) {
            const knotStartPosX = e.x - gradientArea.x
            const knotStartPosY = e.y - gradientArea.y
         //  console.log(knotStartPosY)

            if(knotStartPosX > 0 && knotStartPosY > 0){
                if(knotStartPosX < 216 || knotStartPosY < 216){
                    if(knotStartPosX < 216 && knotStartPosY > 216) {
                        setState({...state, x: knotStartPosX})
                    }else if(knotStartPosX > 216 && knotStartPosY < 216){
                        setState({...state, y: knotStartPosY})
                    }else{
                        setState({x: knotStartPosX, y:knotStartPosY})
                    }
                }else{
                    setState({y: 100, x: 100})
                }
            }else{
                if(knotStartPosX < 0 && knotStartPosY > 0){
                    setState({...state, x: 0})

                }else if(knotStartPosX > 0 && knotStartPosY < 0){
                    setState({...state, y: 0})
                }else{
                    setState({x: 0, y: 0})
                }
               
            }

           
        }
        
    }

    function  updatePosition(e) {
       //console.log(e.x)

        switch (e.target.id) {
            case "knot1": 
                handlePositionChange(e, setknotStartPos, knotStartPos)
            break;
            case "knot2":
                handlePositionChange(e, setknotEndPos, knotEndPos)
            break;
        }

        setUpdate(Math.random())
       
       
        
    }

    function handleClick(e) {
        console.log(e.target)
       
        if(e.target === knot1.current || e.target.parentNode === knot1.current){
            setActiveKnot({
                start: true,
                end: false
            })
        }else if( e.target === knot2.current || e.target.parentNode === knot2.current){
            setActiveKnot({
                start: false,
                end: true
            })
        }
        
    }

    function handleMouseDown(e) {
        
        if(e.target === knot1.current || e.target.parentNode === knot1.current){
            console.log(e.target)
        }
    }

    

    return(
       <div className="w-full h-full" ref={gradientBoxRef} style={{
           background: `linear-gradient(${gradientAngle  }deg, #545FD9 ${gradientEndPoints.start}%,  #BC93FF ${gradientEndPoints.end}%)`
       }}>
            <Draggable
            defaultPosition={{x: 10, y: 190}}
            onDrag={updatePosition}
            
        
        bounds="parent"
        >
            <div 
           
            onMouseDown={handleClick}
            id="knot1" ref={knot1}className={`${activeKnot.start ? "w-5 h-5" : "w-3 h-3"} rounded-xl flex justify-center items-center z-10 absolute bg-almostWhite`}>
            <div
             onMouseDown={handleClick}
            className=" rounded-xl " style={{
                background: "#BC93FF",
                width: activeKnot.start ? "14px": "6px",
                height: activeKnot.start ? "14px": "6px"
            }}>

               

            </div>
            </div>
          

        </Draggable>

       
          
        <Draggable
         onDrag={updatePosition}

         defaultPosition={{x: 190, y: 10}}
        bounds="parent"
        >
            
            <div 
             onMouseDown={handleClick}
            
            id="knot2" ref={knot2} className={`${activeKnot.end ? "w-5 h-5" : "w-3 h-3"} rounded-xl flex justify-center items-center z-10 absolute bg-almostWhite`}>
                <div
                 onMouseDown={handleClick}
                className=" bg-primary rounded-xl " style={{
                    width: activeKnot.end ? "14px": "6px",
                    height: activeKnot.end ? "14px": "6px"
                }}></div>
            </div>
          

        </Draggable>
      
       </div>
    )
    
}

export default GradientView