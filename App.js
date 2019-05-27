import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
export default class App extends Component{

  state = { 
      showIP1: false,
      showIP2:false,
      showIP3:false,
      time:false,
      ipDetails: {}, 
      currentIp: '',
      continent: '',
      city: '',
      showtime: false,
      time:'',
  };
  
  find = () => {
    fetch('https://api.ipify.org?format=json').then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showIP1: true,showIP2: false,showIP3:false,showtime:false,
        currentIp: result.ip
      })
    })
  }

  findMore= () => {this.find();
    fetch('https://ipvigilante.com/json/'+ this.state.currentIp).then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showIP2: true,showIP1: false,showIP3:false,showtime: false,
        ipDetails: result.data
      })
    })
  }

  findCustom= () => {
    fetch('https://ipvigilante.com/json/'+ this.state.currentIp).then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showIP3: true,showIP1: false,showIP2:false,showtime:false,
        ipDetails: result.data
      })
    })
  }

  findtime= () => {
    fetch('http://worldtimeapi.org/api/timezone/'+ this.state.continent+'/'+this.state.city).then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showtime: true,showIP1: false,showIP2:false,showIP3:false,
        time: result.datetime
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
          <Text style={styles.welcome}>Multipurpose App </Text>
          <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.find}>
              <Text>Find My IP!!</Text>
            </TouchableOpacity></View>
            {this.state.showIP1&&<Text  style={styles.ip}>Your IP Address is: {this.state.currentIp}</Text>}
            <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.findMore}>
              <Text>Find My Location!!</Text>
            </TouchableOpacity></View>
            {(this.state.showIP2)&&(this.state.ipDetails)&&<View>
            <Text  style={styles.ip}>Your Continent is: {this.state.ipDetails.continent_name}</Text>
            <Text  style={styles.ip}>Your Country is: {this.state.ipDetails.country_name}</Text>
            {this.state.ipDetails.city_name&&<Text  style={styles.ip}>Your City is: {this.state.ipDetails.city_name}</Text>}
            <Text style={styles.ip}>Your Latitude  is: {this.state.ipDetails.latitude}</Text>
            <Text  style={styles.ip}>Your Longitude is: {this.state.ipDetails.longitude}</Text>
            </View>}
            <View style={styles.row}>
            <TextInput style={styles.input1} onChangeText={(currentIp) => this.setState({currentIp}) }
              placeholder={"IP Address"}
            />
            <TouchableOpacity style ={styles.button} onPress={this.findCustom}>
              <Text>Find Custom IP Location!!</Text>
            </TouchableOpacity></View>
            {(this.state.showIP3)&&(this.state.ipDetails)&&<View>
            <Text  style={styles.ip}>Your Continent is: {this.state.ipDetails.continent_name}</Text>
            <Text  style={styles.ip}>Your Country is: {this.state.ipDetails.country_name}</Text>
            {this.state.ipDetails.city_name&&<Text  style={styles.ip}>Your City is: {this.state.ipDetails.city_name}</Text>}
            <Text style={styles.ip}>Your Latitude  is: {this.state.ipDetails.latitude}</Text>
            <Text  style={styles.ip}>Your Longitude is: {this.state.ipDetails.longitude}</Text>
            </View>}
            <View style={styles.row}><TextInput style={styles.input2} onChangeText={(continent) => this.setState({continent}) }
              placeholder={"Continent"}
            />
            <TextInput style={styles.input2} onChangeText={(city) => this.setState({city}) }
              placeholder={"City"}
            /></View>
            <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.findtime}>
              <Text>Get the Time!!</Text>
            </TouchableOpacity></View>
            {(this.state.showtime)&&this.state.time&&<View><Text  style={styles.ip}>The Time is: {this.state.time.slice(11)}</Text></View>}
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
  },
  input1: {
    flex: 0.7,
    height: 40, 
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'white'
  },
  input2: {
    flex: 0.5,
    height: 40, 
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'white'
  }
});