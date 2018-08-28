const INITIAL_STATE = { list: [], selectedApp: {}, showModalConfirmDelete: false }

export default function(state = INITIAL_STATE, action){

    switch(action.type) {
        case 'APPS_FETCHED':
            return {...state, apps: action.payload.data}
        case 'APP_SELECTED':
            let newSelected = {...state.selectedApp}
            newSelected[action.payload.tabId] = {id: action.payload.data.id, logText: ''}
            return {...state, selectedApp: newSelected}
        case 'CLEAR_REQUESTED':
            delete state.selectedApp[action.payload.tabId]
            return {...state, selectedApp: {...state.selectedApp}}
        case 'CLEAR_LOG_TEXT':
            state.selectedApp[action.payload.tabId].logText = ''
            return {...state, selectedApp: {...state.selectedApp}}
        case 'NEW_LOG_TEXT_CHUNK':
            const target = state.selectedApp[action.payload.tabId]
            const actualText = target.logText
            let finalData = actualText.length > 250000 ? 
                action.payload.newText
                :
                actualText + action.payload.newText
            target.logText = finalData
            let preBox = document.getElementById('box-log')
            preBox.scrollTop = preBox.scrollHeight;
            return {...state, selectedApp: {...state.selectedApp}}
        case 'TOGGLE_MODAL_CONFIRM_DELETE_MODAL':
            return {...state, showModalConfirmDelete: action.payload.opened}
        default:
            return state
    }
    
}