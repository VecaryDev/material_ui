import React, {useState} from "react"

import TextureButton from "../components/TextureButton"


function AddMaterial(props) {
    const {propName } = props
    const[state, setState] = useState(false)
    return(
        <div className="w-full h_24 flex justify-between px-4 my-4">
            <p className={`font-semibold text-sm text-primary`}>{propName || "Material"}</p>

            <TextureButton setOpenPopup={setState} openPopup={state} type="circle" />
        </div>
    )
}


export default AddMaterial