import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

const StartScreen = ({ navigation }) => {
    return <View style={styles.container}>
        <Image 
            source={require('../../../assets/trackjob-logo.png')}
            style={styles.logo}
        />
        <Image 
            source={require('../../../assets/trackjob-logo-text.png')}
        />
        <Text
            style={styles.desription}
            >
                Keep track of your hiring journey
        </Text>
        
        <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Features')}>
            <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
    </View>
}

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#054B63',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 220,
        marginBottom: 20,
        marginRight: 20
    },

    desription: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
        fontWeight: "300",
        marginTop: 15
    },

    button: {
        backgroundColor: '#052731',
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 30,
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
})