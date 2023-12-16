import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import { NavigationContext } from "@react-navigation/native";

const RouteCard = ({ route }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useContext(NavigationContext);

  return (
    <View>
      <Text>{route.name}</Text>
      <Text>Distance : {route.distance} km</Text>
      <Text>Time Taken : {route.time}</Text>
      {expanded && (
        <View>
          {route.occupancy < 50 ? <Text>Not Crowded</Text> : route.occupancy > 50 && route.occupancy < 8 ?  <Text>Less Crowded</Text> : <Text>Very Crowded</Text>}
          <Text>Fare : {route.fare}</Text>
        </View>
      )}
      <Button
        title="Expand"
        onPress={() => {
          setExpanded((value) => !value);
        }}
      />
      <Button
        title="View"
        onPress={() => {
          navigation.navigate("Route Detail", {
            data: route,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RouteCard;
