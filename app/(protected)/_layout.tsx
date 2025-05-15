import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.screen name="login" options={{ headerShown: false }} />  
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
};
