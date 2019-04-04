import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, StatusBar } from 'react-native';
import Weather from "./components/WeatherIndex";
import { AdMobBanner } from 'expo';

export default class App extends React.Component {
  bannerError(e) {
    alert(e);
  }

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
        <AdMobBanner 
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-7650830264106685/3543064850"
          onDidFailToReceiveAdWithError={ (e) => this.bannerError(e)}
        />
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
