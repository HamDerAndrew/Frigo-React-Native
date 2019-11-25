import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, BackHandler } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class ProcessModal extends Component {
    static navigationOptions = {
        title: 'Kvittering',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    render() {
        const { navigation } = this.props;
        const productName = navigation.getParam('productName', 'NO-PRODUCT');
        const productAmount = navigation.getParam('productAmount', 'NO-AMOUNT');
        const productPrice = navigation.getParam('productPrice', 'NO-PRICE');

        return(
            <View style={modalStyle.modalWrapper}>
                <View style={modalStyle.innerModal}>
                    <View style={modalStyle.closeView}>
                        <TouchableHighlight style={{}} onPress={ () => this.props.navigation.navigate('AppMain')} underlayColor='transparent' activeOpacity={.3} >
                            <Image source={require('../assets/icons/close.png')} />
                        </TouchableHighlight>
                    </View>
                    <ImageBackground imageStyle={{resizeMode: 'stretch'}} source={require('../assets/images/large/receipt.png')} style={modalStyle.backgroundImg}>
                    <View style={modalStyle.innerImageContainer}>
                        <View style={modalStyle.confirmed}>
                            <Text style={modalStyle.heading}>Køb registreret</Text>
                            <Text style={modalStyle.purchaseDate}>{`Købt ${this.state.date.getDate()}/${this.state.date.getMonth()}-${this.state.date.getFullYear()}`}</Text>
                        </View>
                        <View style={modalStyle.purchaseContainer}>
                            <Text style={modalStyle.subHeading}>Oversigt</Text>
                            <View style={modalStyle.purchasedProduct}>
                                <Text style={modalStyle.receiptText}>{productAmount} {productName}</Text>
                                <Text style={modalStyle.receiptText}>{productPrice}kr.</Text>
                            </View>
                        </View>
                        <View style={modalStyle.receiptTotalContainer}>
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
    innerModal: {
        flex: 1,
        padding: 40
    },
    closeView: {
        alignItems: 'flex-end', 
        paddingBottom: 50
    },
    backgroundImg: {
        flex: .8, 
        width: '100%', 
        height: '100%'
    },
    innerImageContainer: {
        flex: 1, 
        padding: 35
    },
    confirmed: {
        flex: .7, 
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        color: '#001DD1',
        marginBottom: 5
    },
    purchaseDate: {
        color: '#9ca0c3'
    },
    purchaseContainer: {
        flex: 1.3
    },
    subHeading: {
        fontSize: 18,
        color: '#0F1C6F',
        marginBottom: 10,
        marginTop: 10
    },
    purchasedProduct: {
        flexDirection:'row', 
        justifyContent: 'space-between'
    },
    receiptText: {
        color: '#173bd1'
    },
    receiptTotalContainer: {
        flex: 1, 
        alignItems: 'flex-end', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingBottom: 20
    },
    receiptTotal: {
        fontWeight: 'bold',
        fontSize: 23,
        textTransform: 'uppercase',
        color: '#0F1C6F'
    }
});

export default ProcessModal;