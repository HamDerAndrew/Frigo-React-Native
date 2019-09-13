import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class AuthLoadingPage extends Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
        this.checkToken();
    }

  /*   _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    } */
    checkToken = () => {
        SecureStore.getItemAsync(id_token).then(
            this.props.navigation.navigate(id_token ? 'Main' : 'Auth')
            );
    }
    
    render() {
        return(
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
export default AuthLoadingPage;