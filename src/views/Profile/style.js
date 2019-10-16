import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARY, WHITE, SECONDARY } from '../../consts';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  backContainer: {
    position: 'absolute',
    top: width / 10,
    left: width / 18,
  },
  backIcon: {
    fontSize: 30,
    color: WHITE,
  },
  container: {
    backgroundColor: PRIMARY,
  },
  content: {
    marginTop: 24,
  },
  profileImage: {
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: 100,
    marginBottom: 12,
  },
  profileText: {
    color: WHITE,
    fontSize: 16,
    marginTop: 2,
    marginBottom: 2,
  },
  logoutButton: {
    backgroundColor: SECONDARY,
    marginTop: 12,
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
