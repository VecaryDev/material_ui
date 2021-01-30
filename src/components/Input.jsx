import React, { useEffect, useRef, useState, useContext } from "react";

import ArrowGrow from "../img/Symbols/Sprites/ArrowUpDown.svg";

import { TexturePorpertyContext } from "../context/texturePropertyContext";

import { v4 as uuidv4 } from "uuid";
import {  addSelfDestructingEventListener,  pauseEvent } from "../TestData/functions";

function Input(props) {
    //Basic input properties
  const { iterable, unit, color, value } = props;

    //There is only one range slider Cursor in the app, and the globalstate has a reference to it
  const { globalState, dispatch } = useContext(TexturePorpertyContext);

  //The value displayed in the input field
  const [dynamicValue, setDynamicValue] = useState(false);

  // rate of change by dragging. Based on the motion of the cursor (y: -3 -> Up, y: 3 -> Down)
  const [multiplyer, setMultiplyer] = useState({ x: 0, y: 0 });

  //either active or inactive
  const [sliderState, setSliderState] = useState("");

  // The position of the Slider cursor
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  //Hover is triggered based on parent. Can be repleaced with CSS
  const [hover, setHover] = useState(false);

  //Delays the execution of Dragging by registrationTimer<variable>, is set in executeSliderChange 
  const [update, setUpdate] = useState(false);

  //saved if shift iis held down. used for multi key hotkey e.g. shift + arrowLeft
  const [shiftDown, setShiftDown] = useState(false);

  //saves the text selection
  const [selection, setSelection] = useState([]);

  //save selectionStart if shift is held down
  const [savedSelectionStart, setSavedSelectionStart] = useState(0)

  //the input element reference
  const inputRef = useRef(null);

  //Reference to the range cursor which is saved to the global state in Context
  const sliderCursor = globalState.MetaData.grwothRef.current;

  //list of supported operators
  const operatorKeycodes = ["+", "-", "*", "/"];

  //delay of the dragging to be registered in miliseconds
  const registrationTimer = 0;


  //Update value if dragging is on
  useEffect(() => {
    if (update) {
        //set value - parsed to remove unit, than added the change ~ <-3, 3>, inverted and unit added to the end
      setDynamicValue((parseInt(dynamicValue) + multiplyer.y * -1) + unit);
      //setting range cursor position, with additional catches e.g. if it is on the top of the screen
      //move it to the bottom, and do not allow it to exit the screen horizontally
      const newPos = {
        x:
          cursorPos.x + multiplyer.x > window.innerWidth - 25
            ? window.innerWidth - 25
            : cursorPos.x + multiplyer.x < 0
            ? 0
            : cursorPos.x + multiplyer.x,
        y:
          cursorPos.y + multiplyer.y > window.innerHeight
            ? 0
            : cursorPos.y + multiplyer.y > 0
            ? cursorPos.y + multiplyer.y
            : window.innerHeight,
      };

      setCursorPos(newPos);
      //console.log(newPos, cursorPos);

      //set Cursor Position
      sliderCursor.style.top = `${cursorPos.y}px`;
      sliderCursor.style.left = `${cursorPos.x}px`;

      // sliderCursor.style.left = `${e.clientX}px`
    }
  }, [multiplyer, update]);


//saves the rate of movement to multiplyer
  function moveCallback(e) {
    var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
      movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    sliderCursor.classList.remove("hidden");

    if (inputRef !== null) {
      setMultiplyer({ x: movementX, y: movementY });
    }
  }

//sets the initial value for the cursor
  useEffect(() => {
    if (inputRef !== null) {
     
      setCursorPos({
        x: inputRef.current.getBoundingClientRect().x + 35,
        y: inputRef.current.getBoundingClientRect().top,
      });
      console.log(globalState.MetaData.offsetY);
    }
  }, [globalState.MetaData]);

  
  //adds an Event listener if dragging happens, and removes it if it is stopped
  //connected to the PointerLock which is set below
  function changeCallback(e) {
    if (inputRef !== null) {
      if (
        document.pointerLockElement === inputRef.current ||
        document.webkitPointerLockElement === inputRef.current
      ) {
        if (sliderState !== "active") {
          //  console.log("Added")
          document.addEventListener("mousemove", moveCallback, true);
          setSliderState("active");
        }
      } else {
        if (sliderState !== "inactive") {
          setUpdate(false);
          sliderCursor.classList.add("hidden");
          document.removeEventListener("mousemove", moveCallback, true);
          setSliderState("inactive");
        }
      }
    }
  }

  //PointerLock events and default value initialized
  useEffect(() => {
    document.addEventListener("pointerlockchange", changeCallback, false);
    document.addEventListener("mozpointerlockchange", changeCallback, false);
    document.addEventListener("webkitpointerlockchange", changeCallback, false);

    // Hook mouse move events
    setDynamicValue(0 + unit);
  }, []);

 
  
  const handleSelect = (e) => {
    if(selection === undefined){
      e.target.select()
    }
  };


  //executes when the mouse is released 
  function onSliderChangeEnd() {

    //initialize exitPointerLock
    document.exitPointerLock =
      document.exitPointerLock ||
      document.mozExitPointerLock ||
      document.webkitExitPointerLock;

      //removes the event listener which is responsible for changing the value while dragging
    document.removeEventListener("mousemove", moveCallback, true);

    document.exitPointerLock();

    //selects the input
    inputRef.current.select();

    //resets the cursor and multipyer
    sliderCursor.style.top = `0px`;
    sliderCursor.style.left = `0px`;
    if (sliderCursor.classList !== undefined) {
      sliderCursor.classList.add("hidden");
      const nullValue = {
        x: 0,
        y: 0,
      };
      setCursorPos({
        x: inputRef.current.getBoundingClientRect().x + 50,
        y: inputRef.current.getBoundingClientRect().top,
      });
      setMultiplyer(nullValue);
      console.log();
    }
  }

 
//The start of the dragging event
  function executeSliderChange(e) {
    const element = inputRef.current;

    setCursorPos({
      x: inputRef.current.getBoundingClientRect().x + 50,
      y: inputRef.current.getBoundingClientRect().top,
    });

    
    element.requestPointerLock =
      element.requestPointerLock ||
      element.mozRequestPointerLock ||
      element.webkitRequestPointerLock;
    // Ask the browser to lock the pointer

    element.requestPointerLock();

    //depays the dragging event to be fired
    setTimeout(() => {
      setUpdate(true);
      setHover(false)
      element.focus()
      
    }, registrationTimer);

    //this event listener only runs once, and then destoryed
    addSelfDestructingEventListener(window, "mouseup", onSliderChangeEnd);
  }

  //if Enter is pressed or clicked outside the input
  const handleBlur = (e) => {
    let hasOperation = false;
    console.log("removeCHanges")
    sliderCursor.classList.add("hidden")
    document.getSelection().removeAllRanges()

    operatorKeycodes.map((keycode) => {
      if (e.target.value.includes(keycode)) {
          if(unit !== undefined){
              const stringifiedValue = `${e.target.value}`
            const processedValue = stringifiedValue.replace(unit, "")
            try{
                setDynamicValue(eval(processedValue) + unit);
            } catch {
                if(e instanceof SyntaxError ){
                    console.log("syntax error")
                    setDynamicValue(parseInt(dynamicValue) + unit);
                }else {
                    console.log("error")
                    setDynamicValue(parseInt(dynamicValue) + unit);
                    
                }
            }
           

          }else{
            setDynamicValue(eval(e.target.value) + unit);
          }
        
        hasOperation = true;
      }
    });

    if (!hasOperation) {
      setDynamicValue(parseInt(dynamicValue) + unit);
    }
  }

  //Actions on different keys / key combinations
  function handleKeyDown(e) {
    e.preventDefault();

    if (e.code === "ArrowUp") {
      console.log("ArrowUp");
      e.preventDefault();
      setDynamicValue((parseInt(dynamicValue) + 1) + unit);
    } else if (e.code === "ArrowDown") {
      console.log("arrowDown");
      e.preventDefault();
      setDynamicValue((parseInt(dynamicValue) - 1) + unit);
    } else if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
      if (shiftDown) {
        if (e.code === "ArrowRight") {
          console.log(selection, "SHOFT");
          e.target.selectionStart = savedSelectionStart - 1;
          e.target.selectionEnd += 1
        } else {
          e.target.selectionStart -= 1;
        }
      } else {
        setSavedSelectionStart(e.target.selectionStart)
        if (e.code === "ArrowRight") {
          console.log(selection);
          e.target.selectionEnd += 1;
          e.target.selectionStart = e.target.selectionEnd;
        } else {
          e.target.selectionEnd -= 1;
          e.target.selectionStart = e.target.selectionEnd;
        }
      }
    } else if (/\d/.test(e.code)) {
      console.log("Number");
      const splitValue = `${dynamicValue}`.split("");
     

      if (splitValue.length === 1 && splitValue[0] == 0) {
        splitValue.pop();
      }

      console.log(splitValue, splitValue.length, splitValue[0]);
      if (selection !== undefined) {
        splitValue.splice(
          selection.selectionStart,
          selection.selectionLength,
          `${e.key}`
        );
        console.log(e.code);
        setDynamicValue(splitValue.join(""));
      } else {
        splitValue.splice(e.target.selectionStart, 0, `${e.key}`);
        console.log(e.code);
        setDynamicValue(splitValue.join(""));
      }

      // console.log(e.key, dynamicValue, dynamicValue + `${e.key}`,
      // e.target.selectionStart , e.target.selectionEnd )
    } else if (
      e.code === "Backspace" ||
      e.code === "Delete" ||
      e.code === "Space"
    ) {
        const splitValue = `${dynamicValue}`.split("");
        console.log(selection);
        if (selection !== undefined) {
          console.log(splitValue, selection.selectionStart)
        splitValue.splice(selection.selectionStart, selection.selectionLength);
      
        if (splitValue.length !== 0) {
          setDynamicValue(splitValue.join(""));
        } else {
          setDynamicValue(0);
        }

      }else {
        console.log("splitValue");
          if(e.code === "Backspace"){
              splitValue.splice(e.target.value.length - 1, 1)
              
              if(splitValue.length > 0) {
                setDynamicValue(splitValue.join(""))
              }else {
                  setDynamicValue(0)
              }
          }
      }
    } else if (operatorKeycodes.includes(e.key)) {
      console.log("operator");

      const splitValue = `${dynamicValue}`.split("");
      splitValue.splice(e.target.selectionStart, 0, `${e.key}`);
      console.log(e.key, splitValue.join(""));
      setDynamicValue(splitValue.join(""));
    } else if (e.key === "Enter") {
      console.log("enter");

      handleBlur(e);

      e.target.blur();
    } else if (e.key === "Shift") {
      setShiftDown(true);
    } else {
      console.log("ELSE");
    }
  }

  //Redefining Text selection because we have prevented default by having a custom onKeyDown behavior
  function handleSelection(e) {
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
   

    
    if (start === end) {
      setSelection(undefined);
      //inputRef.current.select()
    } else {
      console.log(start, end )
      setSelection({
        selectionStart: start,
        selectionLength: end - start,
      });
    }
  }

  //if shift is released
  function handleKeyUp(e) {
    if (e.key === "Shift") {
      setShiftDown(false);
    }
  }

  useEffect(() => {
    // console.log(dynamicValue)
  }, [dynamicValue]);

  return (
    <div
      onMouseOver={() => {
        setHover(true);
       
        
      }}
      onMouseLeave={() => {
        setHover(false);
        sliderCursor.classList.add("hidden");

      }}
      className={`${
        color ? "w_32 ml-1" : "w_56 ml-1"
      } h_24 relative flex items-center `}
    >
      <input
        id={uuidv4()}
        onClick={handleSelect}
        onDrag={pauseEvent}
        onMouseLeave={() => {setHover(false)}}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onDrop={pauseEvent}
        onBlur={handleBlur}
        onSelect={handleSelection}
        ref={inputRef}
        value={dynamicValue}
        
        defaultValue={`${color ? value : `0${unit}`}`}
        className={`bg-lightGrey w-full h-full focus:outline-none  focus:ring-1 focus:ring-primary  rounded ${
          iterable ? "pl-4" : "pl-1"
        } normal-font defaultCursor`}
      />{" "}
      
        <div  onDrag={pauseEvent} onMouseDown={executeSliderChange} className={`${hover ? "flex" : "hidden"} absolute right-0 h_24  items-center z-50 bg-lightGrey rounded RangeSlider`}>
          <img onDrag={pauseEvent} className="" src={ArrowGrow} />
        </div>
      
      {iterable && (
        <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>
      )}
    </div>
  );
}

export default Input;
