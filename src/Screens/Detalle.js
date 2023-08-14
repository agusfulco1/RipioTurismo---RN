import React, { useEffect } from 'react';
import {View, Text} from 'react'
export default function Detalle({route}) {
    const {Actividad} = route.params
    console.log(Actividad) 
    return (
        <View>
            <Text>Hola</Text>
        </View>
    )
}