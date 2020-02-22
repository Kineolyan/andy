import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import LeavingScreen from '../screens/LeavingScreen';
import TvScreen from '../screens/TvScreen';
import CatScreen from '../screens/CatScreen';
import TaskScreen from '../screens/TaskScreen';
import MealScreen from '../screens/MealScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

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

const TaskStack = createStackNavigator(
  {
    Cat: TaskScreen
  },
  config);

TaskStack.navigationOptions = {
  tabBarLabel: 'Todos',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name="ios-apps" />
  )
};

TaskStack.path = 'tasks';

const MealStack = createStackNavigator(
  {
    Cat: MealScreen
  },
  config);

MealStack.navigationOptions = {
  tabBarLabel: 'Repas',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name="ios-apps" />
  )
};

MealStack.path = 'meals';

const navigatorConfigs = {
  olivier: {
    LeavingOfficeStack,
    TvStack,
    TaskStack,
    MealStack,
    SettingsStack,
  },
  colombe: {
    TaskStack,
    MealStack,
    TvStack,
    SettingsStack,
  }
};

const navigators = {};
for (const key in navigatorConfigs) {
  const navigator = createBottomTabNavigator(navigatorConfigs[key]);
  navigator.path = '';
  navigators[key] = navigator;
}

export default navigators.colombe;
export {
  navigators
}
