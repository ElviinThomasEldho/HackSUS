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
  const [loading, setLoading] = useState(false);
  const NavigationContext = createContext(navigation);
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Trivandrum to Kochi",
      distance: 220,
      time: "4.5 hours",
      occupancy: 80,
      fare: 350.5,
      directions: [
        "Start from Trivandrum central bus station.",
        "Head north on NH66.",
        "Continue on NH66, passing through Kollam and Alappuzha.",
        "Arrive at Kochi central bus station.",
      ],
    },
    {
      id: 2,
      name: "Kozhikode to Thrissur",
      distance: 150,
      time: "3 hours",
      occupancy: 70,
      fare: 250.75,
      directions: [
        "Start from Kozhikode central bus station.",
        "Head south on NH66.",
        "Continue on NH66, passing through Malappuram and Palakkad.",
        "Arrive at Thrissur central bus station.",
      ],
    },
    {
      id: 3,
      name: "Alappuzha to Kannur",
      distance: 350,
      time: "7 hours",
      occupancy: 90,
      fare: 500.25,
      directions: [
        "Start from Alappuzha central bus station.",
        "Head north on NH66.",
        "Continue on NH66, passing through Kottayam and Ernakulam.",
        "Arrive at Kannur central bus station.",
      ],
    },
    {
      id: 4,
      name: "Kottayam to Kollam",
      distance: 90,
      time: "2 hours",
      occupancy: 75,
      fare: 180.0,
      directions: [
        "Start from Kottayam central bus station.",
        "Head south on NH183.",
        "Continue on NH183, passing through Pathanamthitta.",
        "Arrive at Kollam central bus station.",
      ],
    },
    {
      id: 5,
      name: "Palakkad to Ernakulam",
      distance: 180,
      time: "4 hours",
      occupancy: 85,
      fare: 300.75,
      directions: [
        "Start from Palakkad central bus station.",
        "Head south on NH544.",
        "Continue on NH544, passing through Thrissur and Angamaly.",
        "Arrive at Ernakulam central bus station.",
      ],
    },
  ]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${addPlusSign(
  //         start
  //       )}&key=AIzaSyATHrUfyMAKktMKK0Cbik89D5U79aYiX6w`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       setStartCoordinates(extractLocationCoordinates(response.data));
  //       axios
  //         .get(
  //           `https://maps.googleapis.com/maps/api/geocode/json?address=${addPlusSign(
  //             end
  //           )}&key=AIzaSyATHrUfyMAKktMKK0Cbik89D5U79aYiX6w`
  //         )
  //         .then((response) => {
  //           console.log(response);
  //           setEndCoordinates(extractLocationCoordinates(response.data));
  //           const config = {
  //             headers: {
  //               "content-type": "application/json",
  //               "X-Goog-Api-Key": "AIzaSyATHrUfyMAKktMKK0Cbik89D5U79aYiX6w",
  //               "X-Goog-FieldMask":
  //                 "routes.duration,routes.distanceMeters,routes.legs.steps.transitDetails",
  //             },
  //           };

  //           const data = {
  //             origin: {
  //               location: {
  //                 latLng: {
  //                   latitude: startCoordinates.latitude,
  //                   longitude: startCoordinates.longitude,
  //                 },
  //               },
  //             },
  //             destination: {
  //               location: {
  //                 latLng: {
  //                   latitude: endCoordinates.latitude,
  //                   longitude: endCoordinates.longitude,
  //                 },
  //               },
  //             },
  //             travelMode: "TRANSIT",
  //             computeAlternativeRoutes: true,
  //             routeModifiers: {
  //               avoidTolls: false,
  //               avoidHighways: false,
  //               avoidFerries: false,
  //             },
  //             languageCode: "en-US",
  //             units: "IMPERIAL",
  //           };

  //           console.log("Fetching Routes");
  //           axios
  //             .post(
  //               `https://routes.googleapis.com/directions/v2:computeRoutes`,
  //               data,
  //               config
  //             )
  //             .then((response) => {
  //               console.log(response);
  //               setRoutes(response.data.routes);
  //               setLoading(false);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // console.log(
  //   //   "Start : ",
  //   //   startCoordinates.latitude,
  //   //   startCoordinates.longitude
  //   // );

  //   // console.log(    //   "Start : ",
  //   //   startCoordinates.latitude,
  //   //   startCoordinates.longitude
  //   // );
  //   // console.log("End : ", endCoordinates.latitude, endCoordinates.longitude);
  // }, []);

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
