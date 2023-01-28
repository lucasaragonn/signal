import React from 'react';
import {
  StyleSheet,
  View, ScrollView, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { Avatar } from 'react-native-elements';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import {
  collection, onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import CustomListItem from '../components/CustomListItem';

function HomeScreen({ navigation }) {
  const [chats, setChats] = React.useState([]);

  const logOut = React.useCallback(() => {
    signOut(auth).then(() => {
      navigation.replace('Login');
      console.log('Signed Out Successfuly:::::');
    }).catch((error) => {
      console.log('error::::::', error);
    });
  }, [navigation]);

  React.useEffect(() => {
    const cc = collection(db, 'chats');
    const unsubscribe = onSnapshot(cc, (snapshot) => {
      setChats(snapshot.docs.map((c) => ({
        id: c.id,
        data: c.data(),
      })));
    });

    return unsubscribe;
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <View style={{ marginLeft: 5 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={logOut}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20,
        }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [logOut, navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', { id, chatName });
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
      >
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
