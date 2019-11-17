const isTokenSetReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_USER_TOKEN':
            return action.token;
        case 'UNSET_TOKEN':
            return null;
        default:
            return state;
    }
}

export default isTokenSetReducer;