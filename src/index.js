import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Container, Spinner } from 'native-base';
import * as Font from 'expo-font';

import Store from './redux/store';
import Routes from './routes';
import { ROBOTO, ROBOTO_MEDIUM } from './consts';

const store = Store();
const ROBOTO_PATH = require('../node_modules/native-base/Fonts/Roboto.ttf');
const ROBOTO_MEDIUM_PATH = require('../node_modules/native-base/Fonts/Roboto_medium.ttf');

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState(null);

  useEffect(
    () => {
      if (!fontsLoaded) {
        loadFonts();
      }
    },
    [fontsLoaded],
  );

  const loadFonts = async () => {
    await Font.loadAsync({
      [ROBOTO]: ROBOTO_PATH,
      [ROBOTO_MEDIUM]: ROBOTO_MEDIUM_PATH,
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return (
      <Container>
        <Spinner size={50} />
      </Container>
    );
  }

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
