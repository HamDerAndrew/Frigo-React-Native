import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import signIn from '../actions/SignIn';
import { connect } from 'react-redux';
import unsetToken from '../actions/UnsetToken';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    signOut = () => {
        //set loggedIn to false
        this.props.signIn();
        SecureStore.deleteItemAsync('userToken');
        this.props.unsetToken();
        this.props.navigation.navigate('Auth');
      }

    render() {
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Text>Profil side</Text>
                <TouchableHighlight onPress={ this.signOut } style={{justifyContent: 'center', alignSelf: 'center', backgroundColor: '#0f1c6f', borderWidth: 1, borderColor: 'white', borderRadius: 70, padding: 15, width: 75, height: 75}}>
                    <Text style={{alignSelf: 'center', color: 'white'}}>Log u'</Text>
              </TouchableHighlight>
              {/* <Text>User token: {this.props.userToken}</Text> */}
            <View style={{marginBottom: 15}}></View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn,
      userToken: state.userToken
    }
  };
  
  const mapDispatchToProps = {
    signIn,
    unsetToken
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);