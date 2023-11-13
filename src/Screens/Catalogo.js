import {View, StyleSheet } from 'react-native'
import { UserContext } from '../Context/UserContext'
import { useEffect, useContext, useState, } from 'react'
import axios from 'axios'
import Pais from '../Components/Pais'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Catalogo({navigation}) {
    const [paises, setPaises] = useState([])
    const NumPasaporteContext = useContext(UserContext)
    useEffect(() => {
        axios.get('http://localhost:3000/paises')
        .then(response => {
          console.log(response.data)
          setPaises(response.data)
      })
    }, [])
    
    return (
        <View style={styles.container}>
            {paises.map((obj) => {
                return (
                    <Pais pais={obj} navigation={navigation}></Pais>
                )
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
    },
})