import React from 'react';
import {Text,View, ActivityIndicator} from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import Navigator from './Components/Navigator';
import * as Font from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'nunitobold' : require('./assets/fonts/nunitobold.ttf'),
      'nunitosemibold' : require('./assets/fonts/nunitosemibold.ttf'),
      'nunitoregular' : require('./assets/fonts/nunitoregular.ttf'),
    });
    this.setState({ fontLoaded: true })
  }
  
render() {
  const {fontLoaded} = this.state;

  while(!fontLoaded) {
    return(
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center', backgroundColor: '#1B3ACA'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Navigator />
      </PersistGate>
    </Provider>
    );
  }
}