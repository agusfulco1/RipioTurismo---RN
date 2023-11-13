import {View} from 'react-native'
import { UserContext } from '../Context/UserContext'
import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import Pais from '../Components/Pais'
export default function Catalogo({navigation}) {
    const [paises, setPaises] = useState([])
    const NumPasaporteContext = useContext(UserContext)
    useEffect(() => {
        axios.get('http://localhost:3000/paises')
        .then(response => {
          console.log(response.data)
          setPaises(response.data)
      })
    }, [])
    
    return (
        <View>
            {paises.map((obj) => {
                return (
                    <Pais pais={obj} navigation={navigation}></Pais>
                )
                
            })}

        </View>
    )
}