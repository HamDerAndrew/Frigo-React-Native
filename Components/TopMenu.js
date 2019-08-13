import React, { Component } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

class TopMenu extends Component {
/*     state = {
        Button
    } */
    render() {
        const myAlert = () => {
            alert("Pressed!")
        }
        return (
            <View style={menuStyles.menuButtonStyle}>
                <Button title="Select Multiple" onPress={myAlert}  />
            </View>
        );
    }
}

const menuStyles = StyleSheet.create({
    menuButtonStyle: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    }
  });

export default TopMenu;