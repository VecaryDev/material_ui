import React from "react"

function Tab(props){
    const {tabOptions, active, setActive} = props

    const handleClick = e => {
        const targetTab = parseInt(e.target.id.split("-")[1])
        setActive(targetTab)
    }

    return(
        <div className={`w-full flex grid-cols-${tabOptions.length} grid-rows-1 `}>
            {tabOptions.map((option, index) => {

                return <div key={index} 
                onClick={handleClick}
                id={`tab_index-${index}`}
                className={`normal-font w-full text-center h_24 border-b 
                ${active === index ? "border-primary text-primary font-semibold" : "text-softGrey border-softGrey"} `} 
                >{option.name}</div>

            })}
        </div>
    )
}


export default Tab