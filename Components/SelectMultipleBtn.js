import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SelectMultipleBtn = (props) => {
    return(
        <TouchableOpacity style={multipleBtn.btnContainer} onPress={props.onPress}>
            <Image style={multipleBtn.btnImage} resizeMode={'contain'} source={require('../assets/icons/select_multiple.png')}/>
            <Text style={{}}>Vælg flere</Text>
      </TouchableOpacity>
    );
}

const multipleBtn = StyleSheet.create({
    btnContainer: {
        marginRight: 15
    },
    btnImage: {
        width: '100%',
        height: '60%'
      }
});

export default SelectMultipleBtn;