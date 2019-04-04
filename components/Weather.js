import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

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

function Weather({ wCases }){
  return (
    <View style={styles.upper}>
      <MaterialCommunityIcons style={styles.icons} color="white" size={100} name={wCases.iconName} />
      <Text style={styles.temp}>{wCases.temperature}˚</Text>
      <Text style={styles.title}>{wCases.title}</Text>
    </View>
  );
}

Weather.propTypes = {
  wCases: PropTypes.object.isRequired
}

 
export default Weather;

const styles = StyleSheet.create({
  upper: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icons: {
    marginTop: 70
  },
  temp: {
    fontSize: 60,
    backgroundColor: 'transparent',
    color: 'white',
  },
  title: {
    fontSize: 30,
    color: 'white'
  }
});