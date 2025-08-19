import { View, Text, StyleSheet, Image } from "react-native"

const AnalyticsScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/dashboard.png")} style={{ height: 200, width: 300, }}/>
            <Text style={styles.text}>Coming Soon...</Text>
        </View>
    )
}

export default AnalyticsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054B63",
        justifyContent: "center",  // vertical center
        alignItems: "center"       // horizontal center
    },

    text: {
        fontSize: 18,
        color: "white",
        marginTop: 18,
        fontWeight: "bold"
    }
})
