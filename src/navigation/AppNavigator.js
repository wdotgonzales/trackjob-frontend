import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import StartScreen from "../screens/StartScreen"
import FeatureScreen from "../screens/FeaturesScreen"
import LoginScreen from "../screens/LoginScreen"

import { useSelector } from "react-redux";
import AuthenticatedTabNavigator from "./AuthenticatedTabNavigator"
import CustomLoader from "../components/CustomLoader"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {

    // This is only temporary, for now this will dictate if user is authenticated or not.
    const auth = useSelector((state) => state.auth.isAuthenticated);

    const isVisible = useSelector((state) => state.loader.isVisible);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {auth ? (
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
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>


            <CustomLoader 
                visible={isVisible}
                size={80}
                color="#F97009"
                backgroundColor="rgba(255, 255, 255, 0.3)"
            />
        </>
    )
}

export default AppNavigator