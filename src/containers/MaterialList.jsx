import React, { useEffect, useState } from "react"



function MaterialList(){
    const [legacyCodeLoader, setLegacyCodeLoader] = useState("")

    const iframe = `<iframe src="https://vecarydev.github.io/MaterialList/" width="248" height="225"> </iframe>`
   
    return(
        <div id="matList" className="material_list" dangerouslySetInnerHTML={{__html: iframe}}>
            
       
        </div>
    )
}


export default MaterialList