import Constants from 'expo-constants';
import { Platform } from "react-native";

const ENV = {
  dev: {
    iosClientId: '855658365694-ejipr999qbmpradg762vq65jritbash7.apps.googleusercontent.com',
    androidClientId: '855658365694-cn29qj2famc3fie6lmkpfun667j295lt.apps.googleusercontent.com',
    iosStandaloneAppClientId: '814328624275-7g7ok4bkbpd69ujtans0istsbk687r40.apps.googleusercontent.com',
    androidStandaloneAppClientId: '814328624275-pokkpv1p950fko8122816177h8j3rp6c.apps.googleusercontent.com'
  },
  staging: {},
  prod: {}
};

export default (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};
