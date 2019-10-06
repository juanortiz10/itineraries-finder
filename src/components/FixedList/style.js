import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'absolute',
    height: 250,
    width,
    paddingLeft: width / 14,
    paddingRight: width / 14,
    zIndex: 1
  }
});
