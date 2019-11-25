import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import MainPage from '../views/MainPage';
import PurchasePage from '../views/PurchasePage';
import ProcessModal from '../views/ProcessModal';
import HistoryPage from '../views/HistoryPage';
import AuthLoadingPage from '../views/AuthLoadingPage';
import LoginPage from '../views/LoginPage';
import PaymentLoadingPage from '../views/PaymentLoadingPage'
import CustomTabBar from '../Components/CustomTabBar';

const HomeStack = createStackNavigator(
    {
        AppMain: {
            screen: MainPage,
        },
        Purchase: {
            screen: PurchasePage,
        },
        Payment: {
            screen: ProcessModal,
        },
        PaymentLoad: {
          screen: PaymentLoadingPage
        },
    },
    {
      initialRouteName: 'AppMain',
      headerLayoutPreset: 'left',
      defaultNavigationOptions: {
          headerTitleStyle: {
            fontSize: 35,
            //fontWeight needs to be a string of 200 in order to work on Android devices
            fontWeight: '200',
            //Set font to Roboto or custom font to fix a OnePlus device problem with displaying the page title.
            fontFamily: 'nunitobold'
          },
          headerStyle: {
            height: 70,
            backgroundColor: '#EFF2F5',
            //Remove bottom border on iOS nav header
            borderBottomWidth: 0,
            //Remove bottom border on Android nav header
            elevation: 0,
          },
          headerTintColor: '#001DD1',
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
      headerLayoutPreset: 'left',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#EFF2F5',
          height: 70,
           //Remove bottom border on iOS nav header
          borderBottomWidth: 0,
          //Remove bottom border on Android nav header
          elevation: 0,
        },
        headerTintColor: '#001DD1',
        headerTitle: 'Historik',
        headerTitleStyle: {
          fontSize: 35,
          //fontWeight needs to be a string of 200 in order to work on Android devices
          fontWeight: '200',
          fontFamily: 'nunitobold',
        },
      }
    }
  );



  const TabNav = createBottomTabNavigator(
    {
        Produkter: HomeStack,
        Historik: HistoryStack,
        //Profil: ProfileStack
  
    },
    {
      initialRouteName: 'Produkter',
      tabBarComponent: CustomTabBar,
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
          initialRouteName: 'Auth',
      }
  ));