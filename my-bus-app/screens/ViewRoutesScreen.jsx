import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import RoutesList from "../components/RoutesList";
import { createContext } from "react";
import axios from "axios";

function addPlusSign(address) {
  const words = address.split(" ");
  const result = words.join("+");
  return result;
}

function extractLocationCoordinates(data) {
  try {
    if (data.status === "OK" && data.results.length > 0) {
      const geometry = data.results[0].geometry;

      if (geometry && geometry.location) {
        const { lat, lng } = geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("Geometry location not found in the response.");
      }
    } else {
      throw new Error(`Error: ${data.status}`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    return null;
  }
}

const ViewRoutesScreen = ({ navigation, start, end }) => {
  const [loading, setLoading] = useState(true);
  const NavigationContext = createContext(navigation);
  const [routes, setRoutes] = useState([]);
  const [startCoordinates, setStartCoordinates] = useState(undefined);
  const [endCoordinates, setEndCoordinates] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${addPlusSign(
          start
        )}&key=AIzaSyATHrUfyMAKktMKK0Cbik89D5U79aYiX6w`
      )
      .then((response) => {
        console.log(response);
        setStartCoordinates(extractLocationCoordinates(response.data));
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${addPlusSign(
              end
            )}&key=AIzaSyATHrUfyMAKktMKK0Cbik89D5U79aYiX6w`
          )
          .then((response) => {
            console.log(response);
            setEndCoordinates(extractLocationCoordinates(response.data));
            const config = {
              headers: {
                "content-type": "application/json",
                "X-Goog-Api-Key": "AIzaSyATHrUfyMAKktMKK0Cbik89D5U79aYiX6w",
                "X-Goog-FieldMask":
                  "routes.duration,routes.distanceMeters,routes.legs.steps.transitDetails",
              },
            };

            const data = {
              origin: {
                location: {
                  latLng: {
                    latitude: startCoordinates.latitude,
                    longitude: startCoordinates.longitude,
                  },
                },
              },
              destination: {
                location: {
                  latLng: {
                    latitude: endCoordinates.latitude,
                    longitude: endCoordinates.longitude,
                  },
                },
              },
              travelMode: "TRANSIT",
              computeAlternativeRoutes: true,
              routeModifiers: {
                avoidTolls: false,
                avoidHighways: false,
                avoidFerries: false,
              },
              languageCode: "en-US",
              units: "IMPERIAL",
            };

            console.log("Fetching Routes");
            axios
              .post(
                `https://routes.googleapis.com/directions/v2:computeRoutes`,
                data,
                config
              )
              .then((response) => {
                console.log(response);
                setRoutes(response.data.routes);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(
    //   "Start : ",
    //   startCoordinates.latitude,
    //   startCoordinates.longitude
    // );

    // console.log(    //   "Start : ",
    //   startCoordinates.latitude,
    //   startCoordinates.longitude
    // );
    // console.log("End : ", endCoordinates.latitude, endCoordinates.longitude);
  }, []);

  return (
    <View>
      {loading ? (
        <Text>{`Searching for routes from ${start} to ${end}`}</Text>
      ) : (
        <NavigationContext.Provider value={navigation}>
          <Text>Routes</Text>
          <RoutesList routes={routes} />
        </NavigationContext.Provider>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewRoutesScreen;
