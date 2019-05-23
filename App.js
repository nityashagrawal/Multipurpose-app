/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
export default class App extends Component{

  state = {
    search: null,
    blah: [],
  }

  componentDidMount(){
    fetch('https://api.ipify.org?format=json').then(response => response.json()).then(result => this.setState({ blah: result}))
  }

  
  render() {

      return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Multipurpose App</Text>
        
        <Text style={styles.ip}>Your IP Address is: {this.state.blah.ip}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: '300',
    color: 'magenta',
  },
  ip: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
    color: 'magenta',
  },
});
