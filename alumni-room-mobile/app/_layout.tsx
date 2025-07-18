import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../src/store';
import { AuthProvider } from '../src/store/AuthContext';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

const queryClient = new QueryClient();

// Ignore specific warnings that are common in development
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function RootLayout() {
  useEffect(() => {
    // Any initialization logic can go here
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="room/[id]" options={{ title: 'Room Details' }} />
            <Stack.Screen name="auth/login" options={{ title: 'Login' }} />
            <Stack.Screen name="auth/register" options={{ title: 'Register' }} />
            <Stack.Screen name="profile/edit" options={{ title: 'Edit Profile' }} />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}