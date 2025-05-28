// utils/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const email = await AsyncStorage.getItem('userEmail');
    return email;
  } catch (error) {
    console.error('Error retrieving user email:', error);
    return null;
  }
};

export const saveUserEmail = async (email: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userEmail', email);
  } catch (error) {
    console.error('Error saving user email:', error);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userEmail');
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};
