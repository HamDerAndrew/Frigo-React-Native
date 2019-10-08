import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Amount from '../Components/Amount';

class PurchaseMulPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0
        }
    }

    callbackFunction = (childData) => {
        this.setState({totalPrice: childData})
    }

    renderList = data => {
        return(
            <View>
                <View style={moreSelection.productContainer}>
                    <View style={moreSelection.listContainer}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={{ uri: data.item.list_image.file_url }} style={moreSelection.productListImg} />
                            <View style={moreSelection.productInfo}>
                                <Text style={moreSelection.productItems}>{data.item.title}</Text>
                                <Text style={moreSelection.itemPrice}>{data.item.price} kr.</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Amount itemPrice={data.item.price} parentCallback={this.callbackFunction}/>
                        </View>
                    </View>
                </View>
          </View>
        )
    }

    render() {
        //Parameters from MainPage navigation
        const { navigation } = this.props;
        const productList = navigation.getParam('productList', 'No list');

        //console.log(productList);

        return(
            <View style={moreSelection.pageContainer}>
                <FlatList data={productList} 
                    keyExtractor={(productList) => productList.title} 
                    renderItem={ item => this.renderList(item) }/>
                    <View style={moreSelection.totalContainer}>
                        <Text style={moreSelection.totalText}>Total:</Text>
                        <Text style={moreSelection.totalText}> {this.state.totalPrice} </Text>
                    </View>
                    <TouchableHighlight onPress={ () => alert("Here comes the moneeeeh")} style={moreSelection.payButton} underlayColor='transparent' activeOpacity={.3} >
                        <Text style={moreSelection.payButtonText}>Køb</Text>
                    </TouchableHighlight>
            </View>
        );
    }
}

const moreSelection = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#EFF2F5',
    },
    productContainer: {
        flex: 1,
    },
    listContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'transparent',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width:1, height: 2},
        shadowOpacity: .3,
        shadowRadius: 5,
        alignSelf: 'center',
        width: '90%'
    },
    productListImg: {
        resizeMode: 'contain',
        height: '100%',
        width: 20
      },
      productInfo: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    productItems: {
        paddingLeft: 10,
        fontSize: 12
    },
    itemPrice: {
        fontSize: 12,
        color: '#7C7C7C',
        paddingLeft: 10
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    totalText: {
        fontSize: 25, 
        color: '#0F1C6F',
    },
    payButton: {
        backgroundColor: '#173BD1',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        padding: 20,
        marginBottom: 20
    },
    payButtonText: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white'
    }
})

export default PurchaseMulPage;