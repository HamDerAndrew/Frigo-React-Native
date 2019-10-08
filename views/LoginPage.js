import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Dimensions } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import setUserToken from '../actions/SetUserToken';
import { connect } from 'react-redux';
import signIn from '../actions/SignIn';
import * as Crypto from 'expo-crypto';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'assl@houseofcode.io',
      password: 'AndrewTestHOC',
      error: '',
      loading: false,
      testImage: null
    };

    //this.cacheImages();
  }
  static navigationOptions = {
    title: 'Log in',
  }

  componentDidMount = async () => {
    const url = 'http://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/file/36';
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, url);
    console.log("HASHED: " + digest);
    const path = `${FileSystem.cacheDirectory}${digest}`;
    const myImage = await FileSystem.getInfoAsync(path);
    console.log("PATH: " + path);
    console.log("MYIMAGE: " + myImage);
    if(myImage.exists) {
      console.log("READ FROM CACHE");
      this.setState({testImage: {uri: myImage.url}}
        )
        return
    }
    console.log("DOWNLOAD IMAGE");
    const newImage = await FileSystem.downloadAsync(url, path);
    this.setState({testImage: {uri: newImage.url}});
  }

  cacheImages = () => {
    const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da';
    const cmsHeader = { 
      'Content-Type': 'application/json', 
      //'Authorization': `Bearer ${this.props.userToken}` 
    };
    axios.get(url, cmsHeader)
    .then( (res) => {
      //Create a variable which is the 'res' array of the items.
      const imageArray = res.data.data.products.items;
      //Loop over the array and find the small and large image to cache.
      imageArray.forEach(element => {
        //get URI of small image
        const smallImage = element.list_image.file_url;
        //get URI of large image
        const largeImg = element.big_image.file_url;
        //add small image to cache dir
        const pathSmall = `${FileSystem.cacheDirectory}${smallImage}`;
        //add large image to cache dir
        const pathLarge = `${FileSystem.cacheDirectory}${largeImg}`;
        console.log("Info about small img: " + pathSmall + " - size: " + pathLarge);
        const getInfo = FileSystem.getInfoAsync(pathLarge);
        console.log(getInfo);
      });
      //console.log("imgSmall: " + imgSmall + " - " + "imgLarge: " + imgLarge);
      //console.log("Small path: " + pathSmall + " - Large path: " + pathLarge);
      }
    )
    .catch((error) => console.log(error)); 
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
      //console.log('Response.data.token: ' + response.data.token);
    })
    .catch((error) => console.log('Error from server: ' + error));
    //this.props.navigation.navigate('Main');
  }

    render() {
        return (
            <View style={loginStyles.viewWrapper}>
                <ImageBackground source={require('../assets/images/large/login.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={loginStyles.headerContainer}>
                        <Text style={loginStyles.headerTitle}>FRIGO</Text>
                    </View>
                    <View style={loginStyles.loginContainer}>
                        <View style={loginStyles.inputContainer}>
                            <TextInput style={loginStyles.inputStyle} onChangeText={ (email) => this.setState({email}) } placeholder={'E-mail'} selectTextOnFocus={true} value={this.state.email} />
                            <TextInput style={loginStyles.inputStyle} onChangeText={ (password) => this.setState({password}) } placeholder={'Password'} secureTextEntry={true} selectTextOnFocus={true} value={this.state.password} />
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
      //backgroundColor: '#173BD1',
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