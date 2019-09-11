import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

export default function CatScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
          style={styles.touchable}
          onPress={() => alert('coucou')}>
        <Text style={styles.content}>
          !Cha-caca!
        </Text>
      </TouchableOpacity>
    </View>);
}

CatScreen.navigationOptions = {
  title: 'On pense au chat',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  touchable: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  content: {},
});
