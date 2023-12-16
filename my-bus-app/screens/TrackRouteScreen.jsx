import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import RoutesList from "../components/RoutesList";
import RouteCard from "../components/RouteCard";

const TrackRouteScreen = ({route, start, end}) => {
  const {data} = route.params
  return <View>
    <RouteCard route={data}/>
  </View>;
};

const styles = StyleSheet.create({

});

export default TrackRouteScreen;
