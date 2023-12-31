import React, { useContext,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Separator from '../Components/Separator'
import { Dimensions } from 'react-native';
import { UserContext } from '../Context/UserContext';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  
} from "@expo-google-fonts/fredoka";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Itinerario({ navigation }) {
  const [actividades, setActividades] = React.useState()
  const [loading, setLoading] = React.useState(false)
  
  const NumPasaporte = useContext(UserContext)

  let [fontsLoaded] = useFonts({
    Fredoka_500Medium,
    Fredoka_400Regular
  });

  React.useEffect(() => {
    console.log(NumPasaporte)
    console.log(NumPasaporte.pasaporte)
    axios.get('http://localhost:3000/activities/' + NumPasaporte.pasaporte)
      .then(function (response) {
        setActividades(response.data)
        console.log(response.data)
      })
      .finally(() => setLoading(true))
  }, [NumPasaporte])
  return (
    <View style={styles.container}>
      {!loading ? (
        <Text>Loading...</Text>
      ) : !fontsLoaded ? (
        <Text>Loading...</Text>
      ) : (
        actividades.map((obj) => {
          return (
            <View key={obj.idActividad}>
              <TouchableOpacity style={styles.Actividad} onPress={() => { navigation.navigate('detalle', { Actividad: obj }) }}>
                <View style={styles.containerActividad} >
                  <View style={styles.box}>
                    <Text style={styles.descripcion}>{obj.Nombre}</Text>
                    <Text style={styles.descripcion}>{obj.Descripcion}</Text>
                  </View>
                  <Text style={styles.texto}> Dia {obj.Duracion}</Text>
                </View>
                <Separator></Separator>
              </TouchableOpacity>
            </View>
          );

        })
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  Actividad: {
    width: "100%",
    height: "100%",
    textAlign: 'center'
  },
  texto: {
    fontSize: 45,
    fontFamily: "Fredoka_500Medium",
  },
  box: {
    width: "40%",
  },
  containerActividad: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'start',
    justifyContent: 'space-between',
    width: '97%',
  },
  descripcion: {
    fontFamily: "Fredoka_400Regular",
    fontSize: 14,
  },
});