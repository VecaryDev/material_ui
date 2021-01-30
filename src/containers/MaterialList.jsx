import React, { useEffect, useState } from "react"

import Material from "../components/Material"


function MaterialList(){
    
    //This lives in a different GitHub page since it was already made in vanilla JS.

    const iframe = `<iframe src="https://vecarydev.github.io/MaterialList/" width="248" height="225"> </iframe>`
   
    return(
        <div id="matList" className="material_list" dangerouslySetInnerHTML={{__html: iframe}}>
            
       
        </div>
        
    )
}


export default MaterialList