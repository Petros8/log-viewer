export function selectTab(tabId) {
    return {
        type: 'TAB_SELECTED',
        payload: tabId
    }
}

export function showTabs(...tabIds) {
    
    const tabsToShow = {}
    tabIds.forEach(e => tabsToShow[e] = true)

    return {
        type: 'FILTER_TABS',
        payload: tabsToShow
    }
}

export function newTab() {
    return {
        type: 'NEW_TAB'
    }
}

export function closeTab(tabId) {
    return [{
        type: 'CLEAR_REQUESTED',
        payload: {
            tabId
        }
    }, {
        type: 'CLOSE_TAB',
        payload: {
            tabId
        }
    }]
}