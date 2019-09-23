import React, { Component } from 'react';

import ProductComponent from '../Components/ProductComponent';

class PurchasePage extends Component {
    render() {
        //Parameters from MainPage navigation
        const { navigation } = this.props;
        const productName = navigation.getParam('productName', 'NO-PRODUCT');
        const productPrice = navigation.getParam('productPrice', 'NO-PRICE');
        const promoImage = navigation.getParam('promoImage', 'NO-IMG');

        return(
            <ProductComponent product={productName} itemPrice={productPrice} coverImage={{ uri:promoImage }} navigation={this.props.navigation}/>
        );
    }
}

export default PurchasePage;