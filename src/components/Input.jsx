import React, { useEffect, useRef, useState, useContext } from "react";

import ArrowGrow from "../img/Symbols/Sprites/ArrowUpDown.svg";

import { TexturePorpertyContext } from "../context/texturePropertyContext";

import { v4 as uuidv4 } from "uuid";

import {
  addSelfDestructingEventListener,
  pauseEvent,
} from "../TestData/functions";

function Input(props) {
  const { iterable, unit, color, value } = props;
  const { globalState, dispatch } = useContext(TexturePorpertyContext);
  const [dynamicValue, setDynamicValue] = useState(false);
  const [multiplyer, setMultiplyer] = useState({ x: 0, y: 0 });
  const [sliderState, setSliderState] = useState("");

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [growIcon, setGrowIcon] = useState(ArrowGrow);
  const [update, setUpdate] = useState(false);
  const [shiftDown, setShiftDown] = useState(false);

  const [selection, setSelection] = useState([]);

  const [inputCoordinates, setInputCoordinates] = useState(null);

  const inputRef = useRef(null);

  const sliderCursor = globalState.MetaData.grwothRef.current;

  let limit = 0.1;

  const operatorKeycodes = ["+", "-", "*", "/"];

  const registrationTimer = 400;

  useEffect(() => {
    if (update) {
      setDynamicValue(dynamicValue + multiplyer.y * -1);
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
      console.log(newPos, cursorPos);

      sliderCursor.style.top = `${cursorPos.y}px`;
      sliderCursor.style.left = `${cursorPos.x}px`;

      // sliderCursor.style.left = `${e.clientX}px`
    }
  }, [multiplyer, update]);

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

  function moveCallback(e) {
    var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
      movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    sliderCursor.classList.remove("hidden");

    if (inputRef !== null) {
      setMultiplyer({ x: movementX, y: movementY });
    }
  }

  useEffect(() => {
    if (inputRef !== null) {
      setInputCoordinates(inputRef.current.getBoundingClientRect());
      setCursorPos({
        x: inputRef.current.getBoundingClientRect().x + 35,
        y: inputRef.current.getBoundingClientRect().top,
      });
      console.log(globalState.MetaData.offsetY);
    }
  }, [globalState.MetaData]);

  useEffect(() => {
    document.addEventListener("pointerlockchange", changeCallback, false);
    document.addEventListener("mozpointerlockchange", changeCallback, false);
    document.addEventListener("webkitpointerlockchange", changeCallback, false);

    // Hook mouse move events
    setDynamicValue(0);
  }, []);

  const handleInputChange = (e) => {
    let newInput = e.target.value.split(`${unit}`).join("");

    setDynamicValue();
  };
  const handleSelect = (e) => {};

  function tryit() {
    document.exitPointerLock =
      document.exitPointerLock ||
      document.mozExitPointerLock ||
      document.webkitExitPointerLock;

    document.removeEventListener("mousemove", moveCallback, true);

    document.exitPointerLock();

    inputRef.current.select();

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

  function executeSliderChange(e) {
    const element = e.target;

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

    setTimeout(() => {
      setUpdate(true);
    }, registrationTimer);

    addSelfDestructingEventListener(window, "mouseup", tryit);
  }

  const handleBlur = (e) => {
    let hasOperation = false;

    operatorKeycodes.map((keycode) => {
      if (e.target.value.includes(keycode)) {
        setDynamicValue(parseInt(eval(e.target.value)));
        hasOperation = true;
      }
    });

    if (!hasOperation) {
      setDynamicValue(parseInt(dynamicValue));
    }
  }

  function handleKeyDown(e) {
    e.preventDefault();

    if (e.code === "ArrowUp") {
      console.log("ArrowUp");
      e.preventDefault();
      setDynamicValue(dynamicValue + 1);
    } else if (e.code === "ArrowDown") {
      console.log("arrowDown");
      e.preventDefault();
      setDynamicValue(dynamicValue - 1);
    } else if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
      if (shiftDown) {
        if (e.code === "ArrowRight") {
          console.log(e.target.selectionStart);
          e.target.selectionStart += 1;
        } else {
          e.target.selectionStart -= 1;
        }
      } else {
        if (e.code === "ArrowRight") {
          console.log(e.target.selectionStart);
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
      console.log("delete");
      if (selection !== undefined) {
       
        splitValue.splice(selection.selectionStart, selection.selectionLength);

        if (splitValue.length !== 0) {
          setDynamicValue(splitValue.join(""));
        } else {
          setDynamicValue(0);
        }
      }else {
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

  function handleSelection(e) {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    if (start === end) {
      setSelection(undefined);
    } else {
      setSelection({
        selectionStart: start,
        selectionLength: end - start,
      });
    }
  }

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
        setGrowIcon(ArrowGrow);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={`${
        color ? "w_32 ml-1" : "w_56 ml-1"
      } h_24 relative flex items-center `}
    >
      <input
        id={uuidv4()}
        onClick={handleSelect}
        onDrag={pauseEvent}
        onMouseDown={executeSliderChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onDrop={pauseEvent}
        onBlur={handleBlur}
        onSelect={handleSelection}
        ref={inputRef}
        value={dynamicValue}
        onChange={handleInputChange}
        defaultValue={`${color ? value : `0${unit}`}`}
        className={`bg-lightGrey w-full h-full rounded ${
          iterable ? "pl-4" : "pl-1"
        } normal-font RangeSlider`}
      />{" "}
      {hover && (
        <div className="absolute right-0 h_24 flex items-center pointer-events-none ">
          <img onDrag={pauseEvent} className="" src={growIcon} />
        </div>
      )}
      {iterable && (
        <p className="normal-font absolute pl-1 text-midGrey">{iterable}</p>
      )}
    </div>
  );
}

export default Input;
