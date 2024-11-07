import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import FlightScreen from './screens/FlightScreen';
import TravellerInformation from './screens/TravellerInformation';
import PaymentSuccess from './screens/PaymentSuccess';
import Flighttrip from './screens/Flighttrip';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Flighttrip' screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FlightScreen" component={FlightScreen} />
      <Stack.Screen name="TravellerInformation" component={TravellerInformation} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <Stack.Screen name="Flighttrip" component={Flighttrip} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}


