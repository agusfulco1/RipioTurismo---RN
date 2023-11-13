import { View, Text } from 'react-native';

export default function Vuelo(vuelo) {
    return (
        <View>
            <Text>Aqui tienes la informacion de tus vuelos:</Text>
            {vuelo.vuelo.map((obj) => {
                console.log(vuelo.vuelo)
                return (
                    <View key={obj.codigoVuelo}>
                        <Text>Codigo del vuelo: {obj.codigoVuelo}</Text>
                        <Text>Aerolinea: {obj.aerolinea}</Text>
                        <Text>Fecha: {obj.fecha}</Text>
                    </View>
                )
            })}
        </View>
    )
}