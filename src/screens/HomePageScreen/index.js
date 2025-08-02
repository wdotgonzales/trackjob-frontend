import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const HomePageScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView>
                <View>
                    <Text>HomePageScreen Screen</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#054B63"
    }
})

export default HomePageScreen