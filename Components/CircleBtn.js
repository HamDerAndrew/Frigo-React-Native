import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const CircularBtn = () => {
    return(
    <TouchableOpacity style={btnStyling.circleStyle}>
        <Text style={{alignSelf: 'center', color: 'white'}}>NEXT</Text>
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