import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  jobCountBar: {
    flex: 1,
    height: '40%',
    width: 365,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 50,
    paddingHorizontal: 5,
    paddingVertical: 10,
    // backgroundColor: 'red'
  },
  jobCountBarValues: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:2,
    borderStyle:'solid',
    borderRadius:10,
    borderColor: '#D2D2D2',
    // backgroundColor: 'green',
    margin:2
    
  },
  jobCard: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 5,
    margin: 5,
  },
  jobCardContent: {
    flex: 1,
    padding: 15,
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 5,
  },
  title: {
    color: '#929090',
    marginVertical: 10,
  },
  value: {
    color: 'black',
  },
  jobCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pillButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardColorIndicator: {
    height: '100%',
    width: '2%',
    backgroundColor: 'red',
  },
});
