import React from 'react';
import { createStore } from 'redux';
import AllReducers from './reducers/index'; 
import { Provider } from 'react-redux';
import Navigator from './Components/Navigator';

const store = createStore(
  AllReducers, 
  //initial state'
  {
    loggedIn: false,
    userToken: ''
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}