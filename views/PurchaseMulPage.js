import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ProductsListComponent from '../Components/ProductsListComponent';
import { FlatList } from 'react-native-gesture-handler';

class PurchaseMulPage extends Component {
    render() {
        //Parameters from MainPage navigation
        const { navigation } = this.props;
        const productName = navigation.getParam('productName', 'NO-PRODUCT');
        const productPrice = navigation.getParam('productPrice', 'NO-PRICE');
        const promoImage = navigation.getParam('promoImage', 'NO-IMG');
        const productList = navigation.getParam('productList', 'No list');

        console.log(productList);

        return(
            <View style={{backgroundColor: '#EFF2F5', flex:1}}>
                <Text>Select multiple page</Text>
                <FlatList data={productList} keyExtractor={(productList) => productList.product} renderItem={ ({item}) => <Text> {item.product}</Text>}/>
               {/*  <ProductsListComponent product={productName} itemPrice={productPrice} coverImage={promoImage} navigation={this.props.navigation}/> */}
            </View>
        );
    }
}

export default PurchaseMulPage;