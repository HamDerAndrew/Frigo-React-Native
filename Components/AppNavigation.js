import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import PurchasePage from '../views/PurchasePage';
import MainPage from '../views/MainPage';
import HistoryPage from '../views/HistoryPage';

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
  },
  {
    initialRouteName: 'Produkter'
  }
);

export default createAppContainer(TabNav);