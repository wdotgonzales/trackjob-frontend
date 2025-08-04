import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import { logout } from "../../features/authentication/authSlice"

const SettingsScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <View>
                <Text>SettingsScreen Screen</Text>
                <Text onPress={() => dispatch(logout())}>Logout</Text>
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen;