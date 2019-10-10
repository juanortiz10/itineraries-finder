import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12
  },
  titlesContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  label: {
    fontSize: 16,
    fontWeight: '500'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300'
  },
  itineraryNumber: {
    fontSize: 20,
    fontWeight: '500'
  },
  pricingOptionContainer: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 7
  },
  carrierImage: {
    width: 80,
    height: 40
  },
  pricingOptionRighItem: {
    marginLeft: 18
  }
});
