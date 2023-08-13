import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import axios from 'axios';
import {UserContext} from "./Login"

const Bot = () => {
  const value = React.useContext(UserContext);  
  const [number, setNumber] = React.useState('');
  const [vuelos, setVuelos] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const substr = 'flight';
  
  React.useEffect( () => {
    console.log(value)
    console.log(number.includes(substr));
    if(number.toLowerCase().includes(substr.toLowerCase())){
    axios.get("http://localhost:3000/vuelos/" + value)
    .then(function (response) {
      setVuelos(response.data)
    })
    .finally(() => setLoading(true))
    }
  }, [number])


  return (
    <UserContext.Consumer>
      <View style={[styles.container,]}>
        <View style={[styles.box, styles.shadowProp]}>
          <Text style={styles.text2}>Ask for your flight</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNumber}
            value={number} />

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


      </View>
    </UserContext.Consumer>
    
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
  },
  text: {
    height: 40,
    padding: 10,
    color: 'black',
  },
  text2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  box: {
    padding: 10,
    backgroundColor: 'white',
    height: 400,
    borderRadius: 13,
  
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

export default Bot;

