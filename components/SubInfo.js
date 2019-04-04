import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

// export default class SubInfo extends Component {
//   render() {
//     return (
//       <View style={styles.lower}>
//         <Text style={styles.title}> Raining</Text>
//         <Text style={styles.subTitle}>For more info look outside</Text>
//       </View>
//     )
//   }
// }

function SubInfo({ wCases }){
  return (
    <View style={styles.lower}>
      <Text style={styles.title}> { wCases.title }</Text>
      <Text style={styles.subTitle}> { wCases.subTitle } </Text>
    </View>
  );
}

SubInfo.propTypes = {
  wCases: PropTypes.object.isRequired
}

export default SubInfo

const styles = StyleSheet.create({
  lower: {
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  title: {
    fontSize: 24,
    backgroundColor: 'transparent',
    color: 'white',
    marginBottom: 10,
    fontWeight: '300'
  },
  subTitle:{
    fontSize: 24,
    backgroundColor: 'transparent',
    color: 'white',
    marginBottom: 25,
    fontWeight: '300'
  }
});