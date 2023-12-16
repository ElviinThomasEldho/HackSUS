import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import { NavigationContext } from "@react-navigation/native";

const RouteCard = ({ route }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useContext(NavigationContext);

  return (
    <View>
      <Text>{route.name}</Text>
      <Text>{route.distance}</Text>
      <Text>{route.time}</Text>
      {expanded && (
        <View>
          <Text>{route.distance}</Text>
          <Text>{route.time}</Text>
        </View>
      )}
      <Button
        title="Expand"
        onPress={() => {
          setExpanded((value) => !value);
        }}
      />
      <Button
        title="Track"
        onPress={() => {
          navigation.navigate("Track Route", {
            data: route,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RouteCard;
