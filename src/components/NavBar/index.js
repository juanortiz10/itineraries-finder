import React from 'react';
import { Header, Left, Body, Right, Text, Thumbnail } from 'native-base';

export default function NavBar(props) {
  return(
    <Header>
      <Left/>
      <Body>
        <Text>Home</Text>
      </Body>
      <Right>
        <Thumbnail source={{ uri: props.photoURL }}/>
      </Right>
    </Header>
  );
}
