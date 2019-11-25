import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class AuthLoadingPage extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        this.checkToken();
    }
    
    checkToken = async () => {
        const userToken = await SecureStore.getItemAsync('userToken');
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth')
    }
    
    render() {
        return(
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
export default AuthLoadingPage;