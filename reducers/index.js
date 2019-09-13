import IsLoggedReducer from './IsLoggedReducer';
import { combineReducers } from 'redux';
import isTokenSetReducer from './isTokenSetReducer';

const allReducers = combineReducers({
    loggedIn: IsLoggedReducer,
    userToken: isTokenSetReducer
})

export default allReducers;