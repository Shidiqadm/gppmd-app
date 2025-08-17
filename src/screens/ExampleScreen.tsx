import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Input, Text, Spinner } from '../components/atoms';
import { useAppStore, useUser, useLoading } from '../store/useAppStore';
import { useCurrentUser, useLogin } from '../services/userService';

const ExampleScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Zustand store usage
  const { setUser, setLoading } = useAppStore();
  const user = useUser();
  const loading = useLoading();
  
  // React Query usage
  const { data: currentUser, isLoading: userLoading, error } = useCurrentUser();
  const loginMutation = useLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading('auth', true);
      const result = await loginMutation.mutateAsync({ email, password });
      
      // Update Zustand store
      setUser({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        isAuthenticated: true,
      });
      
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading('auth', false);
    }
  };

  const handleLogout = () => {
    setUser({
      id: null,
      name: null,
      email: null,
      isAuthenticated: false,
    });
    Alert.alert('Success', 'Logged out successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" style={styles.title}>
          React Native Setup Demo
        </Text>
        
        <Text variant="body" color="secondary" style={styles.subtitle}>
          This screen demonstrates all configured dependencies
        </Text>

        {/* Zustand State Display */}
        <View style={styles.section}>
          <Text variant="h3">Zustand Store State</Text>
          <Text variant="body">
            User: {user.isAuthenticated ? user.name || 'Authenticated User' : 'Not logged in'}
          </Text>
          <Text variant="body">
            Auth Loading: {loading.auth ? 'Yes' : 'No'}
          </Text>
        </View>

        {/* React Query Data Display */}
        <View style={styles.section}>
          <Text variant="h3">React Query Data</Text>
          {userLoading && <Spinner />}
          {error && (
            <Text variant="body" color="error">
              Error: {error.message}
            </Text>
          )}
          {currentUser && (
            <Text variant="body">
              Current User: {currentUser.name}
            </Text>
          )}
        </View>

        {/* Login Form (Atomic Design Components) */}
        {!user.isAuthenticated ? (
          <View style={styles.section}>
            <Text variant="h3">Login Form</Text>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
            <Button
              title={loading.auth ? 'Logging in...' : 'Login'}
              onPress={handleLogin}
              disabled={loading.auth}
              variant="primary"
            />
          </View>
        ) : (
          <View style={styles.section}>
            <Text variant="h3">Welcome!</Text>
            <Text variant="body">You are logged in as {user.name || user.email}</Text>
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="secondary"
            />
          </View>
        )}

        {/* Component Examples */}
        <View style={styles.section}>
          <Text variant="h3">Component Examples</Text>
          <Button
            title="Primary Button"
            onPress={() => Alert.alert('Button Pressed', 'Primary button works!')}
            variant="primary"
            style={styles.button}
          />
          <Button
            title="Secondary Button"
            onPress={() => Alert.alert('Button Pressed', 'Secondary button works!')}
            variant="secondary"
            style={styles.button}
          />
          <Button
            title="Outline Button"
            onPress={() => Alert.alert('Button Pressed', 'Outline button works!')}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 8,
  },
});

export default ExampleScreen;
