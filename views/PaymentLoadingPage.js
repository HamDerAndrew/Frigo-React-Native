import React, { Component } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';
import ProcessModal from './ProcessModal';
import ProcessIndicator from '../Components/ProcessIndicator';

class PaymentLoadingPage extends Component {
    constructor(props) {
        super(props);

        this.checkPayment();
    }

    checkPayment = () => {
        const { navigation } = this.props;
        const productName = navigation.getParam('productName', 'NO-PRODUCT');
        const productAmount = navigation.getParam('productAmount', 'NO-AMOUNT');
        const productPrice = navigation.getParam('productPrice', 'NO-PRICE');

        setTimeout( () => {
            this.props.navigation.navigate('Payment', {
                productName: productName,
                productAmount: productAmount,
                productPrice: productPrice
            });
        }, 3000);
    }

    render() {
        return(
            <View style={{flex: 1,}}>
                <ProcessIndicator />
            </View>
        );
    }
}

export default PaymentLoadingPage;