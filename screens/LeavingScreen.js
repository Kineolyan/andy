import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Alert
} from 'react-native';
import * as sms from 'expo-sms';

const LEAVING_MESSAGES = [
  "Je pars du bureau. À tout à l'heure",
  "Finito le buro. Zou traino",
  "Départ du chouchou. Maison dans 57 minutes!",
];
const EXIT_STATION_MESSAGES = [
  "Je quitte la Défense. Papa is coming",
  "Mon train vient de sortir de la Défense",
  "C'est bon, je quitte la Défense"
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
  return notifyCo('Je suis à la Défense. Prochain train dans ');
}

function notifyStationExit() {
  return notifyCo(
    getRandomMessage(EXIT_STATION_MESSAGES));
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
const EXIT_BUTTON = 'exit-station';

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
      },
      [EXIT_BUTTON]: {
        disabled: false
      }
    };
    if (sendingSms !== null) {
      buttonStyles[sendingSms].disabled = true;
    }

    return (
      <ScrollView style={styles.container}>
        <Text>Olivier, it's time to leave</Text>
        <View style={styles.buttonGroup}>
          <Button
            style={styles.smsButton}
            onPress={() => sendSms(OFFICE_BUTTON, notifyHome, setSmsInProgress)}
            title="Je pars <3"
            color="#834bfc"
            accessibilityLabel="Send a SMS notification from the office"
            {...buttonStyles[OFFICE_BUTTON]}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            style={styles.smsButton}
            onPress={() => sendSms(STATION_BUTTON, notifyProgress, setSmsInProgress)}
            title="J'attends à la gare"
            color="#ed8c04"
            accessibilityLabel="Send a SMS notification from the station"
            {...buttonStyles[STATION_BUTTON]}
          />
          <Button
            style={styles.smsButton}
            onPress={() => sendSms(EXIT_BUTTON, notifyStationExit, setSmsInProgress)}
            title="Le train part de la Défense"
            color="#ed8c04"
            accessibilityLabel="Send a SMS notification from the station"
            {...buttonStyles[EXIT_BUTTON]}
          />
        </View>
      </ScrollView>);
  }
}

LeavingScreen.navigationOptions = {
  title: 'Retour vers la Maison!',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
  },
  buttonGroup: {
    paddingTop: 10
  },
  smsButton: {
    marginBottom: 2,
    color: 'black'
  }
});
