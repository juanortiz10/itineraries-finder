import React, { useEffect } from 'react';
import { Container, Content, Spinner, Grid } from 'native-base';

import { ACCESS_TOKEN, HOME, LOGIN } from '../../consts';
import styles from './style';
import { getItem } from '../../utils/storage';

export default function LoadingPage({ navigation }) {
  useEffect(() => {
    getItem(ACCESS_TOKEN).then(result => {
      if (result) {
        navigation.navigate(HOME);
      } else {
        navigation.navigate(LOGIN);
      }
    });
  });

  return (
    <Container>
      <Content contentContainerStyle={styles.contentStyle}>
        <Grid style={styles.gridStyle}>
          <Spinner size={70} />
        </Grid>
      </Content>
    </Container>
  );
}
