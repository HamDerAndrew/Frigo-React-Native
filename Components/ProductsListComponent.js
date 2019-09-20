import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class ProductsListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemPrice: this.props.price,
            itemAmount: 1,
        }
    };

    render() {
        return(
            <View style={productsList.listContainer}>
            <Image source={this.props.listImage} style={productsList.productListImg} />
            <View style={productsList.productInfo}>
                <Text style={productsList.productItems}>{this.props.product}</Text>
                <Text style={productsList.itemPrice}>{this.props.price} kr.</Text>
            </View>
            <Image style={productsList.listArrow} source={require('../assets/icons/list-arrow.png')} />
            </View>
        );
    }
}

const productsList = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width:1, height: 2},
        shadowOpacity: .3,
        shadowRadius: 5,
    },
    productListImg: {
        resizeMode: 'contain',
        height: '100%',
        width: 20
    },
    productInfo: {
        flexDirection: 'column'
    },
    productItems: {
        paddingLeft: 10,
        fontSize: 18, 
        width: 300
    },
    itemPrice: {
      fontSize: 12,
      color: '#7C7C7C',
      paddingLeft: 10
    },
});

export default ProductsListComponent;