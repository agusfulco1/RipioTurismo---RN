import { StyleSheet, View } from 'react-native';

export default function Separator() {
    return (
        <View style={styles.separator}></View>
    );
}

const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: "gray",
      marginVertical: 5,
    },
  });