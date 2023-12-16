import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import { NavigationContext } from "@react-navigation/native";

const RouteDetails = ({ route }) => {
  const [status, setStatus] = useState(false);
  const navigation = useContext(NavigationContext);

  return (
    <View>
      <Text>{route.name}</Text>
      <Text>Distance : {route.distance} km</Text>
      <Text>Time Taken : {route.time}</Text>
      {route.occupancy < 50 ? <Text>Not Crowded</Text> : route.occupancy > 50 && route.occupancy < 8 ?  <Text>Less Crowded</Text> : <Text>Very Crowded</Text>}
      <Text>Fare : {route.fare}</Text>
      <Text>Directions :-</Text>
      {route.directions.map((direction, index) => <Text>{index + 1}. {direction}</Text>)}
      <Button
        title={status ? 'Start Tracking' : 'Stop Tracking'}
        onPress={() => {
          setStatus((value) => !value)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RouteDetails;
