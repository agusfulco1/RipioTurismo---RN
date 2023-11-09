import { View, Text } from 'react-native';

export default function Temperatura(temperatura) {
    console.log(temperatura)
    
    const t = temperatura.temperatura
    console.log(temperatura.temperatura.length)


    console.log(t)
    return (
        <View>

            {temperatura.temperatura.map(obj => {
                return (
                    <Text id={obj.id}>{`Current temperature in ${obj.location.name} is ${obj.current.temperature}℃`}</Text>
                )
            })}
        </View>
    )
}