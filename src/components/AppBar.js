import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//
import {images} from '../../assets/icons';
import { logout } from '../screens/Login/loginReducer';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from './Drawer/drawerSlice';
import { COLOR } from '../utilities/colors';
import { moderateScale } from 'react-native-size-matters';
import { FONT } from '../utilities/fonts';




const AppBar = ({title}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleDrawerButton = () => {
    dispatch(openDrawer())

  }



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDrawerButton}>
      <Image source={require('../../assets/icons/hamburger.png')} style={{height: moderateScale(30), width: moderateScale(30)}}></Image>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor: COLOR.WHITE, borderRadius: 30, padding: moderateScale(3)}}>
        <Image source={require('../../assets/icons/userAvatarBig.png')} style={{height: moderateScale(30), width: moderateScale(30)}}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#0D5DFF',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10) // Customize the background color as needed
  },
  title: {
    color: COLOR.WHITE, // Customize the text color as needed
    fontSize: moderateScale(24),
    fontFamily: FONT.PRIMARY_BOLD
  },
});

export default AppBar;
