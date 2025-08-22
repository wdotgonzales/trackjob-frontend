import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton";

import { useSelector } from "react-redux";
import { httpClient } from "../../../services/httpClient";
import { fetchUserProfile, clearUserProfile } from "../../../features/profile/profileSlice";
import { useDispatch } from "react-redux";

import CustomLoader from "../../../components/CustomLoader";

import * as ImagePicker from "expo-image-picker";
import useS3ImageUpload from "../../../hooks/useS3ImageUpload";
import { showToast } from "../../../components/CustomToaster";

const EditPersonalInformationScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const [newImageUri, setNewImageUri] = useState(""); // Track newly selected image
    const [hasImageChanged, setHasImageChanged] = useState(false); // Track if image was changed
    
    const [isUpdateProfileLoading, setIsUpdateProfileLoading] = useState(false);

    const dispatch = useDispatch();

    const { data: profileData, isLoading: profileIsLoading, error } = useSelector((state) => state.profile);

    const { uploadImage, isUploading: isS3Uploading, uploadProgress, error: S3ImageUploadError, resetUploadState } = useS3ImageUpload();

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);

    useEffect(() => {
        if(profileData){
            setFullName(profileData.full_name || "");
            setProfileUrl(profileData.profile_url || "");
            setNewImageUri(""); // Reset new image when profile data loads
            setHasImageChanged(false);
        }
    }, [profileData, dispatch])

    const handleCameraPress = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Need media library access');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setNewImageUri(asset.uri); // Store the new local image URI
            setHasImageChanged(true); // Mark that image has changed
        }
    };

    const uploadProfileToS3 = async () => {
        try {
            // Only upload if there's a new image selected
            if (hasImageChanged && newImageUri) {
                const result = await uploadImage(profileData.email, newImageUri);
                return result.url;
            }
            // Return existing profile URL if no new image
            return profileUrl;
        } catch (error){
            console.log('S3 Upload Error:', error);
            showToast('error', 'Error', 'Failed to upload image, please try again.');
            throw error;
        }
    }

    const updateProfile = async (profile_url) => {
        setIsUpdateProfileLoading(true);
        try {
            const response = await httpClient.post('update-profile/', { 
                full_name: fullName.trim(), 
                profile_url: profile_url
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showToast('success', 'Success', 'Profile updated successfully!');
            
            // Reset the image change state after successful update
            setHasImageChanged(false);
            setProfileUrl(profile_url);
            setNewImageUri("");
            
        } catch (error) {
            console.log('Update Profile Error:', error);
            showToast('error', 'Error', 'Failed to update profile, please try again.');
            throw error;
        } finally {
            dispatch(fetchUserProfile());
            setIsUpdateProfileLoading(false);
        }
    }

    const handleSave = async () => {
        // Validate full name
        if (!fullName.trim()) {
            showToast('error', 'Validation Error', 'Please enter your full name.');
            return;
        }

        try {
            const finalProfileUrl = await uploadProfileToS3();
            await updateProfile(finalProfileUrl);
        } catch (error) {
            // Error handling is already done in the respective functions
            console.log('Save Error:', error);
        }
    };

    // Function to get the image source for display
    const getImageSource = () => {
        if (hasImageChanged && newImageUri) {
            return { uri: newImageUri };
        } else if (profileUrl) {
            return { uri: profileUrl };
        } else {
            return require("../../../../assets/default-avatar.png");
        }
    };

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        
                        <Text style={styles.headerTitle}>Personal Information</Text>
                    </View>
                    
                    <View style={styles.content}>
                        <View style={styles.profileContainer}>
                            <View style={styles.profileImageContainer}>
                                <Image 
                                    style={styles.profileImage}
                                    source={getImageSource()}
                                />
                                <TouchableOpacity 
                                    style={styles.cameraButton}
                                    onPress={handleCameraPress}
                                >
                                    <Entypo name="camera" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.formContainer}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>EMAIL</Text>
                                <TextInput
                                    style={[styles.textInput, styles.readOnlyInput]}
                                    value={profileData?.email || ""}
                                    placeholder="Enter your email"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    editable={false}
                                />
                            </View>
                            
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>FULL NAME</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={fullName}
                                    onChangeText={setFullName}
                                    placeholder="Enter your full name"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <CustomButton 
                            title="Save" 
                            onPress={handleSave}
                            style={styles.saveButton}
                            textStyle={styles.saveButtonText}
                            disabled={isUpdateProfileLoading || isS3Uploading}
                        />
                    </View>
                </SafeAreaView>
            </View>

            {profileIsLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={styles.loaderStyle}
                />
            )}

            {isUpdateProfileLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={styles.loaderStyle}
                />
            )}

            {isS3Uploading && (
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

export default EditPersonalInformationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054B63"
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    content: {
        flex: 1,
    },
    profileContainer: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 50,
    },
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        height: 160,
        width: 160,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: "white"
    },
    cameraButton: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        backgroundColor: "#6B6B6B",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#054B63",
    },
    plusIcon: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: -2,
        position: 'absolute',
        top: 28,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "500",
        flex: 1,
        textAlign: 'center',
        marginRight: 32,
    },
    formContainer: {
        paddingHorizontal: 24,
        flex: 1,
    },
    fieldContainer: {
        marginBottom: 32,
    },
    fieldLabel: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 11,
        fontWeight: "600",
        marginBottom: 12,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    textInput: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "400",
        paddingVertical: 8,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
    },
    readOnlyInput: {
        color: "rgba(255, 255, 255, 0.7)",
    },
    buttonContainer: {
        paddingHorizontal: 24,
        paddingBottom: 30,
        paddingTop: 20,
    },
    saveButton: {
        backgroundColor: "#052731",
        paddingVertical: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center',
    },
});