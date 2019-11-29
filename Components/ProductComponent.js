import { StyleSheet, Text, View, Button, Image, Modal, Animated, Easing, Alert } from 'react-native';
import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Platform } from '@unimodules/core';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            itemProduct: this.props.product,
            itemAmount: 1,
            itemPrice: this.props.itemPrice,
            itemId: this.props.itemId
        }
    }

    addLess = () => {
        const decrease = this.state.itemAmount -= 1;
        const totalPrice = decrease * this.props.itemPrice;
        if (this.state.itemAmount <= 1 ) {
            this.setState( {itemAmount: 1, itemPrice: this.props.itemPrice} )
        } else {
            this.setState( {itemAmount: decrease, itemPrice: totalPrice});
        }
    };

    addMore = () => {
        const increase = this.state.itemAmount + 1;
        const totalPrice = increase * this.props.itemPrice;
        this.setState( { itemAmount: increase, itemPrice: totalPrice} );
    };

    confirmPurchase = () => {
        this.props.navigation.navigate('PaymentLoad', {
            productName: this.state.itemProduct,
            productAmount: this.state.itemAmount,
            productPrice: this.state.itemPrice,
            itemId: this.state.itemId
        });
    }

    paymentStart = () => {
        Alert.alert(
            'Bekræft',
            `Køb ${this.state.itemAmount} ${this.props.product} for ${this.state.itemPrice} kroner?`,
            [
                {text: 'Ja', onPress: this.confirmPurchase},
                //{text: 'Ja', onPress: this.testPurchase},
                {text: 'Anuller'}
            ],
        );
    }

    render() {
        return(
            <View style={styling.viewContainer}>
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
                        <View style={styling.amountBox}>
                            <Text style={styling.amountDisplay }>{this.state.itemAmount}</Text>
                        </View>                       
                        <TouchableHighlight onPress={this.addMore} underlayColor='transparent' activeOpacity={.3} >
                            <Image source={require('../assets/icons/PlusSign.png')} />
                        </TouchableHighlight>
                    </View>
                    <Text style={styling.amount}>{this.state.itemPrice} kr.</Text>
                </View>
                <View style={styling.payBtnContainer}>
                    {/* <TouchableHighlight style={styling.payButton} onPress={ () => this.props.navigation.navigate('Payment')}> */}
                    <TouchableHighlight style={styling.payButton} onPress={ this.paymentStart } >
                        <Text style={styling.payButtonText}>Køb</Text>
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
        width: '50%', 
        position: 'absolute', 
        right: '4%', 
        top: '40%'
    },
    imgTxt: {
        paddingTop: 15, 
        fontSize: 25, 
        color: '#0F1C6F', 
        fontFamily: 'nunitobold'
    },
    amount: {
        flexDirection: 'row',
        alignSelf: 'center',
        fontFamily: 'nunitosemibold',
        color: '#636363'
    },
    amountContainer: {
        flex: 1, 
        paddingTop: 20,
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
        color: 'white',
        fontFamily: 'nunitosemibold'
    },
    amountDisplay: {
        fontSize: 30,
        fontFamily: 'nunitosemibold',
        color: '#101B6F',
        alignSelf: 'center',
        marginBottom: Platform.OS === 'android' ? 5 : 0
    },
    amountBox: {
        borderStyle: 'solid',
        borderWidth: 2.5,
        borderColor: '#9CA0C3',
        marginLeft: 25,
        marginRight: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        lineHeight: Platform.OS === 'ios' ? 30: undefined,
        borderRadius: 10,
    }
});

export default ProductComponent;
