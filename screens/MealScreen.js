// @ts-check
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

import * as mealApi from '../apis/meals';

async function listMeals(setMeals, markLoading) {
  markLoading(true);
	// const tasks = await taskApi.readTasks();
	const meals = [
		{
				"id": 0,
				"name": "Pommes de terre gratinées",
				"cookedTimes": 1,
				"source": "Marabout 442"
		},
		{
				"id": 1,
				"name": "Menu d'été #1",
				"cookedTimes": 1,
				"source": "Batch cooking"
		},
		{
				"id": 2,
				"name": "Menu d'automne #2",
				"cookedTimes": 1,
				"source": "Batch cooking"
		},
		{
				"id": 3,
				"name": "Menu d'hiver #1",
				"cookedTimes": 1,
				"source": "Batch cooking"
		},
		{
				"id": 4,
				"name": "Menu d'hiver #2",
				"cookedTimes": 1,
				"comments": "Pas la salade de chou rouge",
				"source": "Batch cooking"
		},
		{
				"id": 5,
				"name": "Winterpot",
				"cookedTimes": 2
		},
		{
				"id": 6,
				"name": "Automne #12",
				"cookedTimes": 1,
				"source": "Pinterest"
		}
	];
  setMeals(meals);
  markLoading(false);
}

async function executeTask(task, setMeals, markLoading) {
  markLoading(true);
  // await taskApi.executeTask(task);
  return listMeals(setMeals, markLoading);
}

function getLastDate(time) {
  const date = new Date(time);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function MealInfo({meal: {cookedTimes, lastTimestamp}}) {
	if (cookedTimes) {
		const last = lastTimestamp
			? ` (dernière fois le ${getLastDate(lastTimestamp)})`
			: "";
		return (
			<Text style={styles.details}>
				Plat cuisiné {cookedTimes} fois{last}
			</Text>
		);
	}
}

function MealView({meal, markDone}) {
  return (
    <View key={meal.name}>
      <TouchableOpacity
          style={styles.good}
          onPress={() => markDone(meal)}>
        <Text style={styles.content}>
          {meal.name}
        </Text>
      </TouchableOpacity>
			<MealInfo meal={meal} />
    </View>
  );
}

export default function MealScreen() {
  const [meals, setMeals] = useState(null);
  const [loading, markLoading] = useState(false);

  let content;
  if (loading) {
    content = <Text>Loading...</Text>;
  } else if (meals === null) {
    content = <Text>Chargement des plats...</Text>;
  } else if (meals.length === 0) {
    content = <Text>Oops. Aucune idée de repas :)</Text>;
  } else {
    const markDone = task => {};
    const entries = meals.map(meal => MealView({meal, markDone}));
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
          onPress={() => listMeals(setMeals, markLoading)}
          title={meals === null ? "Charger la liste" : "Rafraîchir la liste"}
          color="#841584" />
      </View>
    </View>
  );
}

MealScreen.navigationOptions = {
  title: 'Il est midi douze :P',
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
  good: {
    ...baseButtonStyle,
    backgroundColor: '#a2fc99',
  },
  details: {
    fontWeight: '600',
		fontSize: 13,
		fontStyle: 'italic'
  },
});
