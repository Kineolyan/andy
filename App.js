import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import createAppNavigator from './navigation/AppNavigator';
import { initHook as initProfile } from './services/profile';

const appsPerProfile = new Map();
const NoApp = () => {
  return <Text>Oops. Something has not loaded</Text>;
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [userProfile, setProfile] = useState(undefined);

  useEffect( // Connect the the storage
    () => initProfile(profile => {
      if (profile) {
        const profileId = profile.id;
        if (!appsPerProfile.has(profileId)) {
          appsPerProfile.set(
            profileId,
            createAppNavigator(profileId));
        }
        setProfile(profileId);
      } else {
        setProfile(null);
      }
    }),
    []);

  if (!props.skipLoadingScreen && (!isLoadingComplete || userProfile == undefined)) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    const App = appsPerProfile.get(userProfile) || NoApp;
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <App />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
