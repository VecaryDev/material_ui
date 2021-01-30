import React, { createContext, useReducer} from "react"
import combineReducers from 'react-combine-reducers';

import {MaterialPropertyReducer} from "../reducers/MaterialPropertyReducer"
import {MetaDataReducer, defaultMetaData} from "../reducers/MetaDataReducer"

//Initializing Context API. This serves as the local storage for the application and passes states between components

export const TexturePorpertyContext = createContext()
    
export const TexturePoropertyProvider = (props) => {
 
    const [globalStateReducer, initialGlobalState] = combineReducers({
        MetaData: [MetaDataReducer, defaultMetaData ],
        MaterialPorperties: [MaterialPropertyReducer, []]
        
      }); 
      const [globalState, dispatch] = useReducer(globalStateReducer, initialGlobalState )

    
    return(
        
        <TexturePorpertyContext.Provider value={{globalState, dispatch}}>
            {props.children}
        </TexturePorpertyContext.Provider>
    )
}