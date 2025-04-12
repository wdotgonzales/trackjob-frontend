import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F97009",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#052731",
          height: 70,
          paddingTop: 13,
          borderColor: '#052731'
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Statitics"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
