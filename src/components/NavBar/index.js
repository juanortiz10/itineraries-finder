import React from "react";
import { Header, Left, Right, Text, Thumbnail, Button } from "native-base";
import { TouchableOpacity } from 'react-native';

import styles from "./style";
import { PRIMARY_DARK } from "../../consts";

export default function NavBar({ title, info, onThumbnailClick }) {
  return (
    <Header style={styles.header} androidStatusBarColor={PRIMARY_DARK}>
      <Left>
        <Text style={styles.headerTitle}>{title}</Text>
      </Left>
      <Right>
        <Button onPress={onThumbnailClick} transparent>
          <Thumbnail source={{ uri: info && info.photoUrl }} small/>
        </Button>
      </Right>
    </Header>
  );
}
