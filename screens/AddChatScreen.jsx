import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  collection, addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

function AddChatScreen({ navigation }) {
  const [input, setInput] = React.useState('');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Chats',
      title: 'Add new Chat',
    });
  }, [navigation]);

  const createNewChat = async () => {
    try {
      await addDoc(collection(db, 'chats'), {
        chatName: input,
      });
      navigation.goBack();
    } catch (error) {
      console.log('CREATE NEW CHAT ERROR:::::', error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        type="text"
        value={input}
        onChangeText={(inputValue) => setInput(inputValue)}
        leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
        onSubmitEditing={createNewChat}
      />
      <Button onPress={createNewChat} title="Create new chat" />
    </View>
  );
}

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});
