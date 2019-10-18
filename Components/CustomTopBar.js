import React, { Component } from 'react';
import { Text, View } from 'react-native';

class CustomTopBar extends Component {
    render() {
        return(
            <View style={{backgroundColor: 'green'}}>
                <Text style={{color:'white'}}>Top bar</Text>
            </View>
        );
    }
}

export default CustomTopBar;