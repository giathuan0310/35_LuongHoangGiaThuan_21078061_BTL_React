import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import FlightScreen from './screens/FlightScreen';
import TravellerInformation from './screens/TravellerInformation';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='TravellerInformation' screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FlightScreen" component={FlightScreen} />
      <Stack.Screen name="TravellerInformation" component={TravellerInformation} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}


