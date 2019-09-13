import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Button, Image, Text } from 'react-native';
import MainPage from '../views/MainPage';
import PurchasePage from '../views/PurchasePage';
import ProcessModal from '../views/ProcessModal';
import HistoryPage from '../views/HistoryPage';
import AuthLoadingPage from '../views/AuthLoadingPage';
import LoginPage from '../views/LoginPage';
import PurchaseMulPage from '../views/PurchaseMulPage';

const HomeStack = createStackNavigator(
    {
        AppMain: {
            screen: MainPage
        },
        Purchase: {
            screen: PurchasePage,
        },
        PurchaseMore: {
          screen: PurchaseMulPage,
        },
        Payment: {
            screen: ProcessModal
        },
    },
    {
      initialRouteName: 'AppMain',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#EFF2F5'
          },
          headerTintColor: '#001DD1',
          headerTitleStyle: {
            fontWeight: 'bold'
          },

        }
    }
);


//Hide tabbar on other pages
HomeStack.navigationOptions = ( {navigation} ) => {
    let tabBarVisible = true;
    if(navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
}

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
        Produkter: HomeStack,
        Historik: HistoryStack,
/*         Flere: PurchaseMulPage, */
  
    },
    {
      initialRouteName: 'Produkter',
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#0F1C6F',
        activeBackgroundColor: '#173CD1',
        labelStyle: {
          fontSize: 16,
          paddingBottom: 10
        }
      }
    },
  );

  const AuthStack = createStackNavigator(
    {
        SignIn: LoginPage,
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  );

  export default createAppContainer(createSwitchNavigator(
      {
          AuthLoading: AuthLoadingPage,
          Main: TabNav,
          Auth: AuthStack,
      },
      {
          initialRouteName: 'Auth'
      }
  ));