import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { isValidEmail } from "../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpClient } from "../../services/httpClient";
import { useDispatch } from "react-redux";
import { login, setAuthLoading } from "../../features/authentication/authSlice";
import { showToast } from "../../components/CustomToaster";
import { useSelector } from "react-redux";
import CustomLoader from "../../components/CustomLoader";

const LoginScreen = () => {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Redux setup
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);

    // Validate user inputs before submission
    const validateInputs = () => {
        if (!email || !password) {
            showToast('error', 'Error!', 'Please enter your email and password!');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showToast('error', 'Error!', 'Please enter a valid email!');
            return false;
        }
        
        return true;
    };

    // Handle login submission
    const handleLogin = async () => {
        if (!validateInputs()) return;
        
        // Start loading state
        dispatch(setAuthLoading(true));

        try {
            // Make API call to login endpoint
            const response = await httpClient.post('login/', { email, password }, { skipAuth: true });
            const result = await response.json();

            if (response.ok) {
                // Save access token and show success message
                await AsyncStorage.setItem('accessToken', result.data.access);
                showToast('success', 'Success', result.message);
                
                // Delay before updating auth state for better UX
                setTimeout(() => {
                    dispatch(login());
                }, 2000);
            } else {
                // Show error message from server
                showToast('error', 'Error', result.message);
            }
        } catch (error) {
            // Handle network or other errors
            showToast('error', 'Error', 'Contact Administrator');
            console.error('Login failed:', error);
        } finally {
            // Stop loading state
            dispatch(setAuthLoading(false));
        }
    };

    return (
        <>
            <View style={styles.outerContainer}>
                <SafeAreaView>
                    {/* Header section with logo and tagline */}
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

                    {/* Login form section */}
                    <View style={styles.bodyContainer}>
                        <Text style={styles.textLoginHere} >Login Here</Text>

                        {/* Email input field */}
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

                        {/* Password input field */}
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

                        {/* Forgot password link */}
                        <Text style={styles.textForgotYourPassword}>Forgot Your Password?</Text>

                        {/* Sign in button */}
                        <CustomButton 
                            title="Sign In" 
                            onPress={handleLogin}
                            disabled={isLoading}
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
                                opacity: isLoading ? 0.7 : 1,
                            }} 
                        />

                        {/* Create account link */}
                        <Text style={styles.textCreateNewAccount}>Create New Account</Text>

                        {/* Divider line */}
                        <View style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            marginVertical: 10,
                        }} />

                        {/* Alternative login section */}
                        <Text style={styles.textContinueWith}>Or continue with</Text>

                        {/* Google sign in button */}
                        <GoogleButton 
                            title="Sign in with Google" 
                            onPress={() => alert("google me btich")} 
                            disabled={isLoading}
                            style={{
                                shadowColor: '#000',
                                shadowOffset: {
                                width: 0,
                                height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                opacity: isLoading ? 0.7 : 1,
                            }}
                        />
                    </View>
                </SafeAreaView>
            </View>
            
            {/* Loading overlay when login is in progress */}
            {isLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009" // Orange color from design
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent overlay
                    }}
                />
            )}
        </>
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