import axios from "axios";
import { View, Text, TouchableOpacity, Button, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Input from '../Components/Input'
export default function Viajes({ route }) {
    const [excursiones, setExcursiones] = useState([])
    const [tours, setTours] = useState([])
    const [reseñas, setReseñas] = useState([])
    const [textoReseña, setTexto] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Pais } = route.params
    useEffect(() => {
        axios.get('http://localhost:3000/tours/' + Pais.idPais)
            .then(function (response) {
                setTours(response.data)
            })
        axios.get('http://localhost:3000/excursiones/' + Pais.idPais)
            .then(function (response) {
                setExcursiones(response.data)
                console.log(response.data)
            })
        axios.get('http://localhost:3000/reseñas/')
    }, [])

    const handleModal = () => {
        setIsModalVisible(() => !isModalVisible)
    } 

    return (
        <View style={styles.container}>
            {tours.map((obj) => {
                return (
                    <View>
                        <TouchableOpacity onPress={handleModal}>
                            <Text>{obj.Titulo}</Text>
                        </TouchableOpacity>

                    </View>
                )
            })}
            {excursiones.map((obj) => {
                return (
                    <View>
                        <TouchableOpacity onPress={handleModal}>
                            <Text>{obj.NombreExcursiones}</Text>
                        </TouchableOpacity>

                    </View>
                )

            })}
            <Modal isVisible={isModalVisible}>
                <View style={styles.modal}>
                    <Text style={styles.textoModal}>Reseñas:</Text>
                    <TextInput 
                        onChangeText={setTexto}
                        value={textoReseña}
                        style={styles.inputReseña}
                    />
                    {/*<Input nombreLabel="Tu reseña" text={textoReseña} setText={setTexto}></Input>*/}
                    {reseñas.map((obj) => {

                    })}
                    <Button title="Cerrar" onPress={handleModal} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10
    },
    textoModal: {
        fontSize: 14
    },
    inputReseña: {
        backgroundColor: '#d9d9d9'
    }
})