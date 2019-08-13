import { createStackNavigator } from 'react-navigation';
import PurchasePage from '../views/PurchasePage';

/* const AppNavigator = createStackNavigator({
  Product: { screen: PurchasePage },
}); */

const HomeStack = createStackNavigator({
    Purchase: PurchasePage,
  });

export default HomeStack;