import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Temperature extends Component {
  render() {
    return (
      <View style={styles.upper}>
        <Text>Icon Here!</Text>
        <Text style={styles.temp}>35˚</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  upper: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  temp: {
    fontSize: 60,
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 10,
  },
});