import React from 'react';
import { Card, View, Text } from 'native-base';

import styles from './style';

export default function QuoteItem({ MinPrice, Name, currentCarrier }) {
  return(
    <Card style={styles.card}>
      <Text style={styles.title}>
        Aerolinea:
        <Text style={styles.airlineName}> {currentCarrier.Name} </Text>
      </Text>
      <Text style={styles.title}>
        Precio Minimo:
        <Text style={styles.airlineName}> {MinPrice} USD</Text>
      </Text>
    </Card>
  );
}
