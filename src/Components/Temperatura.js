import { View, Text } from 'react-native';

export default function Vuelo(temperatura) {
    temperatura.temperatura.forEach(element => {
        console.log("hola")
    });
    return (
        <View>
            {temperatura.temperatura.map((obj) => {

                console.log(`Current temperature in ${obj.location.name} is ${obj.current.temperature}℃`)
                console.log(obj)
                return (
                    <Text id={obj.id}>{obj}</Text>
                )
            })}
        </View>
    )
}