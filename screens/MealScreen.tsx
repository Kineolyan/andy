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
import { set } from '../services/profile';

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

function MealView({meal, markDone, seeDetails}: {meal: Meal, markDone: any, seeDetails: any}) {
  return (
    <View key={meal.id}>
    <TouchableOpacity
        style={styles.editButton}
        onPress={() => seeDetails(meal)}>
      <Text>
        {meal.data.name}
      </Text>
    </TouchableOpacity>
      <TouchableOpacity
          style={styles.cookedButton}
          onPress={() => markDone(meal)}>
        <Text>
          Cuisiné
        </Text>
      </TouchableOpacity>
			<MealInfo meal={meal} />
    </View>
  );
}

const markAsDone = async (
    meal: Meal, 
    setMeals: any,
    markLoading: any) => {
  markLoading(true);
  try {
    const updatedMeal = await mealApi.markAsCooked(meal);
    setMeals((meals: Meal[]) => {
      const idx = meals.findIndex(m => m.id === updatedMeal.id);
      const reMeals = [...meals];
      reMeals[idx] = updatedMeal;
      return reMeals;
    });
  } finally {
    markLoading(false);
  }
};

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
    const seeDetails = (meal: Meal) => navigation.navigate('one-meal', {meal});
    const markDone = (meal: Meal) => markAsDone(meal, setMeals, markLoading);
    const entries = meals.map(meal => MealView({meal, markDone, seeDetails}));
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
  editButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fce9a9',
  },
  cookedButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#76d6fc',
  },
  details: {
    fontWeight: '600',
		fontSize: 13,
		fontStyle: 'italic'
  },
});
