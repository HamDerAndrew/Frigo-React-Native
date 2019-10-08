import IsLoggedReducer from './IsLoggedReducer';
import { combineReducers } from 'redux';
import isTokenSetReducer from './isTokenSetReducer';
import setItemsReducer from './setItemsReducer';

const allReducers = combineReducers({
    loggedIn: IsLoggedReducer,
    userToken: isTokenSetReducer,
    contentItems: setItemsReducer
})

export default allReducers;