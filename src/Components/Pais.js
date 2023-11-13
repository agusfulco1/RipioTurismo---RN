import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Pais({ pais, navigation }) {
  console.log(pais)
  return (
    <View style={styles.container} key={pais.idPais}>
        <TouchableOpacity style={styles.Pais} onPress={() => { navigation.navigate('Viajes', { Pais: pais }) }}>
          <Text style={styles.texto}>{pais.Nombre}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '8%',
    marginBottom: 20
  },
  Pais: {
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    height: "100%",
    justifyContent: "center"
  },
  texto: {
    fontSize: 20,
    fontFamily: "Fredoka_500Medium",
  },
});