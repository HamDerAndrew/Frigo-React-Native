import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import AllReducers from './reducers/index'; 
import { Provider, useSelector } from 'react-redux';
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

//console.log(store.getState());