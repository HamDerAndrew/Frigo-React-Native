import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger';
 
 
const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}
 
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer, 
  //initial state
  {
      loggedIn: false,
      userToken: '',
      contentItems: []
  },
  applyMiddleware(logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

export const persistor = persistStore(store);
 
/* export default () => {
  let store = createStore(persistedReducer, applyMiddleware(logger));
  let persistor = persistStore(store);
  return { store, persistor }
} */