import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
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
    productData: []
  };
}
static navigationOptions = ({navigation}) => {
  return {
    title: 'Produkter',
    headerRight: (
      <LogOutComponent onPress={navigation.getParam('logMeOut')} />
    )
  }
}

async componentDidMount() {
  this.getProducts();
  this.props.navigation.setParams( {'logMeOut': this.signOut} )
}

getProducts = () => {
  const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da';
  const cmsHeader = { 
    'Content-Type': 'application/json', 
    //'Authorization': `Bearer ${this.props.userToken}` 
  };
  axios.get(url,cmsHeader)
  .then((res) => {
    const contentItems = res.data.data.products.items;
    //Set products in Redux Store. Used for extracting the name from the ID on the HistoryPage.
    this.props.setItems(contentItems);
    contentItems.map( item => {
      //convert value from 'øre' to 'kroner'.
      item.price = (parseFloat(item.price).toFixed(2) / 100);
      return item;
    });
    this.setState({productData: contentItems});
  })
  .catch(error => console.log(error))
}

signOut = () => {
  //set loggedIn to false
  this.props.signIn();
  SecureStore.deleteItemAsync('userToken');
  this.props.unsetToken();
  this.props.navigation.navigate('Auth');
}

renderList = data => {
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