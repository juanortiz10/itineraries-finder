import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    padding: 24
  },
  loginText: {
    fontSize: 15
  },
  googleButton: {
    marginTop: 20,
    height: 60,
    width: width / 1.5,
    alignSelf: 'center'
  },
  googleIcon: {
    width: 50,
    height: 50
  },
  googleButtonText: {
    fontSize: 20
  },
  gridStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  welcomeText: {
    fontSize: 48
  }
});
