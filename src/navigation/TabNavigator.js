import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Itinerario from "../Screens/Itinerario"
import Bot from "../Screens/Bot";
const Tab = createBottomTabNavigator() 

const homeName = "Home";
const chatName = "Chat";
export default function TabNavigator({route}) {
    const {NumPasaporte} = route.params
    console.log(NumPasaporte)
    return (
        <Tab.Navigator
            screenOptions={({ route}) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';

                } else if (rn === chatName) {
                    iconName = focused ? 'chatbox' : 'chatbox-outline';

                } 
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false
            }) }
            tabBarOptions={{
                activeTintColor: 'orange',
                inactiveTintColor: 'orange',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70}
            }}>
            <Tab.Screen initialParams={{NumPasaporte}} name={homeName} component={Itinerario} />
            <Tab.Screen initialParams={{NumPasaporte}} name={chatName} component={Bot} />
        </Tab.Navigator>
    );
}