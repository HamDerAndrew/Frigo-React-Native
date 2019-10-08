import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ProcessIndicator from '../Components/ProcessIndicator';
import { connect } from 'react-redux';
import axios from 'axios';

class PaymentLoadingPage extends Component {
    constructor(props) {
        super(props);

        //this.checkPayment();
        this.testPurchase();
    }

/*     checkPayment = () => {
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
    } */

    testPurchase = () => {
        const { navigation } = this.props;
        const productName = navigation.getParam('productName', 'NO-PRODUCT');
        const productAmount = navigation.getParam('productAmount', 'NO-AMOUNT');
        const productPrice = navigation.getParam('productPrice', 'NO-PRICE');
        const itemId = navigation.getParam('itemId', 'NO-ID');

        const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/zenegy/purchase';
        const header = {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImFzc2xAaG91c2VvZmNvZGUuaW8iLCJuYW1lIjoiQW5kcsOpIiwiZXhwIjoxNTc3ODIyNjEwfQ.wBA_dQw65Hw8sGQq0Rf8QIONhWgCcH1KA1l1hvIU1Jk'
        }
        const data = {
            items: [
                {
                    product_id: itemId,
                    quantity: productAmount
                }
            ]
        }
        //Using axios default headers because the header object will not be sent otherwise.
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.userToken}`
        axios.post(url,data,header)
        .then((response) => {
            console.log(response.data)
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
                {/* <ProcessIndicator /> */}
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn,
      userToken: state.userToken
    }
  };

//export default PaymentLoadingPage;

export default connect(mapStateToProps)(PaymentLoadingPage);