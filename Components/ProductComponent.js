import { StyleSheet, Text, View, Button, Image, Modal, Animated, Easing, Alert } from 'react-native';
import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Slider } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import ProcessModal from '../views/ProcessModal';

class ProductComponent extends Component {
    state = {
        itemAmount: 1,
        itemPrice: this.props.itemPrice,
        isVisible: false,
        animation: new Animated.Value(0),
    };

    addLess = () => {
        const decrease = this.state.itemAmount -= 1;
        const totalPrice = decrease * this.props.itemPrice;
        if (this.state.itemAmount <= 0 ) {
            this.setState( {itemAmount: 0, itemPrice: 0} )
        } else {
            this.setState( {itemAmount: decrease, itemPrice: totalPrice});
        }
    };

    addMore = () => {
        const increase = this.state.itemAmount + 1;
        const totalPrice = increase * this.props.itemPrice;
        this.setState( { itemAmount: increase, itemPrice: totalPrice} );
    };

    paymentStart = () => {
        Alert.alert(
            'Alert Title',
            `Køb ${this.state.itemAmount} ${this.props.product} for ${this.state.itemPrice} kroner?`,
            [
                {text: 'Ja', onPress: () => this.setState( {isVisible: true} )},
                {text: 'Anuller', onPress: () => this.setState( {isVisible: false} )}
            ],
        );
    }

    closeModal = () => {
        this.setState( {isVisible: false} )
    }

    render() {
        return(
            <View style={styling.viewContainer}>
                <ProcessModal modalVisible={this.state.isVisible} closeModal={this.closeModal} />
                <View style={styling.coverContainer}>
                    <View style={styling.coverImgContainer}>
                        <Image source={this.props.coverImage} style={styling.coverImg} resizeMode={'contain'}  />
                    </View>
                    <View style={styling.imgTxtContainer}>
                        <Text style={styling.imgTxt}>{this.props.product}</Text>
                    </View>
                </View>
                <View style={styling.amountContainer}>
                    <View style={styling.amount}> 
                        <TouchableHighlight onPress={this.addLess} underlayColor='transparent' activeOpacity={.3} >
                            <Image source={require('../assets/icons/Minus.png')} />
                        </TouchableHighlight>
                        <Text style={styling.amountDisplay }>{this.state.itemAmount}</Text>
                        <TouchableHighlight onPress={this.addMore} underlayColor='transparent' activeOpacity={.3} >
                            <Image source={require('../assets/icons/PlusSign.png')} />
                        </TouchableHighlight>
                    </View>
                    <Text style={styling.amount}>{this.state.itemPrice} kr.</Text>
                </View>
                <View style={styling.payBtnContainer}>
                    {/* <TouchableHighlight style={styling.payButton} onPress={ () => this.props.navigation.navigate('Payment')}> */}
                    <TouchableHighlight style={styling.payButton} onPress={ this.paymentStart } >
                        <Text style={styling.payButtonText}>Betal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styling = StyleSheet.create({
    viewContainer: {
        flex: 2,
        backgroundColor: '#EFF2F5'
    },
    coverContainer: {
        flex: 2, 
        paddingTop: 25, 
        alignItems:'center', 
        justifyContent: 'flex-start', 
        flexDirection: 'row'
    },
    coverImgContainer: {
        flex: 1
    },
    coverImg: {
        width: '65%', 
        height:'100%', 
        alignSelf: 'flex-start'
    },
    imgTxtContainer: {
        width: 200, 
        position: 'absolute', 
        right: '5%', 
        top: '40%'
    },
    imgTxt: {
        paddingTop: 15, 
        fontSize: 25, 
        color: '#0F1C6F', 
        fontWeight: 'bold'
    },
    amount: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    amountContainer: {
        flex: 1, 
        paddingTop: 20
    },
    payBtnContainer: {
        flex: .5
    },
    payButton: {
        backgroundColor: '#173BD1',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        padding: 20
    },
    payButtonText: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white'
    },
    amountDisplay: {
        borderStyle: 'solid',
        borderWidth: 2.5,
        borderColor: '#9CA0C3',
        marginLeft: 25,
        marginRight: 25,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
        fontSize: 30,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default ProductComponent;
