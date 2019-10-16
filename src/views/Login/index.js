import React, { useState, useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { Container, Text, Content, Button, Spinner, Grid } from 'native-base';
import { Image } from 'react-native';

import {
  HOME,
  USER_INFO,
  ACCESS_TOKEN,
} from '../../consts';
import styles from './style';
import genericStyles from '../../styles';
import getEnvVars from '../../../environment';
import { saveItem } from '../../utils/storage';

const {
  iosClientId,
  androidClientId,
  iosStandaloneAppClientId,
  androidStandaloneAppClientId,
} = getEnvVars();
const GOOGLE_ICON = require('../../../assets/google-icon.png');
const SUCCESS = 'success';

export default ({ navigation }) => {

  const handleRequestSignIn = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId,
        androidClientId,
        iosStandaloneAppClientId,
        androidStandaloneAppClientId,
      });

      if (type === SUCCESS) {
        const userResult = await saveItem(USER_INFO, JSON.stringify(user));
        const accessTokenResult = await saveItem(
          ACCESS_TOKEN,
          JSON.stringify(accessToken),
        );

        if (userResult && accessTokenResult) {
          navigation.navigate(HOME);
        } else {
          alert('Something went wrong!');
        }
      }
    } catch ({ message }) {
      alert('Error: ' + message);
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={genericStyles.contentContainerStyle}>
        <Grid style={genericStyles.centeredGridStyle}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.loginText}>Inicia sesion para continuar</Text>
          <Button
            style={styles.googleButton}
            onPress={handleRequestSignIn}
            light
            iconLeft
            full>
            <Image source={GOOGLE_ICON} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Google</Text>
          </Button>
        </Grid>
      </Content>
    </Container>
  );
};
