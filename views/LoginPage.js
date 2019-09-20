import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Dimensions } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import setUserToken from '../actions/SetUserToken';
import { connect } from 'react-redux';
import signIn from '../actions/SignIn';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'assl@houseofcode.io',
      password: 'AndrewTestHOC',
      error: '',
      loading: false
    };
  }
  static navigationOptions = {
    title: 'Log in',
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
      console.log('Response.data.token: ' + response.data.token);
    })
    .catch((error) => console.log('Error from server: ' + error));
    //this.props.navigation.navigate('Main');
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
                            <Text> User token: {this.props.userToken}</Text>
                            <Text> SignIn state: {this.props.loggedIn ? 'logged in' : 'not logged in'} </Text>
                            <Text>{this.props.state}</Text>
                        </View>
                    </View>
                    <View style={loginStyles.loginBtnContainer}>
                        <TouchableHighlight style={loginStyles.loginBtn} underlayColor='transparent' activeOpacity={.3} onPress={ this.checkValid }>
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userToken: state.userToken
  }
};

const mapDispatchToProps = {
  setUserToken,
  signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);