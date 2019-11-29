import { combineReducers } from 'redux';
import setItemsReducer from './setItemsReducer';

const allReducers = combineReducers({
    contentItems: setItemsReducer
})

export default allReducers;