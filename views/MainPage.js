import React from "react";
import { View, Text, Button, StyleSheet, FlatList, Image } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import HistoryPage from "./HistoryPage";
import PurchasePage from "./PurchasePage";
import { TouchableHighlight } from "react-native-gesture-handler";

class MainPage extends React.Component {
static navigationOptions = {
  title: 'Produkter',
}

  render() {

/*     purchaseMenu = () => {
      //add parameters to be passed to the PurchasePage.js
      alert(item.product + " pressed");
      this.props.navigation.navigate('Purchase', {
        productName: this.item.product,
        productPrice: 25
      });
  } */

    this.state = { 
      productData: [
        {id: 0, product: 'Red Bull', price: 12, listImage: require('../assets/images/small/redbull-small.png'), bigImg: ''},
        {id: 1, product: 'Coca Cola Zero', price: 5, listImage: require('../assets/images/small/cola-zero-small.png'), bigImg: require('../assets/images/large/cola-zero-big.png')},
        {id: 2, product: 'Coca Cola Classic', price: 5, listImage: require('../assets/images/small/cola-small.png'), bigImg: require('../assets/images/large/Cola-big.png')},
        {id: 3, product: 'Faxe Kondi', price: 5, listImage: require('../assets/images/small/faxe-kondi-small.png'), bigImg: require('../assets/images/large/faxekondi-big.png')},
        {id: 4, product: 'Pepsi Max', price: 5, listImage: require('../assets/images/small/pepsi-small.png'), bigImg: require('../assets/images/large/Cola-big.png')},
        {id: 5, product: 'Cocio Classic', price: 7, listImage: require('../assets/images/small/Cocio-Small.png'), bigImg: require('../assets/images/large/cocio-big.png')},
        {id: 6, product: 'Lean Protein Shake', price: 20, listImage: require('../assets/images/small/Protein-small.png'), bigImg: require('../assets/images/large/protein-big.png')}
      ]      
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#EFF2F5'}}>
        <View style={productStyles.productContainer}>
          <FlatList style={{flex: 1}} 
            keyExtractor={ (productData) => productData.product} 
            data={this.state.productData} 
            renderItem={ ({item }) => 
            <TouchableHighlight onPress={ () => {
              this.props.navigation.navigate('Purchase', {
                productName: item.product,
                productPrice: item.price,
                promoImage: item.bigImg
              });
            } }> 
              <View style={productStyles.listContainer}>
                  <Image source={item.listImage} style={productStyles.productListImg} />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={productStyles.productItems}>{item.product}</Text>
                    <Text style={productStyles.itemPrice}>{item.price} kr.</Text>
                  </View>
                 {/*  <Text style={productStyles.productItems}>{item.product} {item.price}kr.</Text> */}
                  <Image style={productStyles.listArrow} source={require('../assets/icons/list-arrow.png')} />
              </View>
            </TouchableHighlight>
            }
            />
        </View>
      </View>
    );
  }
}

const productStyles = StyleSheet.create({
  productContainer: {
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
      shadowRadius: 5
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

const HomeStack = createStackNavigator(
  {
  AppMain: MainPage,
  Purchase: PurchasePage,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#EFF2F5'
      },
      headerTintColor: '#001DD1',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRight: (
        <Button title='add more' onPress={() => alert("pressed")} />
      ),
    }
  }
);

HomeStack.navigationOptions = ( {navigation} ) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const HistoryStack = createStackNavigator(
  {
  Historik: HistoryPage,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#EFF2F5'
      },
      headerTintColor: '#001DD1',
      headerTitle: 'Historik',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    }
  }
);

const TabNav = createBottomTabNavigator(
  {
      Historik: HistoryStack,
      Produkter: HomeStack,
  },
  {
    initialRouteName: 'Produkter'
  }
);

export default createAppContainer(TabNav);