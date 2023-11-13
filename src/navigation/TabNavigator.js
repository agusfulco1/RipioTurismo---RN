import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Itinerario from "../Screens/Itinerario"
import Bot from "../Screens/Bot";
import { UserContext } from '../Context/UserContext'
import Login from '../Screens/Login'
import { useEffect, useState, useContext } from "react";
import LogOut from "./LogOut";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Catalogo from "../Screens/Catalogo";
const Tab = createBottomTabNavigator()

const homeName = "Home";
const chatName = "Chat";
const logOut = "Log Out"
const catalogoName = "Catalogo"
export default function TabNavigator({ route }) {
    const NumPasaporteContext = useContext(UserContext)
    
    useEffect( () => {
        console.log(NumPasaporteContext)
        const { NumPasaporte } = route.params
        const crearContext = async () => {
            NumPasaporteContext.setPasaporte(NumPasaporte)
            await AsyncStorage.setItem("NumPasaporte", NumPasaporte)
        }
        crearContext()
    }, [])
    
    return (
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
                        } else if (rn === catalogoName) {
                            iconName = focused ? 'basket' : 'basket-outline'
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
                <Tab.Screen name={catalogoName} component={Catalogo}></Tab.Screen>
                <Tab.Screen name={logOut} component={LogOut}></Tab.Screen>
            </Tab.Navigator>
        

    );
}