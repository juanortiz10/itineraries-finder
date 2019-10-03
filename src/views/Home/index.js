import React, { useEffect, useState } from 'react';
import { Container } from 'native-base';

import { getItem } from '../../utils/storage';
import { USER_INFO } from '../../consts';
import NavBar from '../../components/NavBar';

export default () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      loadUserInfo();
    }
  }, [userInfo]);

  const loadUserInfo = async () => {
    const info = await getItem(USER_INFO);

    if (info) {
      setUserInfo(JSON.parse(info));
    }
  };

  const handleThumbnailClick = () => {
    // TODO
  };

  return(
    <Container>
      <NavBar info={userInfo} onThumbnailClick={handleThumbnailClick}/>
    </Container>
  );
}
