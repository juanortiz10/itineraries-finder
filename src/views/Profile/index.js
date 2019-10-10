import React, { useState, useEffect } from 'react';
import { Content, Container, Spinner, View, Text, Grid, Thumbnail, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { getItem, clearAll } from '../../utils/storage';
import { USER_INFO, LOGIN } from '../../consts';
import genericStyles from '../../styles';
import styles from './style'

export default function Profile({ navigation }) {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    if (!profileInfo) {
      loadUserInfo();
    }
  }, [profileInfo]);

  const loadUserInfo = async () => {
    const userInfo = await getItem(USER_INFO);
    setProfileInfo(JSON.parse(userInfo));
  }

  const handleLogoutPress = async () => {
    const clearResult = await clearAll();
    console.log(clearResult);
    navigation.reset([NavigationActions.navigate({ routeName: LOGIN })], 0);
  };

  if (!profileInfo) {
    return <Spinner size={50}/>;
  }

  const renderUserInfo = () => {
    const { name, photoUrl, email } = profileInfo;

    return(
      <View style={styles.infoContainer}>
        <Thumbnail large source={{uri: photoUrl}} style={styles.profileImage}/>
        <Text style={styles.profileText}>{name}</Text>
        <Text style={styles.profileText}>{email}</Text>
        <Button style={styles.logoutButton} onPress={handleLogoutPress}>
          <Text>Cerrar sesion</Text>
        </Button>
      </View>
    );
  };

  return(
    <Container style={styles.container}>
      <Content contentContainerStyle={[genericStyles.contentContainerStyle, styles.container]}>
        <Grid style={genericStyles.centeredGridStyle}>
          {renderUserInfo()}
        </Grid>
      </Content>
    </Container>
  );
}
