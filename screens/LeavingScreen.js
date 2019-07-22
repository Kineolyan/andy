import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import * as sms from 'expo-sms';

const availability = sms.isAvailableAsync();

export default function LeavingScreen() {
  const notifyHome = () => {
    availability.then(a => alert(`SMS availability: ${a}`));
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Olivier, it's time to leave</Text>
      <Button
        onPress={notifyHome}
        title="Notify Home <3"
        color="#841584"
        accessibilityLabel="Send a SMS notification to Colombe"
      />
    </ScrollView>
  );
}

LeavingScreen.navigationOptions = {
  title: 'Leaving the office',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
  },
});
