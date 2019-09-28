// @ts-check
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  Platform,
} from 'react-native';

import * as taskApi from '../apis/task';

async function readState(setTask, markLoading) {
  markLoading(true);
  const task = await taskApi.readCatTask();
  setTask(task);
  markLoading(false);
}

async function markAsClean(setTask, markLoading) {
  markLoading(true);
  await taskApi.cleanCat();
  return readState(setTask, markLoading);
}

function getButtonStyle({daysToTarget}) {
  if (daysToTarget > 1) {
    return styles.good;
  } else if (daysToTarget >= 0) {
    return styles.soon;
  } else if (daysToTarget > -3) {
    return styles.late;
  } else {
    return styles.veryLate;
  }
}

function getDueDate({dueDate}) {
  const d = new Date(dueDate);
  return `${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

export default function CatScreen() {
  const [task, setTask] = useState(null);
  const [loading, markLoading] = useState(false);

  let content;
  if (loading) {
    content = <Text>Loading...</Text>;
  } else if (task === null) {
    content = (
      <TouchableOpacity
          style={styles.unknown}
          onPress={() => readState(setTask, markLoading)}>
        <Text style={styles.content}>
          ? Caca cha ?
        </Text>
      </TouchableOpacity>
    );
  } else {
    const buttonStyle = getButtonStyle(task);
    const beforeText = task.daysToTarget >= 0
      ? `${task.daysToTarget} jours restant`
      : `Dépassé de ${-task.daysToTarget} jours`;
    content = (
      <View>
        <TouchableOpacity
            style={buttonStyle}
            onPress={() => markAsClean(setTask, markLoading)}>
          <Text style={styles.content}>
            ! Cha-caca !
          </Text>
        </TouchableOpacity>
        <Text>Prévu pour le {getDueDate(task)}</Text>
        <Text>{beforeText}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {content}
      <View style={styles.refreshContainer}>
        <Button
          onPress={() => readState(setTask, markLoading)}
          title="Rafraîchir"
          color="#841584" />
      </View>
    </View>);
}

CatScreen.navigationOptions = {
  title: 'On pense au chat',
};

const baseButtonStyle = {
  alignItems: 'center',
  padding: 10
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  unknown: {
    ...baseButtonStyle,
    backgroundColor: '#DDDDDD',
  },
  good: {
    ...baseButtonStyle,
    backgroundColor: '#a2fc99',
  },
  soon: {
    ...baseButtonStyle,
    backgroundColor: '#fca549'
  },
  late: {
    ...baseButtonStyle,
    backgroundColor: '#fc5f5f'
  },
  veryLate: {
    ...baseButtonStyle,
    backgroundColor: '#bf3136'
  },
  content: {},
  refreshContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 10,
  },
});
