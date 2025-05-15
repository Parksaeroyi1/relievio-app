import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
  <Tabs screenOptions={{
    tabBarActiveTintColor: "#000",
    tabBarInactiveTintColor: "#888",
    tabBarStyle: { backgroundColor: "#fffff", paddingBottom: 5 },
    headerShown: false,
    tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
    tabBarIconStyle: { marginTop: 5 },
  }}>
    <Tabs.Screen name="index" options={{ 
        headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }} />
    <Tabs.Screen name="tracker" options={{ 
        headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="pulse" size={24} color={color} />,
         }} />
    <Tabs.Screen name="planner" options={{ 
        headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }} />
    <Tabs.Screen name="profile" options={{ 
        headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }} />  
  </Tabs>
)}
