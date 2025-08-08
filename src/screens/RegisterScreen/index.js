import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import CustomLoader from "../../components/CustomLoader";
import { showToast } from "../../components/CustomToaster";
import { isValidEmail } from "../../utils/utils";
import { httpClient } from "../../services/httpClient";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        repeatPassword: '',
        profileUrl: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle } = useGoogleAuth();

    // Common shadow style for inputs and buttons
    const shadowStyle = {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateInputs = () => {
        const { email, fullName, password, repeatPassword } = formData;
        
        if (!email || !fullName || !password || !repeatPassword) {
            showToast('error', 'Error!', 'Please enter the following required fields');
            return false;
        }

        if (!isValidEmail(email)) {
            showToast('error', 'Error!', 'Please enter a valid email!');
            return false;
        }

        if (password.length < 8) {
            showToast('error', 'Error!', 'Password should be 8 or more characters!');
            return false;
        }

        if (password !== repeatPassword) {
            showToast('error', 'Error!', 'Passwords do not match!');
            return false;
        }
        
        return true;
    };

    const checkEmailExistence = async (email) => {
        const response = await httpClient.post('check-email-existence/', { email }, { skipAuth: true });
        
        if (!response.ok) {
            throw new Error('Email already exists');
        }
        
        return response.json();
    };

    const registerUser = async (userData) => {
        const response = await httpClient.post('register/', userData, { skipAuth: true });
        
        if (!response.ok) {
            throw new Error('Failed to register! Please try again.');
        }
        
        return response.json();
    };

    const handleRegister = async () => {
        if (!validateInputs()) return;

        setIsLoading(true);
        try {
            await checkEmailExistence(formData.email);
            navigation.navigate('Otp', { data: formData });
        } catch (error) {
            const message = error.message === 'Email already exists' 
                ? 'Email already exists' 
                : 'Contact Administrator';
            showToast('error', 'Error!', message);
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = async (userDetails) => {
        const { email, name: full_name, photo: profile_url } = userDetails;
        const random_password = Math.floor(Math.random() * 90000000) + 10000000;

        try {
            await registerUser({
                email,
                full_name,
                password: random_password,
                profile_url,
                repeat_password: random_password,
            });
            
            navigation.navigate('RegisterSuccess');
        } catch (error) {
            showToast('error', 'Error!', 'Please contact your administrator');
            console.error('Google registration failed:', error);
        }
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        try {
            const user = await signInWithGoogle();
            
            if (!user) {
                setIsLoading(false);
                return; // User cancelled
            }

            await checkEmailExistence(user.email);
            await handleGoogleRegister(user);
            
        } catch (error) {
            console.error('Google auth error:', error);
            
            if (error.code !== 'CANCELLED' && error.code !== 'SIGN_IN_CANCELLED') {
                const message = error.message === 'Email already exists'
                    ? 'Email already exists'
                    : 'Google sign-in failed. Please try again.';
                showToast('error', 'Error!', message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: "white",
        height: 42,
        ...shadowStyle
    };

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={styles.header}>
                        <Image 
                            source={require('../../../assets/trackjob-logo.png')}
                            style={styles.logo}
                        />
                        <Image 
                            source={require('../../../assets/trackjob-logo-text.png')}
                            style={styles.logoText}
                        />
                        <Text style={styles.tagline}>Keep track of your hiring journey</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.formTitle}>Register Here</Text>

                        <CustomInput
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChangeText={(value) => updateFormData('fullName', value)}
                            style={inputStyle}
                        />

                        <CustomInput
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(value) => updateFormData('email', value)}
                            keyboardType="email-address"
                            style={inputStyle}
                        />

                        <CustomInput
                            placeholder="Password"
                            value={formData.password}
                            onChangeText={(value) => updateFormData('password', value)}
                            secureTextEntry
                            style={inputStyle}
                        />

                        <CustomInput
                            placeholder="Repeat Password"
                            value={formData.repeatPassword}
                            onChangeText={(value) => updateFormData('repeatPassword', value)}
                            secureTextEntry
                            style={inputStyle}
                        />

                        <CustomButton 
                            title="Sign Up" 
                            onPress={handleRegister}
                            disabled={isLoading}
                            style={[styles.signUpButton, shadowStyle, { opacity: isLoading ? 0.7 : 1 }]}
                        />

                        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                            Already Have an Account?
                        </Text>

                        <View style={styles.divider} />

                        <GoogleButton 
                            title="Sign up with Google" 
                            onPress={handleGoogleAuth} 
                            disabled={isLoading}
                            size="medium"
                            style={shadowStyle}
                        />
                    </View>
                </SafeAreaView>
            </View>
            
            {isLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={styles.loader}
                />
            )}
        </>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#054B63',
    },
    header: {
        alignItems: "center"
    },
    logo: {
        height: 130,
        width: 155,
        marginTop: 50,
        marginRight: 15,
    },
    logoText: {
        width: 150,
        height: 24,
        marginTop: 15
    },
    tagline: {
        marginTop: 10,
        fontWeight: "300",
        color: "white",
        fontSize: 14,
    },
    form: {
        marginTop: 25,
        marginHorizontal: 20
    },
    formTitle: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 9,
    },
    signUpButton: {
        backgroundColor: "#052731", 
        marginTop: 30,
        height: 45,
    },
    loginLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginVertical: 20,
    },
    divider: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 5,
        marginBottom: 15,
    },
    loader: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});