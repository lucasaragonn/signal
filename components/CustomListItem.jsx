import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';

// eslint-disable-next-line react/prop-types
function CustomListItem({ id, chatName, enterChat }) {
  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={() => enterChat(id, chatName)}
    >
      <Avatar
        rounded
        source={{ uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png' }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          This is a test subtitle legend
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default CustomListItem;

const styles = StyleSheet.create({});
