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

export default function MealEditor({navigation, route}) {
  const meal: Meal = route.params.meal; 
  const [edited, setEdited] = useState<Meal>({...meal});

  let content = <Text>Editing meal {edited.data.name}</Text>;

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

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
  }
});
