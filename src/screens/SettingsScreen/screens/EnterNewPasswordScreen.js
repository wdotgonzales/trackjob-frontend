import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CustomInput from "../../../components/CustomInput"
import CustomButton from "../../../components/CustomButton";
import { showToast } from "../../../components/CustomToaster";

const EnterNewPasswordScreen = ({ navigation }) => {

    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");

    const validateInputs = () => {
        if (!newPassword || !repeatNewPassword) {
            showToast('error', 'Error!', 'Please fill up the following fields!');
            return false;
        }

        if (newPassword.length < 8) {
            showToast('error', 'Error!', 'Password should be 8 characters up!');
            return false;
        }

        if (newPassword !== repeatNewPassword) {
            showToast('error', 'Error!', 'Passwords does not match! ');
            return false;
        }

        return true;
    }

    const handleProceed = () => {
        if (!validateInputs()) return;

        navigation.navigate("ChangePasswordOtp", { newPassword: newPassword });
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.contentContainer}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Enter New Password</Text>
                    <Text style={styles.description}>Enter your new password for your account.</Text>
                        <CustomInput
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                            keyboardType="password"
                            style={{
                                backgroundColor: "white",
                                height: 42,
                                shadowColor: '#000',
                                shadowOffset: {
                                width: 0,
                                height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                marginTop: 20, 
                            }}
                        />
                        <CustomInput
                            placeholder="Repeat Password"
                            value={repeatNewPassword}
                            onChangeText={setRepeatNewPassword}
                            secureTextEntry={true}
                            keyboardType="password"
                            style={{
                                backgroundColor: "white",
                                height: 42,
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

                <View style={styles.buttonContainer}>
                    <CustomButton 
                        title="Proceed" 
                        onPress={handleProceed}
                        style={{
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
                        }} 
                    />
                </View>
            </SafeAreaView>
        </View>
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
        margin: 20,
        marginTop: 25,
    },

    formContainer: {
        flex: 1,
    },

    buttonContainer: {
        marginBottom: 20,
    },

    title: {
        fontWeight: "bold",
        color: "white",
        fontSize: 40,
        marginTop: 30,
    },
    description: {
        color: "white",
        marginTop: 20,
        fontSize: 14,
    }
});