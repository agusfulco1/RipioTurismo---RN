import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Pais({pais, navigation}) {
    console.log(pais)
    return (
        <View key={pais.idPais}>
            <TouchableOpacity style={styles.Pais} onPress={() => { navigation.navigate('Viajes', { Pais: pais }) }}>
                <Text>{pais.Nombre}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: windowWidth,
      height: windowHeight,
    },
    Pais: {
      width: "100%",
      height: "20%",
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