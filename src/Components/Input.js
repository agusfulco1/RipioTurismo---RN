import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'

const Input = (props) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.box}>
                <Text style={styles.texto}>{props.nombreLabel}:</Text>
            </View>
            <TextInput
                style={[styles.input]}
                onChangeText={props.setText}
                value={props.text}
            />
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: "100%",
        height: "6%",
        alignItems: 'center',
        marginTop: 30
    },
    input: {
        borderRadius: 7,
        backgroundColor: '#d9d9d9',
        width: "70%",
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.16, 
        height: "100%",
        marginTop: 5,
        fontSize: 25
        
    },
    texto: {
        color: "#00000080",
        fontSize: 30,
        fontWeight: 300,
    },
    box: {
        alignItems: 'left',
        width: "70%"
    }

  });
export default Input;