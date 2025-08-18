import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";

const SuccessScreen = ({ navigation }) => {
    return <>
        <View style={styles.container}>
            <View style={styles.content}>
                <Ionicons name="checkmark-circle-sharp" size={120} color="#F97009" />
                <Text style={styles.headerText}>Success!</Text>
                <Text style={styles.description}>Your job application has been added successfully. You can now track its details and updates anytime.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton 
                    title="Homepage" 
                    onPress={() => navigation.replace("MainTabs", { screen: "Home" })}
                    style={{
                        backgroundColor: "#052731", 
                        marginTop: 30,
                        height: 60,
                        shadowColor: '#000',
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }} 
                />
            </View>
        </View>
    </>
}

export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054B63",
        justifyContent: "center",  // centers vertically
    },
    content: {
        alignItems: "center",
        marginInline: 30,
    },
    headerText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: 23,
        marginTop: 10,
        marginBottom: 8,
    },
    description: {
        textAlign: "center",
        fontSize: 15,
        color: "white"
    },
    buttonContainer: {
        marginTop: 10,
        marginInline: 25,
    }
});