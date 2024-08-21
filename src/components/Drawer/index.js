import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {COLOR} from '../../utilities/colors';
import {FONT} from '../../utilities/fonts';
import { closeDrawer } from './drawerSlice';
import { logout } from '../../screens/Login/loginReducer';
import { disconnectServer } from '../../screens/ServerConnect/serverConnectSlice';
import { configuration } from '../../common/user';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { showLoader } from '../customLoader/reducer';


const Drawer = ({ navigation }) => {
  // Redux selector
  const { drawerOpen } = useSelector(state => state.drawer);

  // DISPATCH
  const dispatch = useDispatch();

  if (!drawerOpen) return null;

  // CLOSE BUTTON
  const handleCloseButton = () => {
    dispatch(closeDrawer())
  }

  // JOBS BUTTON
  const handleJobsButton = () => {
    dispatch(closeDrawer())
  }

   // LOGOUT BUTTON
   const handleLogoutButton = () => {
    // configuration.removeConfigData()
    dispatch(showLoader())

    dispatch(closeDrawer())
    dispatch(logout())
    RNRestart.restart();


    // dispatch(disconnectServer())

    // navigation.navigate('ServerConnectScreen')
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.drawer}>
        <View>
          <View style={styles.drawerHeader}>
            <TouchableOpacity style={styles.iconContainer} onPress={handleCloseButton}>
              <Image
                source={require('../../../assets/icons/close.png')}
                resizeMode="contain"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
              <Text
                style={{
                  fontFamily: 'Urbanist-ExtraBold',
                  fontSize: moderateScale(28),
                  color: '#336C85',
                }}>
                Remote Job
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.drawerButtonConatiner} onPress={handleJobsButton}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../../assets/icons/tools.png')}
                resizeMode="contain"
                style={styles.closeIcon}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text
                style={{
                  fontFamily: FONT.PRIMARY_SEMI_BOLD,
                  fontSize: moderateScale(18),
                  color: COLOR.BLACK,
                }}>
                Jobs
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerButtonConatiner} onPress={handleLogoutButton}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../../assets/icons/logout.png')}
                resizeMode="contain"
                style={styles.closeIcon}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text
                style={{
                  fontFamily: FONT.PRIMARY_SEMI_BOLD,
                  fontSize: moderateScale(18),
                  color: COLOR.BLACK,
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        <Text style={{ marginLeft: 5,fontFamily: 'Urbanist-Bold',fontSize: moderateScale(14), color: 'black', marginRight: 80 }}>App Version</Text>
           <Text style={{ marginLeft: 5,fontFamily: 'Urbanist-Bold',fontSize: moderateScale(14), color: '#c5c5c5', marginRight: 80 }}>Version: 1.0</Text>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  drawer: {
    height: '100%',
    alignSelf: 'flex-start',
    width: moderateScale(300),
    backgroundColor: COLOR.WHITE,
    justifyContent: 'space-between',
  },
  drawerHeader: {
    // backgroundColor: 'red',
    height: moderateScale(80),
    flexDirection: 'row',
    overflow: 'hidden',
    borderBottomWidth: 2,
    borderColor: '#88a5f2',
  },
  iconContainer: {
    // backgroundColor: 'purple',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentContainer: {
    // backgroundColor: 'yellow',
    width: '85%',
    paddingLeft: moderateScale(15),
    justifyContent: 'center',
  },
  closeIcon: {
    height: moderateScale(20),
  },
  footer: {
    backgroundColor: COLOR.GREY_ONE,
    height: moderateScale(70),
    justifyContent: 'center',
    paddingLeft: moderateScale(25)
  },
  drawerButtonConatiner: {
    height: moderateScale(60),
    borderBottomWidth: 1.5,
    borderColor: COLOR.GREY_ONE,
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export default Drawer;
