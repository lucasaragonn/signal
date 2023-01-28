import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView, StyleSheet, View,
} from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
      return () => unsubscribe();
    });
  }, []);

  const signUp = () => navigation.navigate('Register');
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log('userCredentials::::::', userCredentials);
      }).catch((error) => {
        console.log('Error on Sign In::::::', error);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <Image
        source={{ uri: 'https://1.bp.blogspot.com/-rQKaqvrZ0F8/YAw0B9rjviI/AAAAAAAAAmE/i3RAx-QgYSwVyHObLTo8LW8Ms10e3DT7gCLcBGAsYHQ/s16000/Signal%2BApp.png' }}
        style={{ height: 200, width: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(emailValue) => setEmail(emailValue)}
          autoFocus
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(passwordValue) => setPassword(passwordValue)}
          secureTextEntry
        />
      </View>
      <Button
        containerStyle={styles.button}
        title="Login"
        onPress={signIn}
      />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={signUp}
      />
      <View style={{ height: 150 }} />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: { width: 200, marginTop: 10 },
});
