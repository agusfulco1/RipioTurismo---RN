import { useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LogOut({navigation}) {
    useEffect(  () => {
        const desloguarse = async () => {
            localStorage.setItem('NumPasaporte', "")
            navigation.navigate('LoginScreen')
        }
        desloguarse()
    }, [])
    
}