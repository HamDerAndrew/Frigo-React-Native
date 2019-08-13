import React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableNativeFeedback, Image } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import HistoryPage from "./HistoryPage";
import TopMenu from "../Components/TopMenu";
import PurchasePage from "./PurchasePage";
import { TouchableHighlight } from "react-native-gesture-handler";

class MainPage extends React.Component {
static navigationOptions = {
  title: 'Produkter',
/*   headerTintColor: '#001DD1',
  headerStyle: {
    backgroundColor: '#EFF2F5',
  } */
}

  purchaseMenu =() => {
    alert("To purchase page");
    this.props.navigation.navigate('Purchase');
}

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#EFF2F5'}}>
        <Text style={{color: 'white'}}>MainPage</Text>
        <View style={productStyles.productContainer}>
                <FlatList style={{flex: 1}}
                data={[
                    {id: 0, key: 'Red Bull', price: 10, listImage: require('../assets/images/small/redbull-small.png')},
                    {id: 1, key: 'Coca Cola Zero', price: 12, listImage: require('../assets/images/small/cola-zero-small.png')},
                    {id: 2, key: 'Coca Cola Classic', price: 17, listImage: require('../assets/images/small/cola-small.png')},
                    {id: 3, key: 'Faxe Kondi', price: 10, listImage: require('../assets/images/small/faxe-kondi-small.png')},
                    {id: 4, key: 'Pepsi Max', price: 10, listImage: require('../assets/images/small/pepsi-small.png')},
                    {id: 5, key: 'Cocio Classic', price: 10, listImage: require('../assets/images/small/Cocio-Small.png')},
                    {id: 6, key: 'Lean Protein Shake', price: 10, listImage: require('../assets/images/small/Protein-small.png')}
                ]}
                renderItem={({item}) =>     
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Purchase')}>
                    <View style={productStyles.listContainer}>
                        <Image source={item.listImage} style={productStyles.productListImg} />
                        <Text style={productStyles.productItems}>{item.key} {item.price}kr.</Text>
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
      padding: 10,
      fontSize: 18,   
      height: 44,
      width: 300
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
  }
);

export default createAppContainer(TabNav);