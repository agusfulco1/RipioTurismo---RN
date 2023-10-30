import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Itinerario from "../Screens/Itinerario"
import Bot from "../Screens/Bot";
import { UserContext } from '../Context/UserContext'
import Login from '../Screens/Login'
const Tab = createBottomTabNavigator()

const homeName = "Home";
const chatName = "Chat";
const logOut = "Log Out"
export default function TabNavigator({ route }) {
    const { NumPasaporte } = route.params
    return (
        <UserContext.Provider value={NumPasaporte}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === chatName) {
                            iconName = focused ? 'chatbox' : 'chatbox-outline';

                        } else if (rn === logOut) {
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false
                })}
                tabBarOptions={{
                    activeTintColor: 'orange',
                    inactiveTintColor: 'orange',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70 }
                }}>
                <Tab.Screen name={homeName} component={Itinerario} />
                <Tab.Screen name={chatName} component={Bot} />
                <Tab.Screen name={logOut} component={Login}></Tab.Screen>
            </Tab.Navigator>
        </UserContext.Provider>

    );
}