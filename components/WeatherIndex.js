import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import Weather from './Weather';
import PropTypes from 'prop-types';

// export default class Weather extends Component {
//   render() {
//     return (
//       <LinearGradient colors={['#00C6FB', '#005BEA']} style={styles.container}>
//         <Temperature />
//         <SubInfo />
//       </LinearGradient>
//     ) 
//   }
// }

const weatherCases = {
  Rain: {
    colors: ['#00C6FB', '#005BEA'],
    title: "Raining",
    subTitle: "for more info....",
    iconName: 'weather-pouring' 
  },
  Clear: {
    colors: ['#FEF253', '#FF7300'],
    title: "Clear",
    subTitle: "super clear",
    iconName: 'weather-sunny' 
  },
  Thunderstorm: {
    colors: ['#09203f', '#537895'],
    title: "Thunderstorm",
    subTitle: "run away",
    iconName: 'weather-lightning' 
  },
  Clouds: {
    colors: ['#6a85b6', '#bac8e0'],
    title: "Cloud",
    subTitle: "grey",
    iconName: 'weather-cloudy' 
  },
  Haze: {
    colors: ['#D7D2CC', '#304352'],
    title: "Haze",
    subTitle: "grey",
    iconName: 'weather-fog' 
  },
  Snow: {
    colors: ['#a8edea', '#fed6e3'],
    title: "Snow",
    subTitle: "do you want to build...",
    iconName: 'weather-snowy' 
  },
  Drizzle: {
    colors: ['#89F7FE', '#66A6FF'],
    title: "Drizzle",
    subTitle: "do you want to build...",
    iconName: 'weather-rainy' 
  },
}

function WeatherIndex({ weatherInfo, hourlyWeather }){
  const wCases = weatherCases[`${weatherInfo.name}`];
  if(!wCases) wCases = weathercases['Haze'];
  wCases.temperature = weatherInfo.temperature;
  wCases.curTime = weatherInfo.time;
  wCases.fullDT = weatherInfo.fullDT;
  wCases.humidity = weatherInfo.humidity;
  wCases.city = weatherInfo.city;
  return(
    <LinearGradient colors={wCases.colors} style={styles.container}>
      <Text style={styles.city}>{weatherInfo.city}</Text>
      <Weather wCases={ wCases } hourlyWeather={hourlyWeather} weatherCases={weatherCases}/>
    </LinearGradient>
  );
}

WeatherIndex.propTypes = {
  weatherInfo: PropTypes.object.isRequired,
  hourlyWeather: PropTypes.array.isRequired
}

 
export default WeatherIndex;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    paddingTop: 20,
    color: 'white',
    fontSize: 20
  }
});