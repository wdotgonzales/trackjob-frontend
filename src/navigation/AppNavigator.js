import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import StartScreen from "../screens/StartScreen"
import FeatureScreen from "../screens/FeaturesScreen"
import LoginScreen from "../screens/LoginScreen"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="Start" 
                component={StartScreen} 
            />
            <Stack.Screen
                name="Features"
                component={FeatureScreen}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default AppNavigator