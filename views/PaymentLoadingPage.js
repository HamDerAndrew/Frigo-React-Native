import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

class PaymentLoadingPage extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Payment Processing...',
        header: null
    }

    componentDidMount() {
        this.purchaseProduct();
    }

    purchaseProduct = async () => {
        const { navigation } = this.props;
        const productName = navigation.getParam('productName', 'NO-PRODUCT');
        const productAmount = navigation.getParam('productAmount', 'NO-AMOUNT');
        const productPrice = navigation.getParam('productPrice', 'NO-PRICE');
        const itemId = navigation.getParam('itemId', 'NO-ID');

        const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/zenegy/purchase';
        const header = {
            'Content-Type': 'application/json',
        }
        const data = {
            items: [
                {
                    product_id: itemId,
                    quantity: productAmount
                }
            ]
        }
        const localToken = await SecureStore.getItemAsync('userToken');
        //Using axios default headers because the header object will not be sent otherwise.
        axios.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;
        //axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.userToken}`
        axios.post(url,data,header)
        .then((response) => {
            this.props.navigation.navigate('Payment', {
                productName: productName,
                productAmount: productAmount,
                productPrice: productPrice
            });
        })
        .catch(error => console.log(error))
    }

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

export default PaymentLoadingPage;