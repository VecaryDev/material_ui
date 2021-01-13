import React, { useEffect, useState } from "react"

import Material from "../components/Material"


function MaterialList(){
    const [legacyCodeLoader, setLegacyCodeLoader] = useState("")

    const iframe = `<iframe src="https://vecarydev.github.io/MaterialList/" width="248" height="225"> </iframe>`
   
    return(
        <div id="matList" className="material_list" dangerouslySetInnerHTML={{__html: iframe}}>
            
       
        </div>
        // <div id="materialList" className="flex flex-col justify-start w-full px-2">

        //     <Material />
        //     <Material />
        //     <Material />
        //     <Material />

        // </div>
    )
}


export default MaterialList