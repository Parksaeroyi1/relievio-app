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
  KeyboardAvoidingView, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('http://192.168.2.46:8000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userEmail', email);
        Alert.alert('Signup successful! Please log in.');
        router.replace('/(auth)/login');
      } else {
        Alert.alert('Signup failed', data.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Server error', 'Unable to sign up at the moment');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}> 
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>Relievio</Text>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          placeholderTextColor="#ccc"
          style={styles.input}
        />
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
        />
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <Text style={styles.link}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  signupButton: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
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
