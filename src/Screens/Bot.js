import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import axios from 'axios';
import {
  useFonts, 
  Montserrat_300Light } from "@expo-google-fonts/montserrat"

const TextInputExample = ({route}) => {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
  })
  const {NumPasaporte} = route.params
  const [number, setNumber] = React.useState('');
  const [vuelos, setVuelos] = React.useState('');
  const [hoteles, setHoteles] = React.useState('');
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)
  const substr = 'flight';
  const substr2 = 'hotel';
  
  React.useEffect( () => {
    console.log(number.includes(substr));
    if(number.toLowerCase().includes(substr.toLowerCase())){
    axios.get("http://localhost:3000/vuelos/" + NumPasaporte)
    .then(function (response) {
      setVuelos(response.data)
    })
    .finally(() => setLoading(true))
    }
  }, [number])

  React.useEffect( () => {
    if(text.toLowerCase().includes(substr2.toLowerCase())){
    axios.get("http://localhost:3000/hotels/" + NumPasaporte)
    .then(function (response) {
      setHoteles(response.data)
    })
    .finally(() => setLoading2(true))
    }
  }, [text])


  return (
    <View style={[styles.container, ]}>
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
                  <Text>{obj.codigoVuelo}</Text>
                  <Text>{obj.aerolinea}</Text>
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
    </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0ebeb',
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
  },  text: {
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
    height: 400,
    borderRadius: 8,
      
  
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