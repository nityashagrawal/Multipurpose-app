import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground,Linking} from 'react-native';
export default class App extends Component{

  state = { 
      showIP1: false,Pressed1: false,
      showIP2:false,Pressed2: false,
      showIP3:false,Pressed3: false,
      time:false,Pressed4: false,
      ipDetails: {}, 
      currentIp: '',
      continent: '',
      city: '',
      showtime: false,
      time:'',
  };
  
  find = () => {this.setState({Pressed1 : true})
    fetch('https://api.ipify.org?format=json').then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showIP1: true,showIP2: false,showIP3:false,showtime:false,Pressed1:false,
        currentIp: result.ip
      })
    })
  }

  findMore= () => {this.setState({Pressed2 : true}),this.find();
    fetch('https://ipvigilante.com/json/'+ this.state.currentIp).then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showIP2: true,showIP1: false,showIP3:false,showtime: false,Pressed2:false,
        ipDetails: result.data
      })
    })
  }

  findCustom= () => {this.setState({Pressed3 : true})
    fetch('https://ipvigilante.com/json/'+ this.state.currentIp).then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showIP3: true,showIP1: false,showIP2:false,showtime:false,Pressed3:false,
        ipDetails: result.data
      })
    })
  }

  findtime= () => {this.setState({Pressed4 : true})
    fetch('http://worldtimeapi.org/api/timezone/'+ this.state.continent+'/'+this.state.city).then(response => response.json()).then(result => {console.log(result);  
    this.setState({
        showtime: true,showIP1: false,showIP2:false,showIP3:false,Pressed4:false,
        time: result.datetime
      })
    })
  }
  
  render() {
  
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <ImageBackground
          style={{
            flex: 1,
            resizeMode: 'center',
          }}
          source={{ uri: 'https://static.tvtropes.org/pmwiki/pub/images/voldemort.jpg' }}> */}
          <View style={styles.header}><Text style={styles.welcome}>Multipurpose App </Text></View>
          <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.find}>
              <Text style={styles.buttontext}>Find My IP!!</Text>
            </TouchableOpacity></View>
            <ActivityIndicator size="small" color="red" animating={this.state.Pressed1}/>
            {this.state.showIP1&&<View style={styles.body}><Text  style={styles.ip}>Your IP Address is: {this.state.currentIp}</Text></View>}
            <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.findMore}>
              <Text style={styles.buttontext}>Find My Location!!</Text>
            </TouchableOpacity></View>
            <ActivityIndicator size="small" color="red" animating={this.state.Pressed2}/>
            {(this.state.showIP2)&&(this.state.ipDetails)&&<View >
            <View style={styles.body}><Text  style={styles.ip}>Your Continent is: {this.state.ipDetails.continent_name}</Text></View>
            <View style={styles.body}><Text  style={styles.ip}>Your Country is: {this.state.ipDetails.country_name}</Text></View>
            {this.state.ipDetails.city_name&&<View style={styles.body}><Text  style={styles.ip}>Your City is: {this.state.ipDetails.city_name}</Text></View>}
            <View style={styles.body}><Text style={styles.ip}>Your Latitude  is: {this.state.ipDetails.latitude}</Text></View>
            <View style={styles.body}><Text  style={styles.ip}>Your Longitude is: {this.state.ipDetails.longitude}</Text></View>
            </View>}
            <View style={styles.row}>
            <TextInput style={styles.input1} onChangeText={(currentIp) => this.setState({currentIp}) }
              placeholder={"IP Address"}
            />
            <TouchableOpacity style ={styles.button} onPress={this.findCustom}>
              <Text style={styles.buttontext}>Find Custom IP Location!!</Text>
            </TouchableOpacity></View>
            <ActivityIndicator size="small" color="red" animating={this.state.Pressed3}/>
            {(this.state.showIP3)&&(this.state.ipDetails)&&<View >
              <View style={styles.body}><Text  style={styles.ip}>Your Continent is: {this.state.ipDetails.continent_name}</Text></View>
            <View style={styles.body}><Text  style={styles.ip}>Your Country is: {this.state.ipDetails.country_name}</Text></View>
            {this.state.ipDetails.city_name&&<View style={styles.body}><Text  style={styles.ip}>Your City is: {this.state.ipDetails.city_name}</Text></View>}
            <View style={styles.body}><Text style={styles.ip}>Your Latitude  is: {this.state.ipDetails.latitude}</Text></View>
            <View style={styles.body}><Text  style={styles.ip}>Your Longitude is: {this.state.ipDetails.longitude}</Text></View>
            </View>}
            <View style={styles.row}><TextInput style={styles.input2} onChangeText={(continent) => this.setState({continent}) }
              placeholder={"Continent"}
            />
            <TextInput style={styles.input2} onChangeText={(city) => this.setState({city}) }
              placeholder={"City"}
            /></View>
            <View style={styles.row}>
            <TouchableOpacity style ={styles.button} onPress={this.findtime}>
              <Text style={styles.buttontext}>Get the Time!!</Text>
            </TouchableOpacity></View>
            <ActivityIndicator size="small" color="red" animating={this.state.Pressed4}/>
            {(this.state.showtime)&&this.state.time&&<View style={styles.body}><Text  style={styles.ip}>The Time is: {this.state.time.slice(11)}</Text></View>}
            {(this.state.showtime)&&!this.state.time&&<View style={styles.row}><Text style={styles.ip}>Not a Valid Timezone!</Text>
            <TouchableOpacity style ={styles.button} onPress={() =>Linking.openURL('http://worldtimeapi.org/api/timezone')}>
              <Text style={styles.buttontext}>List of Valid Timezones!</Text>
            </TouchableOpacity></View>}
        {/* </ImageBackground> */}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  header:{
    backgroundColor: '#f2f2f2',
    height:60,
    // padding: 15,
    // paddingBottom: 10,
    margin: 10,
    // shadowOpacity: 0.2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 100},
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 30,
    // textAlign: 'center',
    // margin: 10,
    fontWeight: '100',
    color: 'black',
  },
  ip: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
    color: 'black',
    margin :5,
  },
  button: {
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  input1: {
    flex: 0.7,
    height: 40, 
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: '#f2f2f2',
    margin: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: '300',
  },
  input2: {
    flex: 0.5,
    height: 40, 
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: '#f2f2f2',
    margin: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: '300',
  },
  buttontext: {
    fontSize: 17,
    fontWeight: '300',
    color: 'black',
  },
  body:{
    backgroundColor: '#cce6ff',
    height:25,
    // padding: 15,
    // paddingBottom: 10,
    margin: 10,
    // shadowOpacity: 0.2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 100},
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});