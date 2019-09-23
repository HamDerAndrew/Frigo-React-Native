import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import SelectMultipleBtn from '../Components/SelectMultipleBtn';
import signIn from '../actions/SignIn';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import unsetToken from '../actions/UnsetToken';
import axios from 'axios';

class MainPage extends Component {
constructor(props) {
  super(props)
  this.state = {
    selectMultiple: false,
    productData: [],
    listSource: [],
    selectedItems: [],
  };
}
static navigationOptions = ({navigation}) => {
  return {
    title: 'Produkter',
    headerRight: (
      <SelectMultipleBtn onPress={navigation.getParam('selectionType')} />
    ),
  }
}

signOut = () => {
  //set loggedIn to false
  this.props.signIn();
  SecureStore.deleteItemAsync('userToken');
  this.props.unsetToken();
  this.props.navigation.navigate('Auth');
}

componentDidMount() {
  this.getData();
  this.props.navigation.setParams( {'selectionType': this.setMultipleState} )
}

getData = () => {
  const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da';
  const cmsHeader = { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${this.props.userToken}` 
  };
  axios.get(url, cmsHeader)
  .then( (res) => {
    res = res.data.data.products.items.map( item => {
      item.isSelected = false;
      item.selectedHighlight = productStyles.listContainer;
      item.selectedImg = require('../assets/icons/list-checkmark.png');
      item.price = (parseFloat(item.price).toFixed(2) / 100);
      return item;
    });
    productData = res;
    this.setState( {productData: res} );
    console.log(productData);
    }
  )
  .catch((error) => console.log(error)); 
  /* let productListData = [
    {id: 0, product: 'Red Bull', price: 12, listImage: require('../assets/images/small/redbull-small.png'), bigImg: require('../assets/images/large/red-bull.png')},
    {id: 1, product: 'Coca Cola Zero', price: 5, listImage: require('../assets/images/small/cola-zero-small.png'), bigImg: require('../assets/images/large/cola-zero-big.png')},
    {id: 2, product: 'Coca Cola Classic', price: 5, listImage: require('../assets/images/small/cola-small.png'), bigImg: require('../assets/images/large/Cola-big.png')},
    {id: 3, product: 'Faxe Kondi', price: 5, listImage: require('../assets/images/small/faxe-kondi-small.png'), bigImg: require('../assets/images/large/faxekondi-big.png')},
    {id: 4, product: 'Pepsi Max', price: 5, listImage: require('../assets/images/small/pepsi-small.png'), bigImg: require('../assets/images/large/pepsi-big.png')},
    {id: 5, product: 'Cocio Classic', price: 7, listImage: require('../assets/images/small/Cocio-Small.png'), bigImg: require('../assets/images/large/cocio-big.png')},
    {id: 6, product: 'Lean Protein Shake', price: 20, listImage: require('../assets/images/small/Protein-small.png'), bigImg: require('../assets/images/large/protein-big.png')},
    {id: 7, product: 'Lean Protein Shake Jordbær', price: 20, listImage: require('../assets/images/small/Protein-small.png'), bigImg: require('../assets/images/large/protein-big.png')},
    {id: 8, product: 'Lean Protein Shake Vanilie', price: 20, listImage: require('../assets/images/small/Protein-small.png'), bigImg: require('../assets/images/large/protein-big.png')},
    {id: 9, product: 'Lean Protein Shake ENERGY!', price: 20, listImage: require('../assets/images/small/Protein-small.png'), bigImg: require('../assets/images/large/protein-big.png')},
  ];
  productListData = productListData.map(item => {
    item.isSelected =  false;
    item.selectedImg = require('../assets/icons/list-checkmark.png');
    item.selectedHighlight = productStyles.listContainer;
    return item; 
  });
  this.setState({
    productData: productListData,
  }); */
}

setMultipleState = () => {
  this.setState({selectMultiple: !this.state.selectMultiple})
}

/*Function for selecting more than 1 different product to purchase. 
Find index of the product and add a 'selected' style to it */
selectItem = (data) => {
  data.item.isSelected = !data.item.isSelected;
  data.item.selectedHighlight = data.item.isSelected ? productStyles.selectedStyle : productStyles.listContainer;
  const index = this.state.productData.findIndex(
    item => data.item.id === item.id
  );
  this.state.productData[index] = data.item;
  //push items selected into the multiple selection list.
  if(data.item.isSelected === true) {
    this.state.selectedItems.push(data.item);
  } else {
    this.state.selectedItems.splice(data.item, 1);
  }
  this.setState({
    productData: this.state.productData,
    selectedItems: this.state.selectedItems
  })
  console.log("Produkt ID: " + this.state.productData[index].id);
  console.log("Toggle isSelected: " + data.item.isSelected);
  console.log("Pushed items to array: " + this.state.selectedItems);
  console.log("first item: " + this.state.selectedItems[0].product);
}

renderList = data => {
  if(this.state.selectMultiple === false) {
    return(
      <TouchableHighlight underlayColor='transparent' activeOpacity={.3} onPress={ () => {
        this.props.navigation.navigate('Purchase', {
          productName: data.item.title,
          productPrice: data.item.price,
          promoImage: data.item.big_image.file_url
        });
      } }> 
        <View style={productStyles.listContainer}>
          <View style={{flexDirection:'row'}}>
          <Image source={{ uri: data.item.list_image.file_url }} style={productStyles.productListImg} />
            <View style={productStyles.productInfo}>
              <Text style={productStyles.productItems}>{data.item.title}</Text>
              <Text style={productStyles.itemPrice}>{data.item.price} kr.</Text>
            </View>
          </View>
            <Image style={productStyles.listArrow} source={require('../assets/icons/list-arrow.png')} />
        </View>
      </TouchableHighlight>
      );
  } else {
    return(
      <TouchableHighlight underlayColor='transparent' activeOpacity={.3}  onPress={ () => this.selectItem(data)}>
        <View style={[productStyles.listContainer, data.item.selectedHighlight]}>
          <View style={{flexDirection: 'row'}}>
          <Image source={{ uri: data.item.list_image.file_url }} style={productStyles.productListImg} />
            <View style={productStyles.productInfo}>
                <Text style={productStyles.productItems}>{data.item.title}</Text>
                <Text style={productStyles.itemPrice}>{data.item.price} kr.</Text>
            </View>
          </View>
          <Image style={productStyles.listArrow} />
        </View>
      </TouchableHighlight>
      );
  }
}

  render() {
    return (
      <View style={productStyles.productWrapper}>
        <View style={productStyles.productContainer}>
          <FlatList style={productStyles.flatList} 
            keyExtractor={ (productData) => productData.title} 
            data={this.state.productData}
            extraData={this.state}
            renderItem={ item => this.renderList(item)}
            />
            <View style={{marginTop: 15}}></View>
            { //Toggle the 'Next' button for multiple selection
              this.state.selectMultiple ? 
              <TouchableHighlight underlayColor='transparent' style={productStyles.nextBtn} activeOpacity={.3} onPress={ () => {
                this.props.navigation.navigate('PurchaseMore', {
                  productName: this.state.selectedItems[0].product,
                  productPrice: this.state.selectedItems.price,
                  promoImage: 'Billede',
                  productList: this.state.selectedItems
                });
              } }> 
              <Text style={{alignSelf: 'center', color: 'white'}}>NEXT</Text>
              </TouchableHighlight> : null
            }
        </View>
      </View>
    );
  }
}

const productStyles = StyleSheet.create({
  productWrapper: {
      flex: 1, 
      backgroundColor: '#EFF2F5'
  },
  productContainer: {
      flex: 1
  },
  selectedStyle: {
    borderColor: '#173BD1',
    borderWidth: 1
  },
  flatList: {
      flex: 1
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
      justifyContent: 'space-between',
      alignSelf: 'center',
      width: '90%'
  },
  productInfo: {
      flexDirection: 'column'
  },
  productItems: {
      paddingLeft: 10,
      fontSize: 18
  },
  itemPrice: {
    fontSize: 12,
    color: '#7C7C7C',
    paddingLeft: 10
  },
  productListImg: {
    resizeMode: 'contain',
    height: '100%',
    width: 20
  },
  listArrow: {
    alignSelf: 'center'
  },
  nextBtn: {
    backgroundColor: '#173CD1', 
    justifyContent: 'center', 
    alignSelf: 'center', 
    borderWidth: 1, 
    borderColor: 'white', 
    borderRadius: 70, 
    padding: 15, 
    width: 75, 
    height: 75,
    marginBottom: 15
  }
});

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userToken: state.userToken
  }
};

const mapDispatchToProps = {
  signIn,
  unsetToken
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);