import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  Platform
} from 'react-native';

import tvList from '../apis/tv-list';

async function loadSeries(setSeries) {
  setSeries(null);
  const series = await tvList.readSeries();
  setSeries(series);
}

async function watchEpisode(serie, setSeries) {
  alert(`watched ${serie.name}`);
  // setSeries(null);
  // await tvList.recordWatchedEpisode(serie);
  // return loadSeries(setSeries);
}

function SerieView({serie, setSeries}) {
  return (
    <View key={serie.name}>
      <Text>{serie.name}</Text>
      <Text>{serie.episodeIdx} / {serie.lastEpisodeIdx}</Text>
      <Button
          onPress={test}
          title="Marquer comme vu"
          color="#841584" />
    </View>)
}

function test() {
  alert('coucou');
}

export default function TvScreen() {
  const [series, setSeries] = useState(null);
  useEffect(() => {
    loadSeries(setSeries);
  });

  let content;
  if (series === null) {
    content = <Text>Loading...</Text>;
  } else if (series.length === 0) {
    content = <Text>No series to watch :(</Text>;
  } else {
    const entries = series.map(serie => SerieView({serie, setSeries}));
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
          onPress={test}
          title="Rafraîchir la list"
          color="#841584" />
      </View>
    </View>);
}

TvScreen.navigationOptions = {
  title: 'Find which show to look at',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
  },
  contentContainer: {
    paddingTop: 10,
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
});
