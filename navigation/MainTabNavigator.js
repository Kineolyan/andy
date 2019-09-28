import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LeavingScreen from '../screens/LeavingScreen';
import TvScreen from '../screens/TvScreen';
import CatScreen from '../screens/CatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// const HomeStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//   },
//   config
// );

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// HomeStack.path = 'home';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = 'settings';

const LeavingOfficeStack = createStackNavigator(
  {
    Leaving: LeavingScreen
  },
  config);

LeavingOfficeStack.navigationOptions = {
  tabBarLabel: 'Leaving',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name={Platform.IO === 'ios' ? 'ios-train' : 'md-train'} />
  )
};

LeavingOfficeStack.path = 'leaving';

const TvStack = createStackNavigator(
  {
    TV: TvScreen
  },
  config);

TvStack.navigationOptions = {
  tabBarLabel: 'TV Shows',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name={Platform.IO === 'ios' ? 'ios-tv' : 'md-tv'} />
  )
};

TvStack.path = 'tv';

const CatStack = createStackNavigator(
  {
    Cat: CatScreen
  },
  config);

CatStack.navigationOptions = {
  tabBarLabel: 'M. Chat',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name="logo-octocat" />
  )
};

CatStack.path = 'cat';

const tabNavigator = createBottomTabNavigator({
  LeavingOfficeStack,
  TvStack,
  CatStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
