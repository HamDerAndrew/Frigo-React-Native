import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Slider } from 'react-native';

class PurchasePage extends Component {
/* constructor(props) {
    super(props);
    this.state = { itemAmount: 5 };
} */
    state = {
        itemAmount: 1,
        itemPrice: 12
    };

    addLess = () => {
        const decrease = this.state.itemAmount -= 1;
        if (this.state.itemAmount <= 0 ) {
            this.setState( {itemAmount: 0} )
        } else {
            this.setState( {itemAmount: decrease});
        }
    };

    addMore = () => {
        const increase = this.state.itemAmount + 1;
        this.setState( { itemAmount: increase } )
    };

    render() {
        return(
            <View style={styling.viewContainer}>
                <View style={{flex: 2, paddingTop: 25, alignItems:'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Image source={require('../assets/images/large/Cola-big.png')} style={{width: '65%', height:'100%', alignSelf: 'flex-start'}} resizeMode={'contain'}  />
                    </View>
                    <View style={{width: 200, position: 'absolute', right: '5%', top: '40%'}}>
                        <Text style={{paddingTop: 15, fontSize: 25, color: '#0F1C6F', fontWeight: 'bold'}}>Coca-Cola</Text>
                    </View>
                </View>
                <View style={{flex: 1, paddingTop: 20}}>
                    <View style={styling.amountContainer}> 
                        <TouchableHighlight onPress={this.addLess} underlayColor='transparent' activeOpacity={.3} >
                            <Image source={require('../assets/icons/Minus.png')} />
                        </TouchableHighlight>
                        <Text style={styling.amountDisplay }>{this.state.itemAmount}</Text>
                        <TouchableHighlight onPress={this.addMore} underlayColor='transparent' activeOpacity={.3} >
                            <Image source={require('../assets/icons/PlusSign.png')} />
                        </TouchableHighlight>
                    </View>
                    <Text style={{alignSelf: 'center'}}>{this.state.itemPrice} kr.</Text>
                </View>
                <View style={{flex: 0.5}}>
                    <TouchableHighlight style={styling.payButton} onPress={ () => alert('Køb produkt')}>
                        <Text style={styling.payButtonText}>Betal</Text>
                    </TouchableHighlight>
{/*                     <Slider
                            style={{height: 100}}
                            maximumValue={1}
                            minimumValue={0}
                            minimumTrackTintColor="#61C61F"
                            maximumTrackTintColor="#FFFFFF"
                        /> */}
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
    amountContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
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

export default PurchasePage;
