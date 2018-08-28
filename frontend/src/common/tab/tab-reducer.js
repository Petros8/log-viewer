const INITIAL_SATE = { selected: '', visible: {} }

export default ( state = INITIAL_SATE, action) => {

    switch(action.type) {
        case 'TAB_SELECTED':
            return { ...state, selected: action.payload }
        case 'FILTER_TABS':
            return { ...state, visible: action.payload }
        default:
            return state
    }

}