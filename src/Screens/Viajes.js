import axios from "axios";
import { View, Text, TouchableOpacity, Button, StyleSheet, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import Modal from "react-native-modal";
import Input from '../Components/Input'
import { Dimensions } from 'react-native';
import Separator from "../Components/Separator";
import { Fredoka_400Regular, Fredoka_500Medium } from "@expo-google-fonts/fredoka";
import { UserContext } from '../Context/UserContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Viajes({ route }) {
    const [excursiones, setExcursiones] = useState([])
    const [tours, setTours] = useState([])
    const [reseñas, setReseñas] = useState([])
    const [textoReseña, setTexto] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [idR, setIdR] = useState(null)
    const [idE, setIdE] = useState(null)
    const [usuario, setUsuario] = useState()

    const NumPasaporte = useContext(UserContext)

    const { Pais } = route.params
    useEffect(() => {
        axios.get('http://localhost:3000/tours/' + Pais.idPais)
            .then(function (response) {
                setTours(response.data)
            })
        axios.get('http://localhost:3000/excursiones/' + Pais.idPais)
            .then(function (response) {
                setExcursiones(response.data)
            })
        
    }, [])
    
    const handleModal = () => {
        setIsModalVisible(() => !isModalVisible)
    } 
    

    const enviarReseña = () => {
        axios.get('http://localhost:3000/users/' + NumPasaporte.pasaporte)
        .then((response) => {
            axios.post('http://localhost:3000/resenas', {
            descripcion: textoReseña,
            idUsuario: response.data[0].idUsuario,
            idTour: idR,
            idExcursion: idE
            })
        })
        if(idR !== null) {
            cargarReseñasT(idR)
        } else {
            cargarReseñasE(idE)
        }
    }

    const cargarReseñasE = (id) => {
        setIdE(id)
        axios.get('http://localhost:3000/resenasE/' + id)
        .then((response) => {
            setReseñas(response.data)
        })
        .finally(() => handleModal())
    }
    const cargarReseñasT = (id) => {
        setIdR(id)
        axios.get('http://localhost:3000/resenasT/' + id)
        .then((response) => {
            setReseñas(response.data)
        })
        .finally(() => handleModal())
        
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tours:</Text>
            {tours.length != 0 ? tours.map((obj) => {
                return (
                    <View>
                        <TouchableOpacity style={styles.containerTour} onPress={() => cargarReseñasT(obj.idTour)}>
                            <Text style={styles.textoVacio}>{obj.Titulo}</Text>
                        </TouchableOpacity>

                    </View>
                )
            }): <Text style={styles.textoVacio}>No hay Tours</Text>}
            <Separator />
            <Text style={styles.titulo}>Excursiones:</Text>
            {excursiones.length !== 0 ? excursiones.map((obj) => {
                return (
                    <View>
                        <TouchableOpacity style={styles.containerTour} onPress={() => cargarReseñasE(obj.IdExcursiones)}>
                            <Text style={styles.textoVacio}>{obj.NombreExcursiones}</Text>
                        </TouchableOpacity>

                    </View>
                )

            }): <Text style={styles.textoVacio}>No hay excursiones</Text>}
            <Modal isVisible={isModalVisible}>
                <View style={styles.modal}>
                    <Text style={styles.textoModal}>Reseñas:</Text>
                    <TextInput 
                        onChangeText={setTexto}
                        value={textoReseña}
                        style={styles.inputReseña}
                    />
                    <View style={styles.containerBotones}>
                        <TouchableOpacity style={styles.botonEnviar} onPress={enviarReseña}>
                            <Text style={styles.textoBoton}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botonCerrar}onPress={handleModal}>
                            <Text style={styles.textoBoton}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                    {reseñas.map((obj) => {
                        return (
                        <View>
                            <Text>{obj.descripcion}</Text>
                        </View>
                        )
                        
                    })}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    textoModal: {
        fontSize: 20,
        fontFamily: "Fredoka_500Medium",
        fontWeight: '500'
    },
    inputReseña: {
        backgroundColor: '#d9d9d9',
        width: "100%",
        height: 75
    },
    textoVacio: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: "Fredoka_400Regular"
    },
    titulo: {
        fontSize: 25,
        fontFamily: "Fredoka_500Medium",
    },
    botonCerrar: {
        backgroundColor: '#FF8000',
        padding: 10,
        borderRadius: 50,
        height: 30,
        width: "90%",
        margin: 10,
        justifyContent: "center",
    },
    botonEnviar: {
        backgroundColor: '#0019B9',
        padding: 10,
        borderRadius: 50,
        height: 30,
        width: "90%",
        justifyContent: "center",
        margin: 10
    },
    textoBoton: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        textAlign: 'center',
        fontFamily: "Fredoka_300Light",
    },
    containerBotones: {
        alignItems: 'center'
    },
    containerTour: {
        backgroundColor: 'red'
    }
})