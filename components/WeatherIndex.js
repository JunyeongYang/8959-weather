import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import Temperature from './Temperature';
import SubInfo from './SubInfo';

export default class Weather extends Component {
  render() {
    return (
      <LinearGradient colors={['#00C6FB', '#005BEA']} style={styles.container}>
        <Temperature />
        <SubInfo />
      </LinearGradient>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});