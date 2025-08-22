import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import CustomButton from "../../../components/CustomButton";
import { useDispatch } from "react-redux";
import { OtpInput } from "react-native-otp-entry";
import { showToast } from "../../../components/CustomToaster";
import { httpClient } from "../../../services/httpClient";
import { useSelector } from "react-redux";
import CustomLoader from "../../../components/CustomLoader";
import { logout } from "../../../features/authentication/authSlice";

const EnterNewPasswordScreen = ({ navigation, route }) => {
    const [otp, setOtp] = useState('');
    const { data:profileData } = useSelector((state) => state.profile);
    const [isLoaderLoading, setIsLoaderLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        sendVerificationToken();
    }, [])

    const handleVerify = async () => {
        if (otp.length !== 6) {
            showToast('error', 'Invalid OTP', 'Please enter a 6-digit verification code');
            return;
        }   

        const { newPassword } = route.params;

        try {
            const response = await httpClient.post('verify-code/', { email: profileData.email, code: otp }, { skipAuth: true });
            
            if (!response.ok) {
                showToast('error', 'Error!', 'Verification code is invalid! Please try again.');
                return;
            } 

            showToast('success', 'Success!', 'Verification code is valid. Nice!');
            changePassword(newPassword);
        } catch (error) {
            showToast('error', 'Error!', 'Please contact your administrator');
        }
    }

    const sendVerificationToken = async () => {
        setIsLoaderLoading(true);
        try {
            const response = await httpClient.post('send-verification-code-no-check/', { email: profileData.email }, { skipAuth: true });
            
            if (!response.ok) {
                showToast('error', 'Error', 'Failed to send verificaiton code! Please try again.');
                return navigation.goBack();
            }

            showToast('info', 'Verification Code Sent', 'Please check your email for verification code.');
        } catch (error) {
            console.log(error);
            showToast('error', 'Error', 'Please contact administrator');
            navigation.goBack();
        } finally {
            setIsLoaderLoading(false);
        }
    }

    const changePassword = async (newPassword) => {
        setIsLoaderLoading(true);
        try {
            const response = await httpClient.post('reset-password/', 
                { email: profileData.email, new_password: newPassword, confirm_password: newPassword }, 
                { skipAuth: true }
            );

            if (!response.ok){
                showToast('error', 'Error', 'Fail to change password, please try again.');
                return navigation.goBack();
            }

            dispatch(logout());
            showToast('success','Success', 'Successfully changed password, please login again.')
        } catch {
            showToast('error', 'Error', 'Contact Administrator');
            navigation.goBack();
        } finally {
            setIsLoaderLoading(false);
        }
    }
    
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Image source={require("../../../../assets/otp-1.png")} style={styles.image}/>
                    <Text style={styles.title}>Enter the code</Text>
                    <Text style={styles.description}>A 6-digit code has been sent to email, in order to change your password, please the code from your email.</Text>
                    <OtpInput
                        numberOfDigits={6}
                        focusColor="#4A90E2"
                        focusStickBlinkingDuration={500}
                        onTextChange={(text) => setOtp(text)}
                        onFilled={(text) => setOtp(text)}
                        textInputProps={{
                            accessibilityLabel: "One-Time Password",
                        }}
                        theme={{
                            containerStyle: styles.otpInputContainer,
                            pinCodeContainerStyle: styles.pinCodeContainer,
                            pinCodeTextStyle: styles.pinCodeText,
                            focusStickStyle: styles.focusStick,
                            focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
                        }}
                    />
                    <CustomButton 
                        title="Verify" 
                        onPress={handleVerify}
                        style={{
                            backgroundColor: "#052731", 
                            height: 45,
                            width: "100%",
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

            {isLoaderLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={styles.loaderStyle}
                />
            )}
        </>
    )
}

export default EnterNewPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054B63"
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 20,
    },
    image: {
        width: 180, 
        height: 180,
        alignSelf: "center",
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    description: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
        lineHeight: 22,
    },
    pinCodeContainer: {
        backgroundColor: 'white',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        width: 50,
        height: 90,
        marginHorizontal: 3,
    },
    pinCodeText: {
        fontSize: 30,
    },
    otpInputContainer: {
        marginVertical: 10,
        alignSelf: "center",
    },
    focusStick: {
        backgroundColor: '#4A90E2',
    },
    focusedPinCodeContainer: {
        borderColor: '#4A90E2',
        borderWidth: 2,
    },
});