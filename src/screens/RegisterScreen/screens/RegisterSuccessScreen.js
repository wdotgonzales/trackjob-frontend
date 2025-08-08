import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../../components/CustomButton";

const RegisterSuccessScreen = ({navigation, route}) => {
    const handleButton = () => {
        navigation.navigate('Login');
    }
    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <Image 
                        source={require("../../../../assets/register-success-1.png")}
                        style={styles.logoImage}
                    />
                    <Text style={styles.titleText}>Register completed successfully!</Text>
                    <Text style={styles.descriptionText}>Start tracking your hiring journey.</Text>
                    <CustomButton
                        title="Start Here" 
                        style={styles.button}
                        onPress={handleButton}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#054B63",
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20,
        margin: 10,
    },
    logoImage: {
        height: 250,
        width: 250,
        marginBottom: 20,
        alignSelf: "center"
    },
    titleText: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
    },
    descriptionText: {
        color: "white",
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#052731", 
        height: 45,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default RegisterSuccessScreen;