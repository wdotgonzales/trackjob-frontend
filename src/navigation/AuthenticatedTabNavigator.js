import HomePageScreen from "../screens/HomePageScreen"
import SettingsScreen from "../screens/SettingsScreen"
import AnalyticsScreen from "../screens/AnalyticsScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Foundation } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Fontisto } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

const AuthenticatedTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F97009',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#052731",
            height: 100, // Custom height (default is around 50-60)
            paddingBottom: 10, // Add bottom padding
            paddingTop: 10, // Add top padding
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

export default AuthenticatedTabNavigator