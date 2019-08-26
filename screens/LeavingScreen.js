import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, Button, Alert } from 'react-native';
import * as sms from 'expo-sms';

async function notifyCo(message) {
  const { result } = await sms.sendSMSAsync(
    '+33663053180',
    message
  );
  return result;
}

function notifyHome() {
  return notifyCo("Je pars du bureau. À tout à l'heure");
}

function notifyProgress() {
  return notifyCo('Je suis à la gare. Prochain train dans ');
}

function confirmSms(message) {
  return Alert.alert(
    'SMS result',
    message);
}

async function sendSms(button, notifyFn, cbk) {
  cbk(button);
  const result = notifyFn();
  cbk(null);
  switch (result) {
  case 'cancelled':
    return confirmSms('SMS cancelled');
  case 'sent':
    return confirmSms('SMS envoyé');
  case 'unknown':
  default:
    return confirmSms('Error when sending SMS');
  }
}

const OFFICE_BUTTON = 'office';
const STATION_BUTTON = 'station';

export default function LeavingScreen() {
  const [availability, setAvailability] = useState(null);
  const [sendingSms, setSmsInProgress] = useState(null);
  useEffect(() => {
    sms.isAvailableAsync().then(a => setAvailability(a));
  });

  if (availability === null) {
    return (
      <ScrollView style={styles.container}>
        <Text>Test availability of the SMS service...</Text>
      </ScrollView>);
  } else {
    const buttonStyles = {
      [OFFICE_BUTTON]: {
        disabled: false
      },
      [STATION_BUTTON]: {
        disabled: false
      }
    };
    if (sendingSms !== null) {
      buttonStyles[sendingSms].disabled = true;
    }

    return (
      <ScrollView style={styles.container}>
        <Text>Olivier, it's time to leave</Text>
        <Button
          onPress={() => sendSms(OFFICE_BUTTON, notifyHome, setSmsInProgress)}
          title="Notify Home <3"
          color="#841584"
          accessibilityLabel="Send a SMS notification from the office"
        />
        <Button
          onPress={() => sendSms(STATION_BUTTON, notifyProgress, setSmsInProgress)}
          title="Notify progress"
          color="#0c0c0c"
          accessibilityLabel="Send a SMS notification from the station"
        />
      </ScrollView>);
  }
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
