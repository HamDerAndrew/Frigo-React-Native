import { createStore } from 'redux';
import AllReducers from './reducers/index'; 


export const store = createStore(
  AllReducers, 
  //initial state
  {
      contentItems: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );