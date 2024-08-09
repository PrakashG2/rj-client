import { Dimensions } from 'react-native';
import { ScaledSheet, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { FONT } from '../../utilities/fonts';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export const styles = ScaledSheet.create({
  // containerStyle: {
  //   backgroundColor: 'green',
  //   flex: 1,
  // },imageBackground: {
  //   flex:1
  // },headerContainer: {
  //   flex: 1,
  //   height: screenHeight/4,
  //   backgroundColor: 'green',
  // },bodyContainer: {
  //   flex: 3,
  //   height:screenHeight,
  //   backgroundColor: 'red',
  // },

  container: {
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 40,
    // fontWeight: '700',
    color: '#336C85',
    marginBottom: 6,
    fontFamily: FONT.PRIMARY_BOLD,
  },
  subtitle: {
    fontSize: 15,
    // fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 135,
    // marginBottom: 30,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    paddingTop: 90,
    marginTop: 74,
    marginBottom: 84,
    paddingHorizontal: 24,
    
    borderRadius: 15,
    width: '90%',
    backgroundColor: 'white',
    // backgroundColor: 'red',
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    // fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 25,
    // backgroundColor: 'red'
  },
  inputLabel: {
    fontSize: 17,
    // fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    // backgroundColor: '#fff',
    // borderRadius: 12,
    fontSize: moderateScale(15),
    color: '#222',
    borderBottomWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
    fontFamily: FONT.PRIMARY_BOLD
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    // borderWidth: 1,
    backgroundColor: '#EE7DB2',
    // borderColor: '#075eec',
    marginBottom: 15,
  },
  btnText: {
    
    fontSize: 18,
    lineHeight: 26,
    // fontWeight: '900',
    color: 'white',
  },
  
 
});
