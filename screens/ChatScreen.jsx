import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
  View, SafeAreaView, KeyboardAvoidingView, Platform,
  ScrollView, TextInput, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import {
  doc, collection, addDoc, onSnapshot, query, orderBy,
} from 'firebase/firestore';
import { db, auth } from '../firebase';

function ChatScreen({ navigation, route }) {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const scrollViewRef = React.useRef();

  const sendMessage = () => {
    Keyboard.dismiss();

    const chatRef = doc(db, 'chats', route.params.id);
    const messagesRef = collection(chatRef, 'messages');

    addDoc(messagesRef, {
      timestamp: new Date().toISOString(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    }).then(() => {
      console.log('message added to chat');
    }).catch((error) => {
      console.log('ERROR:::: not able to add chat', error);
    });

    setInput('');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        >
          <Avatar
            rounded
            source={{ uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png' }}
          />
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontWeight: '700',
              fontSize: 18,
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 70,
        }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="phone" size={26} color="white" />
          </TouchableOpacity>
        </View>
      ),

    });
  }, [navigation, route.params.chatName]);

  React.useLayoutEffect(() => {
    const chatRef = doc(db, 'chats', route.params.id);
    const messagesRef = collection(chatRef, 'messages');
    const orderedMessagesRef = query(messagesRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(orderedMessagesRef, (snapshot) => {
      setMessages(snapshot.docs.map((m) => ({
        id: m.id,
        data: m.data(),
      })));
    });

    return unsubscribe;
  }, [route.params.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{ padding: 5 }}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
              {messages.map(({ id, data }) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.sender}>
                    {data.photoURL && (
                    <Avatar
                      source={{ uri: data.photoURL }}
                      rounded
                      size={30}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                    />
                    )}
                    <Text style={styles.senderName}>{data.displayName}</Text>
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.receiver}>
                    {data.photoURL && (
                    <Avatar
                      source={{ uri: data.photoURL }}
                      rounded
                      size={30}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                    />
                    )}
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                )
              ))}

            </ScrollView>

            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter a message"
                value={input}
                onChangeText={(inputValue) => setInput(inputValue)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <FontAwesome name="send" size={24} color="#2C6BED" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  textInput: {
    bottom: 0,
    height: 40,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ececec',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
    flexGrow: 1,
  },
  receiverText: {},
  senderText: {
    color: 'white',
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  senderName: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
