// app/index.js
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Delay to ensure RootLayout mounted
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
