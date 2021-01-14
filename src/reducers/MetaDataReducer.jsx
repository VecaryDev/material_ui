

export const defaultMetaData = {
    activeTexturePopup: ""
}


export const MetaDataReducer =(state = defaultMetaData, action) =>  {
   
    switch (action.type) {
        case "ADD_ACTIVE_MATERIAL_POPUP" :
            return                  {
                    ...state,
                    activeTexturePopup: action.payload.id
                }

        case "CLOSE_POPUP": 
        return {
            ...state,
            activeTexturePopup: ""
        }
        case "ADD_WORKSPACE_REF":
            return {
                ...state,
                WorkspaceRef: action.payload.ref,
                grwothRef: action.payload.grwothRef
            }

        case "SET_SCROLL_OFFSET": 
            return {
                ...state,
                offsetY: action.payload.offsetY
            }
            
            default: 
            return state
    }
}