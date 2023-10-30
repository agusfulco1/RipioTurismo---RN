import { View, Text } from 'react-native';

export default function Vuelo(temperatura) {
    return (
        <View>
            {vuelo.vuelo.map((obj) => {
                return (
                    <Text id={obj.id}>{obj.codigoVuelo}</Text>
                )
            })}
        </View>
    )
}