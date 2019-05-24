/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground} from 'react-native';
export default class App extends Component{

  constructor(props) {console.log(1)
    super(props);
    this.state = { showIP: false,
      blah: {},
      moreblah: {}, };
  //     fetch('https://api.ipify.org?format=json').then(response => response.json()).then(result => {
  //     const abc='https://ipvigilante.com/json/' + result.ip
  //     fetch(abc).then(response => response.json()).then(result1 => this.setState({ blah: result, moreblah: result1}))
  // }) 
    }

  IpPressed = () => {
    this.setState({showIP:true})
  }
  componentDidUpdate(){
    fetch('https://api.ipify.org?format=json').then(response => response.json()).then(result => {
      const abc='https://ipvigilante.com/json/' + result.ip
      fetch(abc).then(response => response.json()).then(result1 => this.setState({ blah: result, moreblah: result1}))
  }) 
  }
  
  render() {
      return (
      <View style={styles.container}>
        <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'center',
        }}
        source={{ uri: 'https://static.tvtropes.org/pmwiki/pub/images/voldemort.jpg' }}>
        <Text style={styles.welcome}>Multipurpose App</Text>
        <View style={styles.row}><TouchableOpacity style ={styles.button} onPress={this.IpPressed}>
          <Text>Find My IP!!</Text>
        </TouchableOpacity></View>
        {this.state.moreblah.data&&<View >
        {this.state.showIP&&<Text  style={styles.ip}>Your IP Address is: {this.state.blah.ip}</Text>}
        {this.state.showIP&&<Text  style={styles.ip}>Your Continent is: {this.state.moreblah.data.continent_name}</Text>}
        {this.state.showIP&&<Text  style={styles.ip}>Your Country is: {this.state.moreblah.data.country_name}</Text>}
        {this.state.showIP&&<Text  style={styles.ip}>Your City is: {this.state.moreblah.data.city_name}</Text>}
        {this.state.showIP&&<Text style={styles.ip}>Your Latitude  is: {this.state.moreblah.data.latitude}</Text>}
       {this.state.showIP&&<Text  style={styles.ip}>Your Longitude is: }{this.state.moreblah.data.longitude}</Text>}
        </View>}
        </ImageBackground>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'blue',
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});
