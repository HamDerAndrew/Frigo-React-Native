const setItemsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_ITEMS':
            return action.items;
        default:
            //return empty array to avoid 'undefined' initialization of initial state.
            return state;
    }
}

export default setItemsReducer;