import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { Dimensions } from 'react-native';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Detalle({route}) {
    const {Actividad} = route.params

    const [isLoading, setLoading] = useState(true)
    const [Detalle, setDetalle] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/Details/' + Actividad.idActividad)
        .then(function (response) {
            const detalleArr = response.data
            setDetalle(detalleArr)
        })
        .finally(() => setLoading(false))
    }, [])
    

    return (
        <View style={styles.container}>
            <View style={styles.containerActividad}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.titulo}>Dia {Actividad.Duracion}</Text>
                </View>
                
                {Detalle.map((obj) => {
                    return (
                        <View key={obj}>
                            <Text style={styles.textoActividad}><ul><li>{obj.Hora.substring(11, 16)}:  {obj.Titulo}</li></ul></Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center'
      },
    containerActividad: {
        width: "50%",
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
        padding: 10,
        borderWidth: 2,
        borderColor: "#3399FF"
    },
    containerTitulo: {
        textAlign: 'center'
    },
    titulo: {
        fontSize: 30
    }
})