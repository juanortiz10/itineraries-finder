import React, { useEffect, useState } from "react";
import { Container, Content, Spinner, Grid } from "native-base";
import { Image, BackHandler } from "react-native";
import * as Font from "expo-font";

import { getItem } from "../../utils/storage";
import { USER_INFO, ROBOTO, ROBOTO_MEDIUM, PROFILE } from "../../consts";
import NavBar from "../../components/NavBar";
import SearchComponent from "../../components/SearchComponent";
import styles from "./style";
import genericStyles from '../../styles';

const homeImage = require("../../../assets/home.jpg");
const ROBOTO_PATH = require("../../../node_modules/native-base/Fonts/Roboto.ttf");
const ROBOTO_MEDIUM_PATH = require("../../../node_modules/native-base/Fonts/Roboto_medium.ttf");

export default ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(
    () => {
      if (!userInfo) {
        loadUserInfo();
      }

      if (!fontsLoaded) {
        loadFonts();
      }

      BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress');
      };
    },
    [userInfo, fontsLoaded]
  );

  const handleBackButtonPressAndroid = () => true;

  const loadUserInfo = async () => {
    const info = await getItem(USER_INFO);

    if (info) {
      setUserInfo(JSON.parse(info));
    }
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      [ROBOTO]: ROBOTO_PATH,
      [ROBOTO_MEDIUM]: ROBOTO_MEDIUM_PATH
    });
    setFontsLoaded(true);
  };

  const handleThumbnailClick = () => {
    navigation.navigate(PROFILE);
  };

  if (!fontsLoaded) {
    return (
      <Container>
        <Spinner size={50} />
      </Container>
    );
  }

  return (
    <Container>
      <NavBar
        info={userInfo}
        onThumbnailClick={handleThumbnailClick}
      />
      <Content contentContainerStyle={[genericStyles.contentContainerStyle, styles.container]}>
        <Grid style={genericStyles.centeredGridStyle}>
          <SearchComponent navigation={navigation}/>
        </Grid>
        {/*<Image source={homeImage} style={styles.homeImage} resizeMode="cover"/>*/}
      </Content>
    </Container>
  );
};
