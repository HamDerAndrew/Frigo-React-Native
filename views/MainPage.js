import React from "react";
import { View, Text, Button, StyleSheet, FlatList, Image, AsyncStorage } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import CircleBtn from '../Components/CircleBtn';
import SelectMultipleBtn from '../Components/SelectMultipleBtn';
import signIn from '../actions/SignIn';
import { connect } from 'react-redux';

class MainPage extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    selectMultiple: false,
    productData: [],
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

signOut =  () => {
  this.props.signIn();
  this.props.navigation.navigate('Auth');
}

componentDidMount() {
  this.getData();
  this.props.navigation.setParams( {'selectionType': this.setMultipleState} )
}

getData = () => {
  let productListData = [
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
  });
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
          productName: data.item.product,
          productPrice: data.item.price,
          promoImage: data.item.bigImg
        });
      } }> 
        <View style={productStyles.listContainer}>
            <Image source={data.item.listImage} style={productStyles.productListImg} />
            <View style={productStyles.productInfo}>
              <Text style={productStyles.productItems}>{data.item.product}</Text>
              <Text style={productStyles.itemPrice}>{data.item.price} kr.</Text>
            </View>
            <Image style={productStyles.listArrow} source={require('../assets/icons/list-arrow.png')} />
        </View>
      </TouchableHighlight>
      );
  } else {
    return(
      <TouchableHighlight underlayColor='transparent' activeOpacity={.3}  onPress={ () => this.selectItem(data)}>
        <View style={[productStyles.listContainer, data.item.selectedHighlight]}>
          <Image source={data.item.listImage} style={productStyles.productListImg} />
          <View style={productStyles.productInfo}>
              <Text style={productStyles.productItems}>{data.item.product}</Text>
              <Text style={productStyles.itemPrice}>{data.item.price} kr.</Text>
          </View>
         {/*  <Image style={productStyles.listArrow} source={data.item.selectedImg}/> */}
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
            keyExtractor={ (productData) => productData.product} 
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
              </TouchableHighlight> :             
              <TouchableHighlight onPress={ this.signOut } style={{justifyContent: 'center', alignSelf: 'center', backgroundColor: '#0f1c6f', borderWidth: 1, borderColor: 'white', borderRadius: 70, padding: 15, width: 75, height: 75}}>
                <Text style={{alignSelf: 'center', color: 'white'}}>Log u'</Text>
              </TouchableHighlight>
            }
            <Text>User token: {this.props.userToken}</Text>
            <View style={{marginBottom: 15}}></View>
        </View>
      </View>
    );
  }
}

const productStyles = StyleSheet.create({
  productWrapper: {
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: '#EFF2F5'
  },
  productContainer: {
      flex: 1,
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
    height: 75
  }
});

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userToken: state.userToken
  }
};

const mapDispatchToProps = {
  signIn
}

//export default  MainPage;

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);