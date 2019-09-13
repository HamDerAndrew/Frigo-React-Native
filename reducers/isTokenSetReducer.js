const isTokenSetReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_USER_TOKEN':
            return action.token;
        default:
            return state;
    }
}

export default isTokenSetReducer;