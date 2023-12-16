import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import ViewRoutesScreen from './ViewRoutesScreen';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

import * as Location from 'expo-location';

const HomeScreen = () => {
  const [submitted, setSubmitted] = useState(false)
  const [mapLoading, setMapLoading] = useState(true)
  const [startLocation, setStartLocation] = useState('')
  const [endLocation, setEndLocation] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  // const [currentLocation, setCurrentLocation] = useState('')

  let SAMPLE_REGION;
  const maps = [];
  
  const ASPECT_RATIO = width / height;

  const LATITUDE_DELTA = 0.05;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  // useEffect(async () => {

  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   console.log(location)
          
  //   const LATITUDE = location.latitude
  //   const LONGITUDE = location.longitude

  //   SAMPLE_REGION = {
  //     latitude: LATITUDE,
  //     longitude: LONGITUDE,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,
  //   };

    
  //   maps.push(
  //     <MapView
  //       liteMode
  //       key={`map_0`}
  //       style={styles.map}
  //       initialRegion={SAMPLE_REGION}
  //     />,
  //   );
    
  //   console.log(maps)
  // }, [])


  return (
    <View style={styles.container}>
      {/* <ScrollView style={StyleSheet.absoluteFillObject}>{maps}</ScrollView> */}
       
      {submitted ? 
      (<ViewRoutesScreen start={startLocation} end={endLocation} />
      ) 
      : 
      (<View>
        <Text>Start Location</Text>
        <TextInput style={styles.input} value={startLocation} onChangeText={(text) => setStartLocation(text)}/>
        <Text>End Location</Text>
        <TextInput style={styles.input} value={endLocation} onChangeText={(text) => setEndLocation(text)}/>
        <Button title='Submit' onPress={() => {setSubmitted(true)}}/>
        <StatusBar style="auto" />
      </View>)}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    minWidth: 150,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  map: {
    height: 200,
    marginVertical: 50,
  },
});

export default HomeScreen;