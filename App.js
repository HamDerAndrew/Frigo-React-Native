import React from 'react';
import {Text,View, ActivityIndicator} from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './Components/Navigator';
import * as Font from 'expo-font';
import {store} from './redux/store';


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
      <Navigator />
    </Provider>
    );
  }
}