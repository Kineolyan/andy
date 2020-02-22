import React, {useState} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as taskApi from '../apis/task';

async function listTasks(setTasks, markLoading) {
  markLoading(true);
  const tasks = await taskApi.readTasks();
  setTasks(tasks);
  markLoading(false);
}

async function executeTask(task, setTask, markLoading) {
  markLoading(true);
  await taskApi.executeTask(task);
  return listTasks(setTask, markLoading);
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
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function getHumanUnit(unit) {
  switch (unit) {
  case 'd': return 'jours';
  case 'w': return 'semaines';
  case 'm': return 'mois';
  case 'y': return 'ans';
  default: return unit;
  }
}

function getFrequency({frequency}) {
  const {duration, unit} = taskApi.parseFrequency(frequency);
  const hUnit = getHumanUnit(unit);
  return `Tous les ${duration} ${hUnit}`;
}

function TaskView({task, markDone}) {
  const buttonStyle = getButtonStyle(task);
  const beforeText = task.daysToTarget >= 0
    ? `${task.daysToTarget} jours restant`
    : `Dépassé de ${-task.daysToTarget} jours`;

  return (
    <View key={task.name}>
      <TouchableOpacity
          style={buttonStyle}
          onPress={() => markDone(task)}>
        <Text style={styles.content}>
          {task.name}
        </Text>
      </TouchableOpacity>
      <Text>Prévu pour le {getDueDate(task)}. {beforeText}</Text>
      {task.frequency ? <Text>{getFrequency(task)}</Text> : null}
    </View>
  );
}

export default function TaskScreen() {
  const [tasks, setTasks] = useState(null);
  const [loading, markLoading] = useState(false);

  let content;
  if (loading) {
    content = <Text>Loading...</Text>;
  } else if (tasks === null) {
    content = <Text>Load the list</Text>;
  } else if (tasks.length === 0) {
    content = <Text>Rien à faire. Bravo :)</Text>;
  } else {
    const markDone = task => executeTask(task, setTasks, markLoading);
    const entries = tasks.map(task => TaskView({task, markDone}));
    content = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {entries}
      </ScrollView>);
  }

  return (
    <View style={styles.container}>
      {content}
      <View style={styles.refreshContainer}>
        <Button
          onPress={() => listTasks(setTasks, markLoading)}
          title="Rafraîchir la liste"
          color="#841584" />
      </View>
    </View>
  );
}

TaskScreen.navigationOptions = {
  title: 'Y a des trucs à faire',
};

const baseButtonStyle = {
  alignItems: 'center',
  padding: 10
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
  },
  contentContainer: {
    paddingBottom: 70
  },
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
  nameText: {
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 5,
  },
  episodeText: {
    color: '#a39f9f',
    fontSize: 13,
    backgroundColor: 'transparent',
  },
});
