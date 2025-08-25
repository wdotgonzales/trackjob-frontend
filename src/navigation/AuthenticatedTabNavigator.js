import HomePageScreen from "../screens/HomePageScreen"
import SettingsScreen from "../screens/SettingsScreen"
import AnalyticsScreen from "../screens/AnalyticsScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Import your new screen
import SingleJobApplicationScreen from "../screens/SingleJobApplicationScreen"
import CreateJobApplicationScreen from "../screens/CreateJobApplicationScreen"
import CreateJobApplicationReminderScreen from "../screens/CreateJobApplicationScreen/screens/CreateJobApplicationReminderScreen"
import SuccessScreen from "../screens/CreateJobApplicationScreen/screens/SuccessScreen"
import EditPersonalInformationScreen from "../screens/SettingsScreen/screens/EditPersonalInformationScreen"
import EnterNewPasswordScreen from "../screens/SettingsScreen/screens/EnterNewPasswordScreen"
import ChangePasswordOtpScreen from "../screens/SettingsScreen/screens/ChangePasswordOtpScreen";

import { Foundation } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Fontisto } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Create the tab navigator as a separate component
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F97009',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#052731",
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomePageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="analytics" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" size={28} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

// Main authenticated navigator that wraps the tab navigator
const AuthenticatedTabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
      />
      <Stack.Screen 
        name="SingleJobApplication" 
        component={SingleJobApplicationScreen}
      />
      <Stack.Screen 
        name="CreateJobApplication" 
        component={CreateJobApplicationScreen}
      />
      <Stack.Screen 
        name="CreateJobApplicationReminder"
        component={CreateJobApplicationReminderScreen}
      />
      <Stack.Screen
        name="CreateJobApplicationSuccessScreen"
        component={SuccessScreen}
      />
      <Stack.Screen 
        name="EditPersonalInformation"
        component={EditPersonalInformationScreen}
      />
      <Stack.Screen
        name="EnterNewPassword"
        component={EnterNewPasswordScreen}
      />
      <Stack.Screen  
        name="ChangePasswordOtp"
        component={ChangePasswordOtpScreen}
      />
      {/* Add more screens here as needed */}
    </Stack.Navigator>
  )
}

export default AuthenticatedTabNavigator