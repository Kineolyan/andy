import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DefaultNavigator, {navigators} from './MainTabNavigator';

export default function createNavigator(userProfile) {
  const navigator = navigators[userProfile] || DefaultNavigator;
  return createAppContainer(
    createSwitchNavigator({
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Main: navigator,
    })
  );
};
