import * as React from 'react'
import {
  NavigationActions,
  TabNavigator,
  StackNavigator,
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from '../containers/pages/HomeScreen'
import BuyScreen from '../containers/pages/BuyScreen'
import ReleaseScreen from '../containers/pages/ReleaseScreen'
import ProfileScreen from '../containers/pages/ProfileScreen'
import OwnedScreen from '../containers/pages/OwnedScreen'
import BoughtScreen from '../containers/pages/BoughtScreen'
import LoginScreen from '../containers/pages/LoginScreen'
import RegisterScreen from '../containers/pages/RegisterScreen'

const HomeStack = StackNavigator(
    {
      home: {
        screen: HomeScreen,
        navigationOptions: {
          title: '精选',
        }
      },
      buy: {
        screen: BuyScreen,
        navigationOptions: {
          title: '商品详情',
          header: null,
          tabBarVisible: false,
        },
      },
    },
    {
      mode:       'modal'
    }
)

const ProfileStack = StackNavigator(
  {
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: '个人信息',
      }
    },
    bought: {
      screen: BoughtScreen,
      navigationOptions: {
        title: '已买宝贝',
      }
    },
    owned: {
      screen: OwnedScreen,
      navigationOptions: {
        title: '出售宝贝',
      }
    },
  }
)

const MainTabNavigator = TabNavigator(
  {
    homeStack: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home-outline' : 'ios-home-outline'}
            size={30}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    release: {
      screen: ReleaseScreen,
      navigationOptions: {
        tabBarLabel: 'Release',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-add-circle-outline' : 'ios-add-circle-outline'}
            size={30}
            style={{ color: tintColor }}
          />
        ),
        header: null,
        // tabBarVisible: false,
      },
    },
    profileStack: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
                name={focused ? 'ios-person-outline' : 'ios-person-outline'}
                size={30}
                style={{ color: tintColor }}
            />
        ),
      },
    },
  },
  {
    initialRouteName: 'homeStack',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      inactiveTintColor: '#333',
      inactiveBackgroundColor: '#FAE05E',
      activeTintColor: '#333',
      activeBackgroundColor: 'white',
      showLabel: false,
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
)

const LoginRegisterStackNavigator = StackNavigator(
  {
    login: {
      screen: LoginScreen,
      navigationOptions: {
        title: '登录',
      }
    },
    register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: '注册',
      }
    }
  },
  {
    headerMode: 'none',
    mode:       'modal',
  }
)

const RootNavigator = StackNavigator(
  {
    MainTabNavigator:          { screen: MainTabNavigator            },
    LoginStackNavigator: { screen: LoginRegisterStackNavigator }
  },
  {
    headerMode: 'none',
    mode:       'modal',
  })

const initialRouterAction = NavigationActions.init()

const initialState = RootNavigator.router.getStateForAction(initialRouterAction, null)

export const reducer = (state = initialState, action) => {
  let nextState
  // Simply return the original `state` if `nextState` is null or undefined.
  switch (action.type) {

    default:
      nextState = RootNavigator.router.getStateForAction(action, state)
  }
  return nextState || state
}

export default RootNavigator