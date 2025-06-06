// utils/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const email = await AsyncStorage.getItem('email'); // ✅ SAME KEY
    return email;
  } catch (error) {
    console.error('Error retrieving user email:', error);
    return null;
  }
};


export const saveUserEmail = async (email: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('email', email);
  } catch (error) {
    console.error('Error saving user email:', error);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('email');
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};

