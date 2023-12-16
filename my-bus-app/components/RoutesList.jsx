import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import RouteCard from "./RouteCard";

const RoutesList = ({routes}) => {
  return <ScrollView>
    {routes.map((route) => <RouteCard key={route.id} route={route} />)}
  </ScrollView>;
};

const styles = StyleSheet.create({
   
});

export default RoutesList;
