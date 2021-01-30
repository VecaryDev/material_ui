import React from "react"

//Modify state on different action types

export const MaterialPropertyReducer =(state, action) => {

    switch (action.type) {
        case "ADD_ONE_PROP":
            return [
               ...state,
             state.filter(x => x.id === action.payload.id).length === 0 &&
             {       
                id: action.payload.id,
                name: action.payload.name,
                textureTypes: action.payload.textureTypes,
                images: action.payload.images ? action.payload.images : [] 
     }           
                    
                
            ]
            case "REMOVE_ONE_PROP": 
            return state.filter(item => item.id !== action.id)

            case "UPDATE_POPUP_PROPERTY": 
            const path = action.payload.path
            
            const newState = state
            newState[path.activeProperty]
            .textureTypes[path.activeTexture]
            .tabTypes[path.activeTab]
            .properties.filter(x => x.id === action.payload.id)[0]
            .progress = action.payload.progress
      
            return newState
            break;

            default: 
            return state
            
    } 
        

}