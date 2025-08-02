import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.outerContainer}>
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <Image 
                        source={require('../../../assets/trackjob-logo.png')}
                        style={styles.logoImage}
                    />
                    <Image 
                        source={require('../../../assets/trackjob-logo-text.png')}
                        style={styles.logoImageText}
                    />
                    <Text style={styles.headerText}>Keep track of your hiring journey</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <Text style={styles.textLoginHere} >Login Here</Text>

                    <CustomInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        style={{
                            backgroundColor: "white",
                            height: 50,
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

                    <CustomInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={{
                            backgroundColor: "white",
                            height: 50,
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

                    <Text style={styles.textForgotYourPassword}>Forgot Your Password?</Text>

                    <CustomButton 
                        title="Sign In" 
                        onPress={() => console.log(email, password)}
                        style={{
                            backgroundColor: "#052731",
                            marginTop: 30,
                            height: 50,
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

                    <Text style={styles.textCreateNewAccount}>Create New Account</Text>

                    <View style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        marginVertical: 10,
                    }} />

                    <Text style={styles.textContinueWith}>Or continue with</Text>

                    <GoogleButton 
                        title="Sign in with Google" 
                        onPress={() => alert("google me btich")} 
                        style={{
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
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#054B63', // Dark blue background
    },

    headerContainer: {
        alignItems: "center"
    },

    logoImage: {
        height: 160,
        width: 175,
        marginTop: 50,
        marginRight: 15,
    },

    logoImageText: {
        width: 160,
        height: 26,
        marginTop: 15
    },

    headerText: {
        marginTop: 10,
        fontWeight: "300",
        color: "white",
        fontSize: 17,
    },

    bodyContainer: {
        marginTop: 25,
        marginInline: 20
    },

    textLoginHere: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 9,
    },

    textForgotYourPassword: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 8,
    },

    textCreateNewAccount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
    },

    textContinueWith: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        color: "#F97009",
        marginBlock: 15,
    }
    
})