import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';

import TravellerInformation from './screens/TravellerInformation';
import PaymentSuccess from './screens/PaymentSuccess';
import Flighttrip from './screens/Flighttrip';
import ResultSearchFlight from './screens/ResultSearchFlight';
import Register from './screens/Register';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
      
      <Stack.Screen name="TravellerInformation" component={TravellerInformation} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <Stack.Screen name="Flighttrip" component={Flighttrip} />
      <Stack.Screen name="ResultSearchFlight" component={ResultSearchFlight} />
      <Stack.Screen name="Register" component={Register} />
    
    </Stack.Navigator>
  </NavigationContainer>

  );
}


