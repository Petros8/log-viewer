import uuid from 'uuid/v4'

const initialId = uuid()
const INITIAL_STATE = { tabs: [ { id: initialId, name: 'Aba 1' } ], 
    cachedTab: initialId, showInputLineModal: false }

const clearForceSelect = (state) => {
    delete state.cachedTab
}

const indexOfTabById = (state, tabId) => {
    for(let x = 0; x < state.tabs.length; x++) {
        if(state.tabs[x].id === tabId) {
            return x;
        }
    }
    return -1;
}

export default function(state = INITIAL_STATE, action){

    switch(action.type) {
        case 'NEW_TAB':

            clearForceSelect(state)
        
            let newTabs = [...state.tabs]
            let size = newTabs.length;
            let id = uuid()
            let name = 'Aba ' + ( size + 1 )

            newTabs.push({
                id,
                name
            })

            return {...state, tabs: newTabs, cachedTab: id}

        case 'APP_SELECTED':
            
            clearForceSelect(state)
            let indexSelected = indexOfTabById(state, action.payload.tabId)
            state.tabs[indexSelected].name = action.payload.data.shortname
            return {...state, tabs: [...state.tabs], cachedTab: action.payload.tabId}

        case 'CLEAR_REQUESTED':
            
            let indexCleared = indexOfTabById(state, action.payload.tabId)
            let tab = state.tabs[indexCleared]
            if(tab){
                clearForceSelect(state)
                tab.name = 'Aba ' + (indexCleared + 1)
            }
            
            return {...state, tabs: [...state.tabs]}

        case 'CLOSE_TAB':

            clearForceSelect(state)
            let indexClosed = indexOfTabById(state, action.payload.tabId)
            state.tabs.splice(indexClosed, 1)
            
            if(state.tabs.length > 0) {
                let lastTab = state.tabs[state.tabs.length-1]
                return {...state, tabs: [...state.tabs], cachedTab: lastTab.id}
            }
            
            return {...state, tabs: [...state.tabs]}

        case 'TOGGLE_INPUT_LINES_MODAL':
            return {...state, showInputLineModal: action.payload.opened}
        default:
            return state
    }
    
}