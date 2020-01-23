import React, { useState, useEffect } from 'react';
import {
  Picker,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import {initHook as initProfile, set as changeProfile} from '../services/profile';

const switchToAdvancedNasty = (setAdvanced, value) => {
  setAdvanced(value);
  if (value) {
    setTimeout(
      () => setAdvanced(false),
      1000 * 15);
  }
}

export default function SettingsScreen() {
  const [profile, setProfile] = useState(undefined);
  const [advanced, setAdvanced] = useState(false);
  useEffect( // Connect the the storage
    () => initProfile(profile => setProfile(profile ? profile.id : null)),
    []);

  if (!advanced) {
    return (
      <View style={styles.container}>
        <Text>Profil</Text>
        <Picker
          selectedValue={profile}
          style={{height: 50, width: "100%"}}
          onValueChange={(newProfile) => changeProfile(newProfile)}>
          <Picker.Item label="Colombe" value="colombe" />
          <Picker.Item label="Olivier" value="olivier" />
        </Picker>
        <View>
          <Text>Use advanced mode</Text>
          <Switch
            value={advanced}
            onValueChange={value => switchToAdvancedNasty(setAdvanced, value)}/>
        </View>
      </View>
    );
  } else {
    return <ExpoConfigView />;
  }
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
});