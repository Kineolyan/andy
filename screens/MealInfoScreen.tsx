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

function EditButton({meal, navigation}) {
  return (
    <Button
      onPress={() => navigation.navigate('edit', {meal})}
      title="Edit"
      color="#fff"
    />
  );
}

export default function MealInfoScreen({route, navigation}) {
  const meal: Meal = route.params.meal; 

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => EditButton({meal, navigation}),
    });
  }, [navigation, meal]);

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
      <Button 
        onPress={() => navigation.navigate('edit', {meal})}
        title={"Editer"} />
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
