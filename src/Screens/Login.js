import React, { useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Input from "../Components/Input.js"
import { Dimensions } from 'react-native';
import axios from 'axios';
import Button from "../Components/Button.js"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { UserContext } from '../Context/UserContext';

export default function Login(props) {
    const [textNumber, onChangeTextNumber] = React.useState('');
    const [validation, setValidation] = React.useState();
    const [textName, onChangeTextName] = React.useState('');
    const [NumPasaporte, setNumPasaporte] = React.useState("")
    const [isLoading, setLoading] = React.useState(true)

    const NumPasaporteContext = useContext(UserContext)
    console.log(NumPasaporteContext)
    /*useEffect(() => {
      if (NumPasaporteContext !== "") {
        NumPasaporteContext = ""
      }
    })*/
    const onPress = () => {
      setLoading(true)
      setValidation(false);
      axios.get("http://localhost:3000/users")
      .then(function (response) {
        const usuariosArr = response.data
        validar(usuariosArr)
      })
      .finally(() => setLoading(false))
    }
    const validar = usuariosArr => {
        usuariosArr.forEach(element => {
          if (element.NumPasaporte === textName && element.Contraseña === textNumber ) {
            setValidation(true)
            setNumPasaporte(element.NumPasaporte)
          }
      });  
    }
    React.useEffect( () => {
      if (validation) {
        setLoading(false)
        onChangeTextName("")
        onChangeTextNumber("")
        props.navigation.navigate('mose', {NumPasaporte: NumPasaporte})
      }
      else {
      }
    }, [isLoading])
    return (
      <View style={styles.container}>
        <Input nombreLabel="N° Pasaporte" text={textName} setText={onChangeTextName}></Input>
        <Input nombreLabel="Contraseña" text={textNumber} setText={onChangeTextNumber}></Input>
        { isLoading ? null : !validation ? <View style={styles.containerError}><Text style={styles.texto}><MaterialCommunityIcons name="alert" size={24} color="red" />Error, el nombre o el numero de pasaporte no coinciden.</Text></View> : null}
        <Button
          style={styles.boton}
          title='Iniciar Sesion'
          onPress={onPress}
        />

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      width: windowWidth,
      height: windowHeight,
      justifyContent: 'center',
    },
    texto: {
      
      color: '#F72323',
      fontSize: 20,
      fontFamily: "Fredoka_300Light",
      
    },
    containerError: {
      marginTop: 60,
      
      width: "100%",
      marginBottom: -30,
      textAlign: 'center'
    }
  });