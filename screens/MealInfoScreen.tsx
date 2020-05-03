// @ts-check
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as mealApi from '../apis/meals';
import type {Meal} from '../apis/meals';

export default function MealInfoScreen({route, navigation}) {
  const meal: Meal = route.params.meal; 
  return (
    <View style={styles.container}>
      <Text>{meal.data.name}</Text>
      <Text>Cuisiné {meal.data.count} fois</Text>
      <Text>Note: {meal.data.rating} / 5</Text>
      <Text>Source: {meal.data.source}</Text>
      <Text>{meal.data.comments || "-- no comments --"}</Text>
      <Button 
        onPress={() => navigation.goBack()}
        title={"Marqué comme cuisiné"} />
    </View>
  );
}

MealInfoScreen.navigationOptions = {
  title: 'One meal to feed them all',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
  },
});
