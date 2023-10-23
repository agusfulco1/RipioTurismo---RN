import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import axios from 'axios';
import {
  useFonts,
  Montserrat_300Light
} from "@expo-google-fonts/montserrat"
import { UserContext } from '../Context/UserContext';
import { Dimensions } from 'react-native';
import react from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TextInputExample = ({ route }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
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
    axios.get('http://localhost:3000/ciudad/' + NumPasaporte)
      .then(response => {
        setCiudad(response.data)
      })
  }, [])

  React.useEffect(() => {
    setLoading(false)
    let word = texto.toLowerCase();
    if (word.includes(substr.toLowerCase())) {
      axios.get("http://localhost:3000/vuelos/" + NumPasaporte)
        .then(function (response) {
          const vuelos = response.data
          setResponse(vuelos.map((vuelo) => {
            const respuesta = {
              codigoVuelo: vuelo.codigoVuelo,
              aerolinea: vuelo.aerolinea
            }
            return respuesta
          }))
          setTopic("vuelo")
        })
        .finally(() => setLoading(true))
    }
    if (word.includes(substr2.toLowerCase())) {
      axios.get("http://localhost:3000/hotels/" + NumPasaporte)
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
      let responses = [];
      params.query.forEach(element => {
        let params2 = {
          access_key: params.access_key,
          query: element.Nombre
        }
        console.log('http://api.weatherstack.com/current', { params2 })
        axios.get('http://api.weatherstack.com/current', {
          params: {
            access_key: params.access_key,
            query: element.Nombre
          }
        })
          .then(response => {
            console.log(response.data)
            responses.push({respuesta: `Current temperature in ${response.data.location.name} is ${response.data.current.temperature}℃`});
            setResponse(responses);
          }).catch(error => {
            console.log(error);
          }).finally(() => setLoading(true))
      });


    }
  }, [texto])

  useEffect(() => {
    console.log(apiResponse)
  }, [apiResponse])
  useEffect(() => {
    setParams({
      access_key: '54d5077ef53da456ee3ef72562c9ba19',
      query: ciudad
    })
  }, [ciudad])

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
                <Text>{JSON.stringify(apiResponse)}</Text>
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
  }, text: {
    height: 40,
    padding: 10,
    color: 'black',
  },
  text2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: "Montserrat_300Light"
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