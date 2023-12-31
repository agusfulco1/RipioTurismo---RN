import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Screens/Login"
import TabNavigator from './TabNavigator'
import Detalle from '../Screens/Detalle'
import Viajes from '../Screens/Viajes'
const Stack = createNativeStackNavigator()
export default function StackNavigator() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="mose" component={TabNavigator} />
        <Stack.Screen name="detalle" component={Detalle} />
        <Stack.Screen name="Viajes" component={Viajes} />
      </Stack.Navigator>
    )
}