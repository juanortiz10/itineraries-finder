import React, { useEffect, useState } from 'react';
import { Container } from 'native-base';

import { getItem } from '../../utils/storage';
import { USER_INFO } from '../../consts';
import NavBar from '../../components/NavBar';

export default () => {
  const [isInfoLoaded, setInfoLoaded] = useState(null);

  useEffect(() => {
    if (!isInfoLoaded) {
      loadUserInfo();
    }
  }, [isInfoLoaded]);

  const loadUserInfo = async () => {
    const userInfo = await getItem(USER_INFO);
    console.log(userInfo); 
    setInfoLoaded(true);
  }

  return(
    <Container>
      <NavBar/>
    </Container>
  );
}
