import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import CustomButton from "../../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import useS3ImageUpload from "../../../hooks/useS3ImageUpload";
import CustomLoader from "../../../components/CustomLoader";
import { Asset } from "expo-asset";
import { showToast } from "../../../components/CustomToaster";
import { httpClient } from "../../../services/httpClient";

const ChooseProfilePictureScreen = ({ navigation, route }) => {
    const [profileUrl, setProfileUrl] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    
    const { uploadImage, isUploading: isS3Uploading, uploadProgress, error, resetUploadState } = useS3ImageUpload();
    
    const handleImageUpload = async () => {
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
            setProfileUrl(asset.uri);
            console.log(asset.uri);
        }
    };

    const getImageToUpload = async () => {
        if (profileUrl) {
            return profileUrl;
        }
        
        try {
            const asset = Asset.fromModule(require("../../../../assets/default-avatar.png"));
            await asset.downloadAsync();
            console.log("Using default avatar URI:", asset.localUri);
            return asset.localUri;
        } catch (assetError) {
            console.error('Error loading default avatar:', assetError);
            Alert.alert('Error', 'Failed to load default avatar');
            throw assetError;
        }
    };

    const handleProceed = async () => {
        try {
            const imageToUpload = await getImageToUpload();
            console.log("Image to upload:", imageToUpload);

            const result = await uploadImage(route.params.data.email, imageToUpload);

            if (result.success) {
                console.log('Upload successful!', result.url);
                route.params.data.profileUrl = result.url;
                await handleRegisterUser(route.params.data);
            } else {
                showToast('error', 'Error!', 'Please contact your administrator');
                console.error('Upload failed:', result.error);
            }
        } catch (error) {
            console.error('Error in handleProceed:', error);
        }
    };

    const handleRegisterUser = async (userDetails) => {
        console.log(userDetails);
        const { 
            email, 
            fullName: full_name, 
            password, 
            profileUrl: profile_url, 
            repeatPassword: repeat_password 
        } = userDetails;

        setIsRegisterLoading(true);
        try {
            const response = await httpClient.post('register/', 
                { 
                    email, 
                    full_name, 
                    password, 
                    profile_url, 
                    repeat_password,
                }, 
                { skipAuth: true }
            );

            if (!response.ok) {
                showToast('error', 'Error!', 'Failed to register! Please try again.');
                return;
            } 
            
            navigation.navigate('RegisterSuccess');
        } catch (error) {
            showToast('error', 'Error!', 'Please contact your administrator');
            console.log(error);
        } finally {
            setIsRegisterLoading(false);
        }
    };

    const renderProfilePicture = () => (
        <View style={styles.profilePictureContainer}>
            <Pressable style={styles.profileCircle} onPress={handleImageUpload}>
                <Image 
                    source={profileUrl ? { uri: profileUrl } : require("../../../../assets/default-avatar.png")}
                    style={styles.avatarImage}
                    resizeMode="cover"
                />
            </Pressable>
            
            <Pressable style={styles.cameraIconContainer} onPress={handleImageUpload}>
                <Entypo name="camera" size={24} color="#F97009" />
            </Pressable>
        </View>
    );

    const renderInfoSection = () => (
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
                Uploading profile picture is optional. Only <Text style={styles.boldText}>JPG</Text> and <Text style={styles.boldText}>PNG</Text> files are allowed.
            </Text>
            <Text style={styles.optionalText}>(Optional)</Text>
        </View>
    );

    const isLoading = isS3Uploading || isRegisterLoading;

    return (
        <View style={styles.outerContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Choose Profile Picture</Text>
                </View>
                
                <View style={styles.contentContainer}>
                    {renderProfilePicture()}
                    {renderInfoSection()}
                </View>

                <CustomButton 
                    title="Proceed" 
                    onPress={handleProceed}
                    style={styles.proceedButton}
                    disabled={isLoading}
                />
            </SafeAreaView>

            {isLoading && (
                <CustomLoader 
                    size={60}
                    color="#F97009"
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                    style={styles.loaderStyle}
                />
            )}
        </View>
    );
};

export default ChooseProfilePictureScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#054B63',
    },
    safeAreaContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePictureContainer: {
        marginBottom: 40,
        position: 'relative',
    },
    profileCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#C4C4C4',
        borderWidth: 4,
        borderColor: '#F97009',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: 180,
        height: 180,
        borderRadius: 90,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#052731',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#054B63',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    infoText: {
        color: "white",
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 15,
    },
    boldText: {
        fontWeight: "bold",
    },
    optionalText: {
        color: "white",
        fontSize: 16,
        textAlign: 'center',
    },
    proceedButton: {
        backgroundColor: "#052731", 
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loaderStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});