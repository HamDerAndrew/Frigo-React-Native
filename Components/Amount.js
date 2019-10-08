import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";

class Amount extends Component {
    state = {
        //itemProduct: this.props.product,
        itemAmount: 1,
        itemPrice: this.props.itemPrice,
    }

    addLess = () => {
        const decrease = this.state.itemAmount -= 1;
        const totalPrice = decrease * this.props.itemPrice;
        if (this.state.itemAmount <= 0 ) {
            this.setState( {itemAmount: 0, itemPrice: 0} )
        } else {
            this.setState( {itemAmount: decrease, itemPrice: totalPrice});
            this.sendData();
        }
    };

    addMore = () => {
        const increase = this.state.itemAmount + 1;
        const totalPrice = increase * this.props.itemPrice;
        this.setState( { itemAmount: increase, itemPrice: totalPrice} );
        this.sendData();
    };

    sendData = () => {
        this.props.parentCallback(this.state.itemPrice);
    }

    render() {
        return(
            <View style={amountStyles.amountWrapper}>
                <TouchableHighlight onPress={this.addLess} underlayColor='transparent' activeOpacity={.3} >
                    <Image source={require('../assets/icons/Minus.png')} style={{width: 25, height: 25}} />
                </TouchableHighlight>
                <View style={{alignItems: 'center'}}>
                    <View style={amountStyles.amountBox}>
                        <Text style={amountStyles.amountDisplay }>{this.state.itemAmount}</Text>
                    </View>
                    <View style={amountStyles.priceBox}>
                        <Text style={amountStyles.priceDisplay}>{this.state.itemPrice}</Text>
                    </View>
                </View>                       
                <TouchableHighlight onPress={this.addMore} underlayColor='transparent' activeOpacity={.3} >
                    <Image source={require('../assets/icons/PlusSign.png')} style={{width: 25, height: 25}} />
                </TouchableHighlight>
            </View>
        );
    }
}

const amountStyles = StyleSheet.create({
    amountWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    amountDisplay: {
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    amountBox: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#9CA0C3',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10
    },
    priceBox: {
        backgroundColor: '#EFF2F5',
        borderRadius: 10,
        width: 50
    },
    priceDisplay: {
        textAlign: 'center'
    }
});

export default Amount;