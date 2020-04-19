import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DefaultNavigator, {navigators} from './MainTabNavigator';

export default function createNavigator(userProfile) {
  const Navigator = navigators.get(userProfile) || DefaultNavigator;
  return () => (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};
