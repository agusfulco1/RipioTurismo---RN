import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import axios from 'axios';
import {
  useFonts,
  Montserrat_300Light
} from "@expo-google-fonts/montserrat"
import { UserContext } from '../Context/UserContext';
import { Dimensions } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TextInputExample = ({ route }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
  })


  const NumPasaporte = useContext(UserContext)

  const [number, setNumber] = React.useState('');
  const [vuelos, setVuelos] = React.useState('');
  const [hoteles, setHoteles] = React.useState('');
  const [text, setText] = React.useState('');
  const [text2, setText2] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)
  const [loading3, setLoading3] = React.useState(false)
  const [ciudad, setCiudad] = React.useState()
  const [params, setParams] = React.useState()
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
    let word = number.toLowerCase();
    if (word.includes(substr.toLowerCase())) {
      axios.get("http://localhost:3000/vuelos/" + NumPasaporte)
      .then(function (response) {
        setVuelos(response.data)
      })
      .finally(() => setLoading(true))
    }
    if (word.includes(substr2.toLowerCase())) {
      axios.get("http://localhost:3000/hotels/" + NumPasaporte)
      .then(function (response) {
        setHoteles(response.data)
      })
      .finally(() => setLoading2(true))
    }
    if (word.includes(substr3.toLowerCase())) {
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
            const apiResponse = response.data;
            console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
          }).catch(error => {
            console.log(error);
          }).finally(() => setLoading2(true))
      });
    }  
  }, [number])

  useEffect(() => {
    setParams({
      access_key: '54d5077ef53da456ee3ef72562c9ba19',
      query: ciudad
    })
  }, [ciudad])

  return (
    <ScrollView>
      
      <View style={styles.container}>
        {!fontsLoaded ? null : (
          <View style={[styles.box, styles.shadowProp]}>
            <Text style={styles.text2}>Ask for your flight</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNumber}
              value={number}
            />
            {!loading ? (
              <Text style={styles.text}>Loading...</Text>
            ) : (
              vuelos.map((obj) => {
                return (
                  <View key={obj.idVuelo}>
                    <Text>Vuelo llegada</Text>
                    <Text>Codigo Vuelo: {obj.codigoVuelo}</Text>
                    <Text>Aerolinea: {obj.aerolinea}</Text>
                  </View>
                )
              })
            )}
          </View>
        )}
        {!fontsLoaded ? null : (
          <View style={[styles.box, styles.shadowProp]}>
            <Text style={styles.text2}>Ask for your hotel</Text>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
            />
            {!loading2 ? (
              <Text style={styles.text}>Loading...</Text>
            ) : (
              hoteles.map((obj) => {
                return (
                  <View key={obj.idHotel}>
                    <Text>{obj.Nombre}</Text>
                    <Text>{obj.Ubicacion}</Text>
                    <Text>{obj.Rating}</Text>
                    <Text>{obj.Descripcion}</Text>
                  </View>
                )
              })
            )}
          </View>

        )}
        {!fontsLoaded ? null : (
          <View style={[styles.box, styles.shadowProp]}>
            <Text style={styles.text2}>Ask the temperature</Text>
            <TextInput
              style={styles.input}
              onChangeText={setText2}
              value={text2}
            />
          </View>
        )}
      </View>

    </ScrollView>


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