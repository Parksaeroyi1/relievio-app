import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { saveUserEmail } from '../../../util/auth'; // Adjust the import path as needed


export default function ProfileScreen() {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  const navigation = useNavigation();

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      console.log('Loaded User ID:', id);
      setUserId(id);
    };
    loadUserId();
  }, []);

  // Separate update for name
  const updateName = async () => {
    if (!userId) {
      return Alert.alert('Error', 'User ID not found. Please log in again.');
    }
    if (!newName) {
      return Alert.alert('No Changes', 'Please enter a new name to update.');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.2.46:8000/api/user/id/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`✅ Name updated to: ${newName}`);
        Alert.alert('Success', 'Name updated successfully');
        setNewName('');
        if (data.user) {
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
        }
      } else {
        Alert.alert('Error', data.message || 'Name update failed');
      }
    } catch (err) {
      console.error('Update Name Error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  // Separate update for email
  const updateEmail = async () => {
    if (!userId) {
      return Alert.alert('Error', 'User ID not found. Please log in again.');
    }
    if (!newEmail) {
      return Alert.alert('No Changes', 'Please enter a new email to update.');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.2.46:8000/api/user/id/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`✅ Email updated to: ${newEmail}`);
        Alert.alert('Success', 'Email updated successfully');
        setNewEmail('');
        await saveUserEmail(newEmail); // Save new email locally
        if (data.user) {
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
        }
      } else {
        Alert.alert('Error', data.message || 'Email update failed');
      }
    } catch (err) {
      console.error('Update Email Error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const updatePassword = async () => {
    if (!userId) {
      return Alert.alert('Error', 'User ID not found. Please log in again.');
    }

    if (!currentPassword || !newPassword) {
      return Alert.alert('Missing Fields', 'Please enter both current and new password.');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.2.46:8000/api/user/id/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`✅ Password updated successfully`);
        Alert.alert('Success', 'Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        Alert.alert('Error', data.message || 'Password update failed');
      }
    } catch (err) {
      console.error('Update Password Error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      Alert.alert('Logged out', 'You have been successfully logged out.');
      navigation.replace('(auth)/login');
      console.log('✅ User logged out successfully');
    } catch (error) {
      Alert.alert('Logout Failed', 'Something went wrong while logging out.');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>Profile</Text>
        </View>
      </SafeAreaView>

      {/* Account Settings */}
      <View>
        <Text style={styles.subTitle}>Account</Text>

        <TouchableOpacity style={styles.card} onPress={() => setShowUpdateProfile(!showUpdateProfile)}>
          <Text style={styles.cardText}>Update Profile Info</Text>
        </TouchableOpacity>
        {showUpdateProfile && (
          <View style={styles.innerContent}>
            <TextInput
              placeholder="Change Name"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={updateName}>
              <Text style={styles.saveText}>Update Name</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Change Email"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <TouchableOpacity style={styles.saveButton} onPress={updateEmail}>
              <Text style={styles.saveText}>Update Email</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.card} onPress={() => setShowChangePassword(!showChangePassword)}>
          <Text style={styles.cardText}>Change Password</Text>
        </TouchableOpacity>
        {showChangePassword && (
          <View style={styles.innerContent}>
            <TextInput
              placeholder="Current Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity style={styles.saveButton} onPress={updatePassword}>
              <Text style={styles.saveText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Settings */}
      <View>
        <Text style={styles.subTitle}>Settings</Text>

        <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Notifications', 'Toggled')}>
          <Text style={styles.cardText}>Enable Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => setShowNotificationSettings(!showNotificationSettings)}>
          <Text style={styles.cardText}>Notification Settings</Text>
        </TouchableOpacity>
        {showNotificationSettings && (
          <View style={styles.innerContent}>
            <Text style={styles.text}>Notification Frequency:</Text>
            <TextInput placeholder="e.g. Daily" placeholderTextColor="#aaa" style={styles.input} />
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Save Settings</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Clean About Us */}
      <View style={styles.infoSection}>
        <Text style={styles.subTitle}>About Us</Text>
        <Text style={styles.infoText}>
          Relievio is a wellness platform designed to track symptoms and improve your well-being.
        </Text>
      </View>

      {/* Clean Contact Us */}
      <View style={styles.infoSection}>
        <Text style={styles.subTitle}>Contact Us</Text>
        <Text style={styles.infoText}>Email: support@relievio.app</Text>
        <Text style={styles.infoText}>Phone: +1 234-567-8910</Text>
      </View>

      {/* Logout */}
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0d0d0d',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
    color: '#fff',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  innerContent: {
    backgroundColor: '#2c2c2c',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#3a3a3a',
    color: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
  text: {
    color: '#ddd',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: 'black',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  infoText: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 5,
  },
});
