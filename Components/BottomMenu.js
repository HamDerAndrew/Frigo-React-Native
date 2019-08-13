import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

class BottomMenu extends Component {
    render() {
        const toHistory = () => {
            alert("display History");
            this.props.navigation.navigate('History');
        }

        const toProducts = () => {
            alert("display Products")
        }

        return (
            <View style={styles.botNav}>
                <View style={styles.buttonContainer}>
                    <Button title="History" color="pink" onPress={toHistory} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Products" color="green" onPress={toProducts} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    botNav: {
        // flex: 1 (not required apparently) 
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        alignSelf: 'flex-end'
    },
    buttonContainer: {
        flex: 1,
        alignSelf: 'flex-end'
    }
});

export default BottomMenu;