import { View, Text } from 'react-native';

export default function Vuelo(hotel) {
    console.log(hotel)
    return (
        <View>
            {hotel.hotel.map((obj) => {
                return (
                    <View id={obj.id}>
                        <Text>Nombre: {obj.Nombre}</Text>
                        <Text>Ubicacion: {obj.Ubicacion}</Text>
                        <Text>Rating: {obj.Rating}</Text>
                        <Text>Descripcion: {obj.Descripcion}</Text>
                    </View>
                    
                )
            })}
        </View>
    )
}