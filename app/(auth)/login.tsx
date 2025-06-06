import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { saveUserEmail } from '../../util/auth'; // Adjust the import path as needed


export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.2.46:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      console.log('Login Response:', data); // ✅ Keep this for debugging
  
      if (response.ok) {
        const { token, userId } = data;
  
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', userId);
        await saveUserEmail(email); // ✅ Store email
  
        console.log('Saved token, userId, and email');
  
        router.replace('/(protected)'); // ✅ Move this INSIDE the `if`
      } else {
        Alert.alert('Login failed', data.message || 'Please check your credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Server error', 'Unable to login at the moment');
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>Relievio</Text>
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
          style={styles.input}
          textContentType="oneTimeCode"  
          autoComplete="off"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#0d0d0d',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  loginButton: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#0d0d0d',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: '#60a5fa',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});
