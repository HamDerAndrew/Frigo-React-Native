import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CircularBtn = (props) => {
    return(
    <TouchableOpacity style={btnStyling.circleStyle} onPress={props.onPress}>
        <Text>log ud</Text>
    </TouchableOpacity> 
    );
}

const btnStyling = StyleSheet.create({
    circleStyle: {
        backgroundColor: '#173CD1', 
        justifyContent: 'center', 
        alignSelf: 'center', 
        borderWidth: 1, 
        borderColor: 'white', 
        borderRadius: 70, 
        padding: 15, 
        width: 75, 
        height: 75
      }
});

export default CircularBtn;