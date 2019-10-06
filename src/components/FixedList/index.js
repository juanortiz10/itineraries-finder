import React from "react";

import styles from "./style";
import { ScrollView } from "react-native";
import { List, ListItem, Text, Content, Container, Spinner } from "native-base";

export default function FixedList({ places, onItemPress, containerStyle }) {

  if (!places || !places.length) {
    return(
      <Spinner size={30}/>
    );
  }
  return (
    <Container style={[styles.container, containerStyle]}>
      <Content>
        <List>
          {places &&
            places.map((place, index) => (
              <ListItem key={index} onPress={() => onItemPress(place)}>
                <Text>{place.PlaceName}</Text>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  );
}
