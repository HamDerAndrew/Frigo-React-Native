import React from "react";
import { View, Text, Button, StyleSheet, FlatList, Image, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import HistoryPage from "./HistoryPage";
import PurchasePage from "./PurchasePage";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Payment from "./ProcessModal";

class MainPage extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    selectMultiple: false,
    productData: []
  };
}
static navigationOptions = ({navigation}) => {
  return {
    title: 'Produkter',
    headerRight: (
      <TouchableOpacity style={{marginRight: 15}} onPress={navigation.getParam('selectionType')}>
        <Image style={{width: '100%', height: '60%'}} resizeMode={'contain'} source={require('../assets/icons/select_multiple.png')}/>
        <Text style={{}}>Vælg flere</Text>
      </TouchableOpacity>
    ),
  }
}

_signOutAsync = async () => {
  await AsyncStorage.clear();
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
    item.selectedHighlight = productStyles.listContainer;
    return item; 
  });
  this.setState({
    productData: productListData
  });
  console.log("these data ");
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
  this.setState({
    productData: this.state.productData,
  })
}

renderMultiple = data => {
  return(
  <TouchableHighlight underlayColor='transparent' activeOpacity={.3}  onPress={ () => this.selectItem(data)}>
    <View style={[productStyles.listContainer, data.item.selectedHighlight]}>
      <Image source={data.item.listImage} style={productStyles.productListImg} />
      <View style={productStyles.productInfo}>
          <Text style={productStyles.productItems}>{data.item.product}</Text>
          <Text style={productStyles.itemPrice}>{data.item.price} kr.</Text>
      </View>
      <Image style={productStyles.listArrow} source={require('../assets/icons/list-arrow.png')} />
    </View>
  </TouchableHighlight>
  );
}

renderSingle = data => {
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
          {/* <Image style={productStyles.listArrow} source={require('../assets/icons/list-arrow.png')} /> */}
          <Image style={productStyles.listArrow} />
        </View>
      </TouchableHighlight>
      );
  }

}

renderItems = input => {
  if(this.state.selectMultiple === false) {
    alert("Rendering");
    this.renderSingle(input);
  } else {
    this.renderMultiple(input);
  }
};

  render() {
    return (
      <View style={productStyles.productWrapper}>
        <View style={productStyles.productContainer}>
          <FlatList style={productStyles.flatList} 
            keyExtractor={ (productData) => productData.product} 
            data={this.state.productData}
            extraData={this.state}
            renderItem={ item => this.renderSingle(item)}
/*             renderItem={ ({item }) => 
            <TouchableHighlight underlayColor='transparent' activeOpacity={.3} onPress={ () => {
              this.props.navigation.navigate('Purchase', {
                productName: item.product,
                productPrice: item.price,
                promoImage: item.bigImg
              });
            } }> 
              <View style={[productStyles.listContainer, productStyles.isSelected]}>
                  <Image source={item.listImage} style={productStyles.productListImg} />
                  <View style={productStyles.productInfo}>
                    <Text style={productStyles.productItems}>{item.product}</Text>
                    <Text style={productStyles.itemPrice}>{item.price} kr.</Text>
                  </View>
                  <Image style={productStyles.listArrow} source={require('../assets/icons/list-arrow.png')} />
              </View>
            </TouchableHighlight>
            } */
            />
            <View style={{marginTop: 15}}></View>
            {/* <Button title="Sign Out" onPress={ this._signOutAsync } /> */}
            <TouchableHighlight onPress={ this._signOutAsync } style={{justifyContent: 'center', alignSelf: 'center', backgroundColor: '#0f1c6f', borderWidth: 1, borderColor: 'white', borderRadius: 70, padding: 15, width: 75, height: 75}}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Log u'</Text>
            </TouchableHighlight>
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
    backgroundColor: 'red',
    borderColor: 'yellow',
    borderWidth: 1
  },
  flatList: {
      flex: 1
  },
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
  }
});

export default  MainPage;