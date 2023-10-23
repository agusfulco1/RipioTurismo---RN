import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';

export default function Vuelo(vuelo) {
    console.log(vuelo)
    return (
        <View>
            <Text>{vuelo.vuelo.codigoVuelo}</Text>
        </View>
    )
}