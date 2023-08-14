import Bot from '../Screens/Bot'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Screens/Login"
import Itinerario from '../Screens/Itinerario'
import TabNavigator from './TabNavigator'

const Stack = createNativeStackNavigator()
export default function StackNavigator() {
   
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="mose" component={TabNavigator} />
      </Stack.Navigator>
    )
}