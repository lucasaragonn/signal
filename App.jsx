import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={globalScreenOptions}
        initialRouteName="Home"
      >
        <Stack.Group>
          <Stack.Screen
            options={{ title: 'Home' }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ title: 'Sign in' }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ title: 'Sign up' }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="AddChat"
            component={AddChatScreen}
          />
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
