import {Animated, View,StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Fredoka_300Light,
} from "@expo-google-fonts/fredoka";
TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

export default function Button(props) {
    let [fontsLoaded] = useFonts({
        Fredoka_300Light,
    });
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const scale = animation.interpolate({inputRange, outputRange});

    const onPressIn = () => {
        Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        }).start();
    };
    return (
        <View style={styles.container}>
            {!fontsLoaded ? (
                null
            
        ) : (
            <View style={styles.botonContainer}>
                <Animated.View style={[{transform: [{scale}]}]}>
                    <TouchableOpacity onPress={props.onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={styles.boton}>
                        <Text style={styles.textoBoton} adjustsFontSizeToFit={true}>{props.title}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            
        )} 
        </View>
        
    );
}

const styles = StyleSheet.create({
    boton: {
        padding: 10,
        backgroundColor: "#1573FF",
        borderRadius: 50,
        padding: 10,
        outlineColor: "#1573FF",
        outlineStyle: "solid",
        outlineWidth: 2,
        outlineOffset: 3,
        width: "100%",
        justifyContent: "center",
        height: 60
    },
    textoBoton: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        textAlign: 'center',
        fontFamily: "Fredoka_300Light",
    },
    container: {
        width: "70%",
        alignItems: 'center',
        marginTop: 60,
    },
    botonContainer: {
        width: "55%",
    }
})

