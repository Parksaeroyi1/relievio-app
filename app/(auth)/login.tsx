import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real app, you would send these to your backend
    console.log('Logging in with:', { username, password });
    // After successful login, you would navigate to another screen
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>RELIEVIO</Text>
      </View>
      <View style={{ width: '80%' }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          placeholder="Username or Email"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;