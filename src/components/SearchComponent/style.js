import { StyleSheet, Dimensions } from 'react-native';
import { SECONDARY } from '../../consts';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  form: {
    width,
    paddingLeft: width / 14,
    paddingRight: width / 14,
  },
  datesContainer: {
    marginTop: 12,
    justifyContent: 'space-between'
  },
  input: {
    marginTop: 12,
    marginBottom: 4
  },
  label: {
    fontSize: 16,
    fontWeight: '400'
  },
  searchButton: {
    marginTop: 24,
    backgroundColor: SECONDARY
  },
  pickersContainer: {
    marginTop: 14,
    marginBottom: 14
  }
});
