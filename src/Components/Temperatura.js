import { View, Text } from 'react-native';

export default function Vuelo(temperatura) {
    console.log(temperatura)
    
    const t = temperatura.temperatura
    console.log(temperatura.temperatura.length)


    console.log(t)
    return (
        <View>


            {/* {temperatura.map(t => t.map(obj => {
                console.log(obj)
                console.log(obj.lenght)
                return (
                    <Text id={obj.id}>{`Current temperature in ${obj.location.name} is ${obj.current.temperature}℃`}</Text>
                )
            }))} */}
        </View>
    )
}