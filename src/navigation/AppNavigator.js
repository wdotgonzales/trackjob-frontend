import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import StartScreen from "../screens/StartScreen"
import FeatureScreen from "../screens/FeaturesScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import ChooseProfilePictureScreen from "../screens/RegisterScreen/screens/ChooseProfilePictureScreen"
import OtpScreen from "../screens/RegisterScreen/screens/OtpScreen"
import RegisterSuccessScreen from "../screens/RegisterScreen/screens/RegisterSuccessScreen"
import { useSelector } from "react-redux";
import AuthenticatedTabNavigator from "./AuthenticatedTabNavigator"
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { checkAuth } from "../features/authentication/authSlice"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(checkAuth());
        console.log(isAuthenticated)
    }, []);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAuthenticated ? (
                        // If user is authenticated, show the tab navigator
                        <Stack.Screen 
                            name="AuthenticatedApp" 
                            component={AuthenticatedTabNavigator} 
                        />
                    ) : (
                        // If user is not authenticated, show the authentication flow
                        <>
                            <Stack.Screen name="Start" component={StartScreen} />
                            <Stack.Screen name="Features" component={FeatureScreen} />
                            <Stack.Screen name="Login" component={LoginScreen}/>
                            <Stack.Screen name="Register" component={RegisterScreen}/>
                            <Stack.Screen name="Otp" component={OtpScreen} />
                            <Stack.Screen name="RegisterProfilePicture" component={ChooseProfilePictureScreen}/>
                            <Stack.Screen name="RegisterSuccess" component={RegisterSuccessScreen}/>
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default AppNavigator