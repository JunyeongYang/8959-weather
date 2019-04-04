import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, StatusBar } from 'react-native';
import WeatherIndex from "./components/WeatherIndex";
import { AdMobBanner } from 'expo';

const WEATHER_API_KEY = "151f154f63bc0d2064c7f558721da759";

export default class App extends React.Component {
  bannerError(e) {
    alert(e);
  }

  state = {
    isLoaded: false,
    error: null,
    weatherInfo: {
      temperature: null,
      name: null
    }
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition( 
      position => {
        console.log(position);
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  _getWeather = (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}`
    fetch(url)
      .then(r => r.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          weatherInfo: {
            temperature: json.main.temp,
            name: json.weather[0].main
          }
        });
        console.log(json);
        console.log(this.state);
      })
      .catch(e => console.log(e));
  }

  render() {
    const { isLoaded, error, weatherInfo } = this.state;
    
    return (
      <View style={styles.container}>
        <StatusBar hidden={ true } />
        {isLoaded ? <WeatherIndex weatherInfo={ weatherInfo }/> : (
          <View style={styles.loading}>
            { error ? null : <ActivityIndicator size="large"/>}
            { error ? <Text style={styles.errorText}>{error}</Text> : <Text style={styles.textLoading}>Getting Data from Server...</Text> }
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
  errorText: {
    color: "red",
    marginBottom: 40
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
  },
});
