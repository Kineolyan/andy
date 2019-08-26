import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, Button, Alert } from 'react-native';
import * as sms from 'expo-sms';

const LEAVING_MESSAGES = [
  "Je pars du bureau. À tout à l'heure",
  "Finito le buro. Zou traino",
  "Départ du chouchou. Maison dans 57 minutes!",

];

function getRandomMessage(messages) {
  const idx = Math.floor(Math.random() * Math.floor(messages.length));
  return messages[idx];
}

async function notifyCo(message) {
  const { result } = await sms.sendSMSAsync(
    ['+33663053180'],
    message
  );
  return result;
}

function notifyHome() {
  return notifyCo(
    getRandomMessage(LEAVING_MESSAGES));
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
  try {
    const result = notifyFn();
    switch (result) {
    case 'cancelled':
      return confirmSms('SMS annulé');
    case 'sent':
      return confirmSms('SMS envoyé');
    case 'unknown':
    default:
      return confirmSms('Erreur pendant l\'envoi SMS');
    }
  } finally {
    cbk(null);
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
