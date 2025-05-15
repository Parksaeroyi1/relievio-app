import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar/>
      <Stack>
      <Stack.Screen
        name= "(protected)"
        options={{
          headerShown: false,
        }}
        />
        </Stack>
    </React.Fragment>
  )
};
