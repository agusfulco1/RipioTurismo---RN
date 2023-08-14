import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Separator from '../Components/Separator'
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Itinerario({ route, navigation }) {
  const [actividades, setActividades] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const { NumPasaporte } = route.params

  React.useEffect(() => {
    axios.get('http://localhost:3000/activities/' + NumPasaporte)
      .then(function (response) {
        setActividades(response.data)
        console.log(response.data)
      })
      .finally(() => setLoading(true))
  }, [])
  return (
    <View style={styles.container}>
      {!loading ? (
        <Text>Loading...</Text>
      ) : (
        actividades.map((obj) => {
          return (
            <View key={obj.idActividad}>
              <TouchableOpacity style={styles.Actividad} onPress={() => { navigation.navigate('detalle', { Actividad: obj }) }}>
                <View style={styles.containerActividad} >
                  <View style={styles.box}>
                    <Text>{obj.Nombre}</Text>
                    <Text>{obj.Descripcion}</Text>
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
    height: "20%",
  },
  texto: {
    fontSize: 45,
  },
  box: {
    width: "20%"
  },
  containerActividad: {
    flexDirection: 'row',
  }
});