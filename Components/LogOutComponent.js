import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const logOutComponent = (props) => {
    return(
        <TouchableOpacity style={multipleBtn.btnContainer} onPress={props.onPress}>
            <Text style={{fontFamily: 'nunitoregular', fontSize: 14, color: 'white'}}>Log Ud</Text>
      </TouchableOpacity>
    );
}

const multipleBtn = StyleSheet.create({
    btnContainer: {
        marginRight: 15,
        backgroundColor: '#001DD1',
        borderRadius: 5,
        padding: 10
    },
});

export default logOutComponent;