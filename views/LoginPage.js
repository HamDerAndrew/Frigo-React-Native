import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Switch, Dimensions, Platform } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import setUserToken from '../redux/actions/SetUserToken';
import { connect } from 'react-redux';
import signIn from '../redux/actions/SignIn';
import setItems from '../redux/actions/SetItems';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-community/async-storage';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false
    };
    this.getProducts()
  }
  static navigationOptions = {
    title: 'Log in',
  }


storeUser = async () => {
  try {
    await AsyncStorage.setItem('user', this.state.email);
    await AsyncStorage.setItem('pass', this.state.password);
  } catch(error) {
    console.log(error);
  }
}

getUser = async () => {
  try {
    const userEmail = await AsyncStorage.getItem('user');
    const userPass = await AsyncStorage.getItem('pass');
    
    if(userEmail !== null && userPass !== null) {
      this.setState({email: userEmail, password: userPass})
    }
    console.log("getUser: ", userEmail, " - ", userPass);
  } catch(error) {
    console.log(error);
  }
}

forgetUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('pass');
  } catch(error) {
    console.log(error)
  }
}

toggleRememberMe = value => {
  this.setState({rememberMe: value})
  if (value === true) {
    this.storeUser();
  } else {
    this.forgetUser();
  }
}

async componentDidMount() {
  const userInfo = await this.getUser();
  
  this.setState({
    rememberMe: userInfo ? true : false
  })
}

  getProducts = () => {
    const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da';
    const cmsHeader = { 
      'Content-Type': 'application/json', 
      //'Authorization': `Bearer ${this.props.userToken}` 
    };
    axios.get(url,cmsHeader)
    .then((res) => {
      const contentItems = res.data.data.products.items;
      this.props.setItems(contentItems);
    })
    .catch(error => console.log(error))
  }

  checkValid = () => {
    const { email, password } = this.state;
    const cmsHeader = { 'Content-Type' : 'application/json' };
    axios.post("https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/app-memberships/authenticate/basic", {
      user: {
        email: email,
        password: password,
      }
    }, cmsHeader)
    .then((response) => {
      //Store the token from AppCms login
      SecureStore.setItemAsync('userToken', response.data.token);
      //use Redux action 'SetUserToken' to assign the token to the key 'userToken'
      this.props.setUserToken(response.data.token);
      //set loggedIn to true
      this.props.signIn();
      this.props.navigation.navigate('AuthLoading');
    })
    .catch((error) => {
      console.log('Error from server: ' + error)
      alert("Forkert brugernavn og/eller password");
    });
  }

    render() {
        return (
            <View style={loginStyles.viewWrapper}>
                <ImageBackground source={require('../assets/images/large/login.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={loginStyles.headerContainer}>
                        <Text style={loginStyles.headerTitle}>Frigo</Text>
                    </View>
                    <View style={loginStyles.loginContainer}>
                        <View style={loginStyles.inputContainer}>
                            <TextInput style={loginStyles.inputStyle} onChangeText={ (email) => this.setState({email}) } placeholder={'E-mail'} selectTextOnFocus={true} value={this.state.email} />
                            <TextInput style={loginStyles.inputStyle} onChangeText={ (password) => this.setState({password}) } placeholder={'Password'} secureTextEntry={true} selectTextOnFocus={true} value={this.state.password} />
                            <Switch style={loginStyles.toggleBox} value={this.state.rememberMe}  onValueChange={(value) => this.toggleRememberMe(value)} />
                            <Text style={loginStyles.rememberText}>Husk mig</Text>
                        </View>
                    </View>
                    <View style={loginStyles.loginBtnContainer}>
                        <TouchableHighlight style={loginStyles.loginBtn} underlayColor='#26262D' activeOpacity={.3} onPress={ this.checkValid }>
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
      fontFamily: 'nunitobold'
  },
  inputContainer: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center'
  },
  inputStyle: {
      backgroundColor: 'white',
      marginBottom: 15,
      padding: Platform.OS === 'android' ? 10 : 15,
      borderRadius: 10,
      alignSelf: 'stretch'
  },
  toggleBox: {
    alignSelf: 'center'
  },
  rememberText: {
    alignSelf: 'center',
    paddingTop: 10,
    fontSize: 16, 
    color: 'white', 
    fontFamily: 'nunitobold', 
  },
  loginBtnContainer: {
      flex: .5, 
      justifyContent: 'flex-end', 
      alignItems: 'center',
      paddingBottom: 40
  },
  loginBtn: {
      backgroundColor: '#0F1C6F',
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
  },
});

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userToken: state.userToken,
    contentItems: state.contentItems
  }
};

const mapDispatchToProps = {
  setUserToken,
  signIn,
  setItems
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);