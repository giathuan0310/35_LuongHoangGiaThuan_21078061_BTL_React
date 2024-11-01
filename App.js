import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen_01 from './screens/Screen_01';
import Screen_02 from './screens/Screen_02';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Screen_01' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Screen_01" component={Screen_01} />
      <Stack.Screen name="Screen_02" component={Screen_02} />
      
    </Stack.Navigator>
  </NavigationContainer>

  );
}


