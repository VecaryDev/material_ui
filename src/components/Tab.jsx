import React from "react"

function Tab(props){
    const {tabOptions, active, setActive} = props

    const handleClick = e => {
        const targetTab = parseInt(e.target.id.split("-")[1])
        setActive(targetTab)
    }

    return(
        <div className={`w-full grid grid-cols-${tabOptions.length} `}>
            {tabOptions.map((option, index) => {

                return <div key={index} 
                onClick={handleClick}
                id={`tab_index-${index}`}
                className={`text-xs w-full text-center h_24 border-b cursor-pointer
                ${active === index ? "border-primary text-primary font-semibold" : "text-softGrey border-softGrey"} `} 
                >{option.name}</div>

            })}
        </div>
    )
}


export default Tab