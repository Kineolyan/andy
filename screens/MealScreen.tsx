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
import type {Meal} from '../apis/meals';

async function listMeals(setMeals, markLoading) {
  markLoading(true);
	// const tasks = await taskApi.readTasks();
	mealApi.readMeals().then(
    meals => {
      setMeals(meals);
      markLoading(false);
    },
    err => {
      setMeals(null);
      markLoading(false);
    });
}

function getLastDate(time: number): string {
  const date = new Date(time);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function MealInfo({meal: {data: {count: cookedTimes, lastTime: lastTimestamp}}}: {meal: Meal}) {
	if (cookedTimes) {
		const last = lastTimestamp
			? ` (dernière fois le ${getLastDate(lastTimestamp)})`
			: "";
		return (
			<Text style={styles.details}>
				Plat cuisiné {cookedTimes} fois{last}
			</Text>
		);
	} else {
    return null;
  }
}

function MealView({meal, markDone}: {meal: Meal, markDone: any}) {
  return (
    <View key={meal.id}>
      <TouchableOpacity
          style={styles.good}
          onPress={() => markDone(meal)}>
        <Text style={styles.content}>
          {meal.data.name}
        </Text>
      </TouchableOpacity>
			<MealInfo meal={meal} />
    </View>
  );
}

export default function MealScreen({navigation}) {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [loading, markLoading] = useState(false);

  let content;
  if (loading) {
    content = <Text>Loading...</Text>;
  } else if (meals === null) {
    content = <Text>Chargement des plats...</Text>;
  } else if (meals.length === 0) {
    content = <Text>Oops. Aucune idée de repas :)</Text>;
  } else {
    const markDone = () => navigation.navigate('one-meal');
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
