import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Clipboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast'

// export default class Temperature extends Component {
//   render() {
//     return (
//       <View style={styles.upper}>
//         <Ionicons style={styles.icons} color="white" size={100} name="ios-rainy" />
//         <Text style={styles.temp}>35˚</Text>
//       </View>
//     )
//   }
// }

function renderData(hourlyWeather, weatherCases){
  const weather = [];
  hourlyWeather.forEach((el, index)=>{
    const WC = weatherCases[`${el.title}`];
    WC.temperature = el.temperature;
    WC.humidity = el.humidity;
    WC.fullDT = el.fullDT;
    weather.push(
      <TouchableOpacity onPress={()=> copy2Clipboard(el)} style={styles.content} key={index}>
        <Text style={styles.time}>{el.hour}:00</Text>
        <View style={styles.contView}>
          <MaterialCommunityIcons style={styles.icons} color="white" size={40} name={WC.iconName} />
        </View>
        <View style={styles.contView}>
          <Text style={styles.temp}>{WC.temperature}</Text>
          <Text style={styles.title}>{WC.title}</Text>
        </View>
      </TouchableOpacity>
    );
  });
  return weather;
}

async function copy2Clipboard(data){
  const text = `[Time] ${data.fullDT} \n[Location] ${data.city}\n[Weather] ${data.title}\n[Temperature]: ${data.temperature}\n[Humidity]: ${data.humidity}`;
  await Clipboard.setString(text);
  toast.show('Copied to Clipboard!');
}

let toast = null;
function Weather({ wCases, hourlyWeather , weatherCases}){
  return (
    <View style={styles.upper}>
      <TouchableOpacity onPress={()=> copy2Clipboard(wCases)} style={styles.curContent}>
        <Text style={styles.curTime}>{wCases.curTime}</Text>
        <View style={styles.contView}>
          <MaterialCommunityIcons style={styles.icons} color="white" size={60} name={wCases.iconName} />
        </View>
        <View style={styles.contView}>
          <Text style={styles.curTemp}>{wCases.temperature}</Text>
          <Text style={styles.curTitle}>{wCases.title}</Text>
        </View>
      </TouchableOpacity>

      {renderData(hourlyWeather, weatherCases)}

      <Toast ref={(Toast)=> {toast = Toast}}/>
    </View>
  );
}

Weather.propTypes = {
  wCases: PropTypes.object.isRequired,
  hourlyWeather: PropTypes.array.isRequired,
  weatherCases: PropTypes.object.isRequired
}

 
export default Weather;

const styles = StyleSheet.create({
  upper: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  curContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  curTime:{
    paddingLeft: 30,
    fontSize: 20,
    color: 'white',
  },
  curTemp: {
    fontSize: 30,
    backgroundColor: 'transparent',
    color: 'white',
  },
  curTitle: {
    fontSize: 20,
    color: 'white'
  },
  content:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  time:{
    paddingLeft: 30,
    fontSize: 20,
    color: 'white',
  },
  contView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  temp: {
    fontSize: 15,
    backgroundColor: 'transparent',
    color: 'white',
  },
  title: {
    fontSize: 10,
    color: 'white'
  }
});