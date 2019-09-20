import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class ProcessModal extends Component {
    static navigationOptions = {
        title: 'Kvittering',
        header: null
    }
    state = {
        isVisible: true,
        date: new Date()
    };

    render() {
        const { navigation } = this.props;
        const productName = navigation.getParam('productName', 'NO-PRODUCT');
        const productAmount = navigation.getParam('productAmount', 'NO-AMOUNT');
        const productPrice = navigation.getParam('productPrice', 'NO-PRICE');

        return(
            <View style={modalStyle.modalWrapper}>
                <View style={{ flex: 1, padding: 40}}>
                    <View style={{alignItems: 'flex-end', paddingBottom: 50}}>
                        <TouchableHighlight style={{}} onPress={ () => this.props.navigation.navigate('AppMain')} underlayColor='transparent' activeOpacity={.3} >
                            <Image source={require('../assets/icons/close.png')} />
                        </TouchableHighlight>
                    </View>
                    <ImageBackground imageStyle={{resizeMode: 'stretch'}} source={require('../assets/images/large/receipt.png')} style={{ flex: .8, width: '100%', height: '100%'}}>
                    <View style={{flex: 1, padding: 35}}>
                        <View style={{flex: .7, alignItems: 'center'}}>
                            <Text style={modalStyle.heading}>Køb registreret</Text>
                            <Text style={{color: '#9ca0c3'}}>{`Købt ${this.state.date.getDate()}/${this.state.date.getMonth()}-${this.state.date.getFullYear()}`}</Text>
                        </View>
                        <View style={{flex: 1.3}}>
                            <Text style={modalStyle.subHeading}>Oversigt</Text>
                            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={modalStyle.receiptText}>{productAmount} {productName}</Text>
                                <Text style={modalStyle.receiptText}>{productPrice}kr.</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 20}}>
                            <Text style={modalStyle.receiptTotal}>TOTAL</Text>
                            <Text style={modalStyle.receiptTotal}>{productPrice}kr.</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
        );
    }
}

const modalStyle = StyleSheet.create({
    modalWrapper: {
        flex: 1, 
        backgroundColor: '#1B3ACA'
    },
    heading: {
        fontSize: 20,
        color: '#001DD1',
        marginBottom: 5
    },
    subHeading: {
        fontSize: 18,
        color: '#0F1C6F',
        marginBottom: 10,
        marginTop: 10
    },
    receiptText: {
        color: '#173bd1'
    },
    receiptTotal: {
        fontWeight: 'bold',
        fontSize: 23,
        textTransform: 'uppercase',
        color: '#0F1C6F'
    }
});

export default ProcessModal;