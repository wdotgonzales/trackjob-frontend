import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import { useState, useEffect } from "react";
import useOtpCountdown from "../../../hooks/useOtpCountdown";
import CustomButton from "../../../components/CustomButton";
import CustomLoader from "../../../components/CustomLoader";
import { httpClient } from "../../../services/httpClient";
import { showToast } from "../../../components/CustomToaster";

const OtpScreen = ({ navigation, route }) => {
    const { params } = route;
    const [otp, setOtp] = useState("");
    const { formattedTime, setTimeLeft } = useOtpCountdown(300);
    const [otpSentLoading, setOtpSentLoading] = useState(false);

    useEffect(() => {
        const { data } = route.params;
        handleSendOtpToEmail(data.email);
    }, []);

    const handleSendOtpToEmail = async (email) => {
        setOtpSentLoading(true);
        try {
            const response = await httpClient.post('send-verification-code/', { email }, { skipAuth: true });
            const result = await response.json();
            
            if (!response.ok) {
                showToast('error', 'Error!', 'Failed to send verification code, please try again');
            } else {
                showToast('success', 'Success!', 'Verification code sent successfully');
                setTimeLeft(300);
            }
            
            console.log(result);
        } catch (error) {
            showToast('error', 'Error', 'Failed to send verification code. Please try again later.');
            console.log(error);
        } finally {
            setOtpSentLoading(false);
        }
    };

    const handleResendOtp = async () => {
        const { data } = route.params;
        await handleSendOtpToEmail(data.email);
    };
    
    const handleVerify = async () => {
        if (otp.length !== 6) {
            showToast('error', 'Invalid OTP', 'Please enter a 6-digit verification code');
            return;
        }
        
        const { data } = route.params;

        try {
            const response = await httpClient.post('verify-code/', { email: data.email, code: otp }, { skipAuth: true });
            
            if (!response.ok) {
                showToast('error', 'Error!', 'Verification code is invalid! Please try again.');
                return;
            } 

            showToast('success', 'Success!', 'Verification code is valid. Nice!');
            navigation.navigate('RegisterProfilePicture', { data });
        } catch (error) {
            showToast('error', 'Error!', 'Please contact your administrator');
        }
    };

    const renderMainContent = () => (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={30} color="white" />  
            </Pressable>
            
            <View style={styles.contentContainer}>
                <Image 
                    source={require('../../../../assets/otp-1.png')}
                    style={styles.logoImage}
                />
                
                <Text style={styles.verifyYourEmailText}>Verify Your Email</Text>
                
                <Text style={styles.emailText}>
                    A 6 digit code has been sent to <Text style={styles.emailHighlight}>{params.data.email}.</Text>
                </Text>
                
                <View style={styles.otpContainer}>
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
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        - The OTP will expire in <Text style={styles.boldText}>{formattedTime}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        - Didn't receive the code?{' '}
                        <Text style={styles.linkText} onPress={handleResendOtp}>
                            Resend
                        </Text>
                    </Text>
                </View>
            </View>

            <CustomButton 
                title="Verify" 
                onPress={handleVerify}
                style={styles.verifyButton}
            />
        </SafeAreaView>
    );

    return (
        <>
            <View style={styles.outerContainer}>
                {!otpSentLoading && renderMainContent()}
            </View>
            
            {otpSentLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={styles.loaderStyle}
                />
            )}
        </>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#054B63',
    },
    safeAreaContainer: {
        flex: 1,
        margin: 15,
        marginTop: 25,
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logoImage: {
        height: 200,
        width: 200,
        marginTop: 25,
        alignSelf: 'center',
    },
    verifyYourEmailText: {
        fontSize: 21,
        color: "white",
        fontWeight: "bold",
        marginBlock: 15,
        textAlign: 'center',
    },
    emailText: {
        textAlign: "center", 
        marginHorizontal: 25, 
        color: "white", 
        fontSize: 16,
        marginBottom: 30,
    },
    emailHighlight: {
        fontWeight: "bold",
    },
    otpContainer: {
        width: '95%',
        alignItems: 'center',
    },
    infoContainer: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: 'flex-start',
        width: '100%',
    },
    infoText: {
        color: "white",
        fontSize: 15,
        marginBottom: 10,
    },
    boldText: {
        fontWeight: "bold",
    },
    linkText: {
        color: "#407BFF",
        textDecorationLine: "underline",
    },
    verifyButton: {
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
        // Container styling if needed
    },
    focusStick: {
        backgroundColor: '#4A90E2',
    },
    focusedPinCodeContainer: {
        borderColor: '#4A90E2',
        borderWidth: 2,
    },
    loaderStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});