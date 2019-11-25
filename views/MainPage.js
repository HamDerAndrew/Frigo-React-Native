import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import SelectMultipleBtn from '../Components/SelectMultipleBtn';
import signIn from '../redux/actions/SignIn';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import unsetToken from '../redux/actions/UnsetToken';
import setItems from '../redux/actions/SetItems';
import axios from 'axios';
import LogOutComponent from '../Components/LogOutComponent';

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
    /* headerRight: (
      <SelectMultipleBtn onPress={navigation.getParam('selectionType')} />
    ), */
    headerRight: (
      <LogOutComponent onPress={navigation.getParam('logMeOut')} />
    )
  }
}

async componentDidMount() {
  this.getData();
/*   this.testApi(),
  this.getMoviesFromApiAsync();
  this.fetchProd(); */
  //this.props.navigation.setParams( {'selectionType': this.setMultipleState} )
  this.props.navigation.setParams( {'logMeOut': this.signOut} )
}

/* testApi = () => {
  const url ="https://jsonplaceholder.typicode.com/todos/1";
  axios.get(url)
  .then( (response) => {
    console.log(response.data);
  })
  .catch(error => console.log("JSON API ERROR", error));
}

async fetchProd() {
  return fetch('https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da')
    .then( (response) => response.json())
    .then( (responseJson) => {
      console.log(responseJson.movies);
    })
    .catch( (error) => {
      console.log("Fetch Products error: ", );
      console.log(error);
    })
}

 async getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return console.log(responseJson.movies);
    })
    .catch((error) => {
      console.error(error);
    });
} */

//Get products for Redux Store to be used on History Page.
getProducts = () => {
  const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da';
  const cmsHeader = { 
    'Content-Type': 'application/json', 
    //'Authorization': `Bearer ${this.props.userToken}` 
  };
  axios.get(url,cmsHeader)
  .then((res) => {
    const contentItems = res.data.data.products.items;
    this.props.setItems(contentItems);
  })
  .catch(error => console.log("Error while fetching products: ", error))
}

getData = () => {
  const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da';
  const cmsHeader = { 
    'Content-Type': 'application/json', 
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
    /* productData = res; */
    //console.log(res.data.data.products);
    this.setState( {productData: res} );
    }
  )
  .catch((error) => console.log("getData error: ", error)); 
}

setMultipleState = () => {
  this.setState({selectMultiple: !this.state.selectMultiple})
}

signOut = () => {
  //set loggedIn to false
  this.props.signIn();
  SecureStore.deleteItemAsync('userToken');
  this.props.unsetToken();
  this.props.navigation.navigate('Auth');
}

/*Function for selecting more than 1 different product to purchase. 
Find index of the product and add a 'selected' style to it */
selectItem = (data) => {
  //toggle between isSelected true and false
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
    //find the index of the item selected.
    const itemIndex = this.state.selectedItems.indexOf(data.item);
    //remove the item from selected index.
    this.state.selectedItems.splice(itemIndex, 1);
  }
  this.setState({
    productData: this.state.productData,
    selectedItems: this.state.selectedItems
  })
}

renderList = data => {
  if(this.state.selectMultiple === false) {
    return(
      <TouchableHighlight underlayColor='transparent' activeOpacity={.3} onPress={ () => {
        this.props.navigation.navigate('Purchase', {
          productName: data.item.title,
          productPrice: data.item.price,
          promoImage: data.item.big_image.file_url,
          productId: data.item.id
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
          <FlatList style={productStyles.flatList} 
            keyExtractor={ (productData) => productData.title} 
            data={this.state.productData}
            extraData={this.state}
            renderItem={item => this.renderList(item)}
            />
            { //Toggle the 'Next' button for multiple selection
              this.state.selectMultiple ? 
              <TouchableHighlight underlayColor='transparent' style={productStyles.nextBtn} activeOpacity={.3} onPress={ () => {
                this.props.navigation.navigate('PurchaseMore', {
                  productList: this.state.selectedItems
                });
              } }> 
              <Text style={{alignSelf: 'center', color: 'white'}}>NÆSTE</Text>
              </TouchableHighlight> : null
            }
      </View>
    );
  }
}

const productStyles = StyleSheet.create({
  productWrapper: {
      flex: 1, 
  },
  selectedStyle: {
    borderColor: '#173BD1',
    borderWidth: 1
  },
  flatList: {
    backgroundColor: '#EFF2F5'
  },
  listContainer: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'transparent',
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {width:1, height: 2},
      shadowOpacity: .3,
      shadowRadius: 5,
      elevation: 5,
      justifyContent: 'space-between',
      alignSelf: 'center',
      width: '90%'
  },
  productInfo: {
      flexDirection: 'column'
  },
  productItems: {
      paddingLeft: 10,
      fontSize: 18,
      fontFamily: 'nunitosemibold'
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
    userToken: state.userToken,
    contentItems: state.contentItems
  }
};

const mapDispatchToProps = {
  signIn,
  unsetToken,
  setItems
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);