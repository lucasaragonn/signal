import React from 'react';
import {
  StyleSheet, View, KeyboardAvoidingView,
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  });

  const register = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`User ${user.uid} created:::::`);
      await updateProfile(user, {
        displayName: fullName,
        photoURL: imageUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
      });
      console.log('User profile updated::::::');

      // if (authUser.user) {
      //   console.log('imageUrl::::::', imageUrl);
      //   authUser.user.updateProfile({
      //     displayName: fullName,
      //     photoURL: imageUrl
      //     || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
      //   });
      // }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>Create a Signal Account</Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          value={fullName}
          onChangeText={(fullNameValue) => setFullName(fullNameValue)}
          autoFocus
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(emailValue) => setEmail(emailValue)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(passwordValue) => setPassword(passwordValue)}
          secureTextEntry
        />
        <Input
          placeholder="Profile picture URL ( optional )"
          type="text"
          value={imageUrl}
          onChangeText={(imageUrlValue) => setImageUrl(imageUrlValue)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        raised
        containerStyle={styles.button}
        title="Register"
        onPress={register}
      />
      <View style={{ height: 150 }} />
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;

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
  button: {
    width: 120,
    marginTop: 30,
  },
});
