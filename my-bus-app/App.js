import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ViewRoutesScreen from './screens/ViewRoutesScreen';
import RouteDetailScreen from './screens/RouteDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="View Routes" component={ViewRoutesScreen} />
        <Stack.Screen name="Route Detail" component={RouteDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

