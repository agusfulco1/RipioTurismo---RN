import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import axios from 'axios';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
} from "@expo-google-fonts/fredoka";
import { UserContext } from '../Context/UserContext';
import { Dimensions } from 'react-native';
import Vuelo from '../Components/Vuelo'
import Hotel from '../Components/Hotel'
import Temperatura from '../Components/Temperatura'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TextInputExample = ({ route }) => {
  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
  })

  const NumPasaporte = useContext(UserContext)

  const [texto, setTexto] = React.useState('');
  const [apiResponse, setResponse] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [ciudad, setCiudad] = React.useState()
  const [params, setParams] = React.useState()
  const [topic, setTopic] = React.useState()

  const substr = 'flight';
  const substr2 = 'hotel';
  const substr3 = 'temperature';

  useEffect(() => {
    axios.get('http://localhost:3000/ciudad/' + NumPasaporte.pasaporte)
      .then(response => {
        setCiudad(response.data)
      })
  }, [])

  React.useEffect(() => {
    setLoading(false)
    setTopic("")
    let word = texto.toLowerCase();
    if (word.includes(substr.toLowerCase())) {
      axios.get("http://localhost:3000/vuelos/" + NumPasaporte.pasaporte)
        .then(function (response) {
          const vuelos = response.data
          setResponse(vuelos.map((vuelo) => {
            const respuesta = {
              codigoVuelo: vuelo.codigoVuelo,
              aerolinea: vuelo.aerolinea,
              fecha: vuelo.Fecha
            }
            return respuesta
          }))
          setTopic("vuelo")
        })
        .finally(() => setLoading(true))
    }
    if (word.includes(substr2.toLowerCase())) {
      axios.get("http://localhost:3000/hotels/" + NumPasaporte.pasaporte)
        .then(function (response) {
          const hoteles = response.data
          setResponse(hoteles.map((hotel) => {
            return hotel
          }))
          setTopic("hotel")
        })
        .finally(() => setLoading(true))
    }
    if (word.includes(substr3.toLowerCase())) {
      setResponse([]);
      ciudad.forEach(element => {
        axios.get('http://localhost:3000/temperature/' + element.Nombre)
          .then(response => {
            setResponse(r => [...r, response.data]);

          }).catch(error => {
            console.log(error);
          }).finally(() => setLoading(true))
      });
      setTopic("temperatura")
    }
  }, [texto])

  useEffect(() => {
    console.log(apiResponse)
  }, [apiResponse])

  return (
      <View style={styles.container}>
        {!fontsLoaded ? null : (
          <View style={[styles.box, styles.shadowProp]}>
            <Text style={styles.text2}>Ask whatever you want</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTexto}
              value={texto}
            />
            {!loading ? (
              <Text style={styles.text}>Loading...</Text>
            ) : (
              <View>
                {topic === "vuelo" ? <Vuelo vuelo={apiResponse}></Vuelo> : topic === "hotel" ? <Hotel hotel={apiResponse}></Hotel> : topic === "temperatura" ? <Temperatura temperatura={apiResponse}></Temperatura> : <Error /> }
              </View>
            )}
          </View>
        )}
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: windowWidth,
    height: windowHeight,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    opacity: 0.5,
    marginTop: 50,
    borderRadius: 13,
    alignItems: 'center',
  },
  text: {
    height: 40,
    padding: 10,
    color: 'black',
    fontFamily: "Fredoka_400Regular",
  },
  text2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: "Fredoka_500Medium"
  },
  box: {
    padding: 10,
    backgroundColor: 'white',
    height: 300,
    width: 400,
    borderRadius: 8,
    marginTop: 20,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
});

export default TextInputExample;