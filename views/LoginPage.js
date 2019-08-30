import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Dimensions, Button, AsyncStorage } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

/*     this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this); */
  }
  static navigationOptions = {
    title: 'Log in',
  }

  changeHandler = (event) => {
    this.setState({event});
  }

  checkValid = () => {
    if(this.state.email === '') {
      alert("not valid email");
      return false
    }
  }

  _signInAsync = async () => {
 /*    if(this.state.email === '' || this.state.password === '') {
      alert("Enter valid email and password");
    } else {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('Main');
    } */
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  }

    render() {
        return (
            <View style={loginStyles.viewWrapper}>
                <ImageBackground source={require('../assets/images/large/login.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={loginStyles.headerContainer}>
                        <Text style={loginStyles.headerTitle}>Log in</Text>
                    </View>
                    <View style={loginStyles.loginContainer}>
                        <View style={loginStyles.inputContainer}>
                            <TextInput style={loginStyles.inputStyle} onChangeText={ (email) => this.setState({email}) } placeholder={'E-mail'} selectTextOnFocus={true} value={this.state.email} />
                            <TextInput style={loginStyles.inputStyle} onChangeText={ (password) => this.setState({password}) } placeholder={'Password'} secureTextEntry={true} selectTextOnFocus={true} value={this.state.password} />
                        </View>
                    </View>
                    <View style={loginStyles.loginBtnContainer}>
                        <TouchableHighlight style={loginStyles.loginBtn} underlayColor='transparent' activeOpacity={.3} onPress={ this._signInAsync }>
                            <Text style={loginStyles.loginBtnText}>Log In</Text>
                        </TouchableHighlight>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

var windowWidth = Dimensions.get('window').width;
var totalWidth = windowWidth / 1.2;

const loginStyles = StyleSheet.create({
  viewWrapper: {
      flex: 1,
      backgroundColor: '#1B3ACA'  
  },
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