import { View, Text, StyleSheet, Image, Pressable, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authentication/authSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchUserProfile, clearUserProfile } from "../../features/profile/profileSlice";
import CustomLoader from "../../components/CustomLoader";
import { useSelector } from "react-redux";

const SettingsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const { data, isLoading, error } = useSelector((state) => state.profile);

    useFocusEffect(
        useCallback(() => {
            // Only fetch if data is empty/null
            if (!data) {
                dispatch(fetchUserProfile());
            }
        }, [data, dispatch])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchUserProfile());
            console.log(data.profile_url)
        } finally {
            setRefreshing(false);
        }
    }, [dispatch]);

    const handleLogout = useCallback(() => {
        dispatch(clearUserProfile());
        dispatch(logout());
    }, [dispatch]);
    
    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="white" // Color for iOS
                            colors={["#F97009"]} // Colors for Android
                            progressBackgroundColor="white"
                        />
                    }
                >
                    <View style={styles.headerContainer}>
                        {
                            data && data.profile_url
                                ?   <Image 
                                        source={{ uri: data.profile_url }}
                                        style={styles.profileAvatar}
                                    />
                                :   <Image 
                                        source={require('../../../assets/default-avatar.png')}
                                        style={styles.profileAvatar}
                                    />
                        }
                        <Text style={styles.fullName}>{data ? data.full_name : 'Loading...'}</Text>
                    </View>

                    <View style={styles.bodyContainer}> 
                        <Text style={styles.accountSettingsText}>Account Settings</Text>

                        <Pressable onPress={() => navigation.navigate('EditPersonalInformation')}>
                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems:"center"}}>
                                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}> 
                                    <FontAwesome name="user" size={30} color="white" />
                                    <Text style={{fontSize: 16, color: "white", marginLeft: 5}}>Personal Information</Text>
                                </View>
                                <AntDesign name="right" size={20} color="white" />
                            </View>
                            <View style={styles.horizontalRule} />
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('EnterNewPassword')}>
                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems:"center"}}>
                                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}> 
                                    <MaterialIcons name="lock-person" size={28} color="white" />
                                    <Text style={{fontSize: 16, color: "white", marginLeft: 0,}}>Change Password</Text>
                                </View>
                                <AntDesign name="right" size={20} color="white" />
                            </View>
                            <View style={styles.horizontalRule} />
                        </Pressable>   

                        <Pressable onPress={handleLogout}>
                            <Text style={{fontSize: 16, color: "red", marginBlock: 5,}}>Logout</Text>
                            <View style={styles.horizontalRule} />
                        </Pressable>   
                    </View>
                </ScrollView>
            </SafeAreaView>

            {isLoading && !refreshing && (
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

export default SettingsScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#054B63',
    },

    scrollContainer: {
        flexGrow: 1,
    },

    headerContainer: {
        alignItems: "center",
        marginTop: 40
    },

    profileAvatar: {
        height: 140,
        width: 140,
        borderRadius: 120,
        borderWidth: 2,
        borderColor: "white"
    },

    fullName: {
        marginTop: 10,
        fontWeight: "bold",
        color: "white",
        fontSize: 25,
    },

    bodyContainer: {
        marginInline: 15,
        marginTop: 30,
    },

    accountSettingsText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20
    },

    horizontalRule: {
        borderBottomColor: '#ffffffff',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 10,
        marginTop: 15,
    },

})