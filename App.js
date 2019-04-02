import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, StatusBar } from 'react-native';
import Weather from "./components/WeatherIndex";

export default class App extends React.Component {
  state = {
    isLoaded: true
  }
  render() {
    const { isLoaded } = this.state;
    
    return (
      <View style={styles.container}>
      <StatusBar hidden={ true } />
        {isLoaded ? <Weather /> : (
          <View style={styles.loading}>
            <ActivityIndicator size="large"/>
            <Text style={styles.textLoading}>Getting Data from Server...</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  textLoading: {
    marginTop: 15,
    fontSize: 20,
  }
});
