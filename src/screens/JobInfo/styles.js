import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#E2E1E1',
    color: 'black',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionContent: {
    padding: 15,
    fontSize: 16,
    lineHeight: 24,
  },
  jobInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobInfoHeaderTitle: {
    color: '#E2E1E1',
  },
  jobInfoHeaderValue: {
    color: 'black',
    fontWeight: '700',
  },
  jobInfoText: {},
  jobInfoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobInfoFooterTitle: {},
  jobInfoFooterValue: {
    color: 'red',
    fontWeight: '700',
  },
  title: {
    color: '#929090',
    marginVertical: 10,
  },
  value: {
    color: 'black',
  },
  signatureBox: {
    height: 130,
    borderColor: '#929090',
    borderRadius: 15,
    borderWidth: 2,
    borderBlockColor: 'black',
  },
});
