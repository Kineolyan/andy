import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import LeavingScreen from '../screens/LeavingScreen';
import TvScreen from '../screens/TvScreen';
import TaskScreen from '../screens/TaskScreen';
import MealScreen from '../screens/MealScreen';
import MealInfoScreen from '../screens/MealInfoScreen';

// FIXME how to use this
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const SettingsStack = (() => {
  const Stack = createStackNavigator();

  return () => (
    <Stack.Navigator
        initialRouteName="settings"
        headerMode="screen">
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
})();

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

const LeavingOfficeStack = () => <LeavingScreen />;
LeavingOfficeStack.navigationOptions = {
  tabBarLabel: 'Leaving',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name={Platform.IO === 'ios' ? 'ios-train' : 'md-train'} />
  )
};

const TvStack = (() => {
  const Stack = createStackNavigator();

  return () => (
    <Stack.Navigator initialRouteName="tv"
        headerMode="screen">
      <Stack.Screen name="tv" component={TvScreen} />
    </Stack.Navigator>
  );
})();

TvStack.navigationOptions = {
  tabBarLabel: 'TV Shows',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name={Platform.IO === 'ios' ? 'ios-tv' : 'md-tv'} />
  )
};

const TaskStack = (() => {
  const Stack = createStackNavigator();
  return () => (
    <Stack.Navigator
        initialRouteName="tasks"
        headerMode="screen">
      <Stack.Screen name="tasks" component={TaskScreen} />
    </Stack.Navigator>
  );
})();

TaskStack.navigationOptions = {
  tabBarLabel: 'Todos',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name="ios-apps" />
  )
};

const MealStack = (() => {
  const Stack = createStackNavigator();
  return () => (
    <Stack.Navigator
        initialRouteName="meals"
        headerMode="screen">
      <Stack.Screen name="meals" component={MealScreen} />
      <Stack.Screen name="one-meal" component={MealInfoScreen} />
    </Stack.Navigator>
  );
})();

MealStack.navigationOptions = {
  tabBarLabel: 'Repas',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name="md-videocam" />
  )
};

const navigators = [
  ["olivier", [
    LeavingOfficeStack,
    TvStack,
    TaskStack,
    MealStack,
    SettingsStack,
  ]],
  ["colombe", [
    TaskStack,
    TvStack,
    MealStack,
    SettingsStack,
  ]]
].reduce(
  (acc, [key, entries]) => {
    const Tab = createBottomTabNavigator();
    const screenOptions = ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const element = entries.find(e => e.navigationOptions.tabBarLabel === route.name);
        if (element) {
          const renderIcon = element.navigationOptions.tabBarIcon;
          return renderIcon({focused});
        } else {
          return null;
        }
  
        // if (route.name === 'Home') {
        //   iconName = focused
        //     ? 'ios-information-circle'
        //     : 'ios-information-circle-outline';
        // } else if (route.name === 'Settings') {
        //   iconName = focused ? 'ios-list-box' : 'ios-list';
        // }
  
        // // You can return any component that you like here!
        // return <Ionicons name={iconName} size={size} color={color} />;
      },
    });
    const Navigator = () => (
      <Tab.Navigator screenOptions={screenOptions}>
        {entries.map(e => {
          const name = e.navigationOptions.tabBarLabel;
          return <Tab.Screen key={name} name={name} component={e} />;
        })}
      </Tab.Navigator>
    );

    return acc.set(key, Navigator);
  }, 
  new Map());

export default navigators.get("colombe");
export {
  navigators
}
