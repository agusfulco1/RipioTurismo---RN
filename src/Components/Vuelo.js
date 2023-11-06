import { View, Text } from 'react-native';

export default function Vuelo(vuelo) {
    return (
        <View>
            {vuelo.vuelo.map((obj) => {
                console.log(vuelo.vuelo)
                return (
                    <Text id={obj.codigoVuelo}>{obj.codigoVuelo}</Text>
                )
            })}
        </View>
    )
}