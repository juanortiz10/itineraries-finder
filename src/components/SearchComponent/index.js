import React, { useState, useEffect } from 'react';
import { View, Form, Item, Input, Label, Button, Text, Icon, DatePicker } from 'native-base';

import styles from './style';

export default function SearchComponent() {
  const [outBoundDate, setOutboundDate] = useState(null);
  const [inBoundDate, setInboundDate] = useState(null);

  return(
      <Form style={styles.form}>
        <Item>
          <Input style={styles.input} placeholder="Origen"/>
          <Icon name="ios-home"/>
        </Item>
        <Item>
          <Input style={styles.input} placeholder="Destino"/>
          <Icon name="ios-airplane"/>
        </Item>
        <Item style={styles.datesContainer}>
          <DatePicker style={styles.input} placeHolderText="Ida" onDateChange={(newDate) => setOutboundDate(newDate)}/>
          <Icon name="calendar"/>

          <DatePicker style={styles.input} placeHolderText="Regreso" onDateChange={(newDate) => setInboundDate(newDate)}/>
          <Icon name="calendar"/>
        </Item>
        <Button full style={styles.searchButton}>
          <Text>Buscar</Text>
          <Icon name="search"/>
        </Button>
      </Form>
  );
}
