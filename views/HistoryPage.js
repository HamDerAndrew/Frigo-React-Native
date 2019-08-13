import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

class HistoryPage extends Component {

    render() {
        return(
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#EFF2F5' }}>
                <Text>This is the history page</Text>
            </View>
        );
    }
}

export default HistoryPage;
