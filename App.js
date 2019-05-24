import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground} from 'react-native';
export default class App extends Component{

  state = { 
      showIP1: false,
      showIP2: false,
      currentIp: '',
      ipDetails: {}, 
  };

find = () => {
    this.setState({showIP1:true})
    fetch('https://api.ipify.org?format=json').then(response => response.json()).then(result => {
      this.setState({
        currentIp: result.ip
      })
    })
  }
  findMore = () => {
    this.setState({showIP2:true})
    fetch('https://ipvigilante.com/json/'+ this.state.currentIp).then(response => response.json()).then(result => {
      this.setState({
        ipDetails: result.data
      })
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
          <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.find}>
              <Text>Find My IP!!</Text>
            </TouchableOpacity></View>
            {this.state.showIP1&&<Text  style={styles.ip}>Your IP Address is: {this.state.currentIp}</Text>}
            <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.findMore}>
              <Text>Find My Location!!</Text>
            </TouchableOpacity></View>
            {this.state.showIP2&&(this.state.currentIp!='')&&<View>
            <Text  style={styles.ip}>Your Continent is: {this.state.ipDetails.continent_name}</Text>}
            <Text  style={styles.ip}>Your Country is: {this.state.ipDetails.country_name}</Text>}
            <Text  style={styles.ip}>Your City is: {this.state.ipDetails.city_name}</Text>}
            <Text style={styles.ip}>Your Latitude  is: {this.state.ipDetails.latitude}</Text>}
            <Text  style={styles.ip}>Your Longitude is: }{this.state.ipDetails.longitude}</Text>}
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