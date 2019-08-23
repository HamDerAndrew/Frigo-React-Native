import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Dimensions, Button, AsyncStorage } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import MainPage from './MainPage';
import PurchasePage from './PurchasePage';
import ProcessModal from './ProcessModal';
import HistoryPage from './HistoryPage';

class LoginPage extends Component {
    static navigationOptions = {
        title: 'Log in',
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#1B3ACA' }}>
                <ImageBackground source={require('../assets/images/large/login.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={loginStyles.headerContainer}>
                        <Text style={loginStyles.headerTitle}>Log in</Text>
                    </View>
                    <View style={loginStyles.loginContainer}>
                        <View style={loginStyles.inputContainer}>
                            <TextInput style={loginStyles.inputStyle} value={'E-mail'} />
                            <TextInput style={loginStyles.inputStyle} value={'Password'} />
                        </View>
                    </View>
                    <View style={ loginStyles.loginBtnContainer }>
                        <TouchableHighlight style={loginStyles.loginBtn} underlayColor='transparent' activeOpacity={.3} onPress={ this._signInAsync }>
                            <Text style={loginStyles.loginBtnText}>Log In</Text>
                        </TouchableHighlight>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('Main');
    }
}

var windowWidth = Dimensions.get('window').width;
var totalWidth = windowWidth / 1.2;

const loginStyles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 30
    },
    headerContainer: {
        flex: .3,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 35,
        color: 'white',
    },
    inputContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    inputStyle: {
        backgroundColor: 'white',
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'stretch'
    },
    loginBtnContainer: {
        flex: .5, 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        paddingBottom: 40
    },
    loginBtn: {
        backgroundColor: '#173BD1',
        borderRadius: 35,
        padding: 20,
        width: totalWidth,
        justifyContent: 'center',
    },
    loginBtnText: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 22
    }
});

/* const HomeStack = createStackNavigator(
    {
      AppMain: {
        screen: MainPage,
      },
      Purchase: {
        screen: PurchasePage,
      },
      ModalWindow: {
        screen: ProcessModal,
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#EFF2F5'
        },
        headerTintColor: '#001DD1',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerRight: (
          <Button title='add more' onPress={() => alert("pressed")} />
        ),
      }
    }
  );
  
  HomeStack.navigationOptions = ( {navigation} ) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
  
  const HistoryStack = createStackNavigator(
    {
    Historik: HistoryPage,
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#EFF2F5'
        },
        headerTintColor: '#001DD1',
        headerTitle: 'Historik',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      }
    }
  );
  
  const TabNav = createBottomTabNavigator(
    {
        Produkter: HomeStack,
        Historik: HistoryStack,
  
    },
    {
      initialRouteName: 'Produkter',
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#0F1C6F',
        activeBackgroundColor: '#173CD1',
        labelStyle: {
          fontSize: 16,
          paddingBottom: 10
        }
      }
    },
  );

const loginNav = createStackNavigator({
    Login: LoginPage,
    Main: TabNav,
});

export default createAppContainer(loginNav); */

export default LoginPage;