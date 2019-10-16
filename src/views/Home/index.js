import React, { useEffect, useState } from 'react';
import { Container, Content, Spinner, Grid } from 'native-base';
import { Image, BackHandler } from 'react-native';

import { getItem } from '../../utils/storage';
import { USER_INFO, PROFILE } from '../../consts';
import NavBar from '../../components/NavBar';
import SearchComponent from '../../components/SearchComponent';
import styles from './style';
import genericStyles from '../../styles';

const homeImage = require('../../../assets/home.jpg');

export default ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(
    () => {
      if (!userInfo) {
        loadUserInfo();
      }
      BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButtonPressAndroid,
      );

      return () => {
        BackHandler.removeEventListener('hardwareBackPress');
      };
    },
    [userInfo],
  );

  const handleBackButtonPressAndroid = () => true;

  const loadUserInfo = async () => {
    const info = await getItem(USER_INFO);

    if (info) {
      setUserInfo(JSON.parse(info));
    }
  };

  const handleThumbnailClick = () => {
    navigation.navigate(PROFILE);
  };

  return (
    <Container>
      <NavBar info={userInfo} onThumbnailClick={handleThumbnailClick} />
      <Content
        contentContainerStyle={[
          genericStyles.contentContainerStyle,
          styles.container,
        ]}>
        <Grid style={genericStyles.centeredGridStyle}>
          <SearchComponent navigation={navigation} />
        </Grid>
        {/*<Image source={homeImage} style={styles.homeImage} resizeMode="cover"/>*/}
      </Content>
    </Container>
  );
};
