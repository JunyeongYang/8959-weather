import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, StatusBar } from 'react-native';
import WeatherIndex from "./components/WeatherIndex";
import { AdMobBanner } from 'expo';
import Moment from 'moment';
import { LinearGradient } from 'expo';
import Toast from 'react-native-easy-toast'

const WEATHER_API_KEY = "151f154f63bc0d2064c7f558721da759";

export default class App extends React.Component {
  bannerError(e) {
    this.setState({
      adMobError:true
    })
  }

  state = {
    isLoaded: false,
    adMobError: false,
    error: null,
    timezone: Math.abs(new Date().getTimezoneOffset() / 60),
    weatherInfo: {
      temperature: null,
      humidity: null,
      name: null,
      time: null,
      city: null,
      fullDT: null
    },
    hourlyWeather: [],
    prevDate: null,
    bgColors: ['#d57eeb', '#fccb90', '#a6c0fe', '#8fd3f4', '#f5576c', '#fee140', '#a8edea', '#fef9d7', '#d299c2', '#764ba2'],
    rndNo1: Math.floor(Math.random()*10),
    rndNo2: Math.floor(Math.random()*10)
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition( 
      position => {
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
    const curWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${WEATHER_API_KEY}`;
    const hourlyWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&APPID=${WEATHER_API_KEY}`;
    fetch(curWeatherUrl)
      .then(r => r.json())
      .then(json => {
        const curTime = Moment.unix(json.dt).format("YYYY-MM-DD HH:mm");
        this.setState({
          weatherInfo: {
            temperature: `${Math.floor(json.main.temp)}˚`,
            humidity: `${json.main.humidity}%`,
            name: json.weather[0].main,
            time: curTime.split(' ')[1],
            city: json.name,
            fullDT: curTime
          }
        });
        fetch(hourlyWeatherUrl)
          .then(r=> r.json())
          .then(json => {
            // console.log(json);
            const weatherList = json.list;
            for(let i = 0; this.state.hourlyWeather.length < 7 ; i++){
              this.setWeatherData(weatherList[i]);
            }
            // console.log(this.state.hourlyWeather);
          })
          .then(()=>{
            this.setState({
              isLoaded: true
            })
          })
      })
      .catch(e => console.log(e));
  }

  setWeatherData(el){
    const timezone = this.state.timezone;
    const curTime = Moment(el.dt_txt).add(timezone, 'hours').format('YYYY-MM-DD HH:mm:ss');
    
    const arrHour = ['00', '03', '06', '09', '12', '15', '18', '21'];
    const hour = curTime.split(' ')[1].split(':')[0];

    if(arrHour.indexOf(hour) !== -1){
      const els = {
        fullDT: curTime,
        curTime: curTime.split(' ')[1],
        hour: hour,
        title: el.weather[0].main,
        temperature: `${Math.floor(el.main.temp)}˚`,
        humidity: `${el.main.humidity}%`,
        city: this.state.weatherInfo.city
      }
      this.setState({
        hourlyWeather: this.state.hourlyWeather.concat([els])
      });
    }
  }

  render() {
    const { isLoaded, error, weatherInfo, hourlyWeather } = this.state;
    return (
      <LinearGradient colors={[`${this.state.bgColors[this.state.rndNo1]}`, `${this.state.bgColors[this.state.rndNo2]}`]} style={styles.container}>
        <StatusBar hidden={ true } />
        {isLoaded ? <WeatherIndex weatherInfo={ weatherInfo } hourlyWeather={hourlyWeather}/> : (
          <View style={styles.loading}>
            { error ? null : <ActivityIndicator size="large"/>}
            { error ? <Text style={styles.errorText}>{error}</Text> : 
                <Text style={styles.textLoading}>Getting Data from Server...</Text> 
            }
          </View>
        )}
        {this.state.adMobError ? null : <AdMobBanner 
                              bannerSize="smartBannerLandscape"
                              adUnitID="ca-app-pub-7650830264106685/3543064850"
                              onDidFailToReceiveAdWithError={ (e) => this.bannerError(e)}
                            />}
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  textLoading: {
    marginTop: 15,
    fontSize: 20,
  },
});
