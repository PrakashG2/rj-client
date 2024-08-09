import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

//
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../utilities/colors';
import textStyles from '../utilities/textStyles';
import { moderateScale } from 'react-native-size-matters';


export const MinimalHeader = ({ buttonOnPress, buttonText, title, navigation }) => {
  return (
    <View style={{ backgroundColor: 'red', height: moderateScale(45)}}>
    <LinearGradient
      colors={[COLOR.PRIMARY, COLOR.SECONDARY]} // Array of gradient colors
      start={{x: 0, y: 0}} // Start point (top-left)
      end={{x: 1, y: 0}} // End point (top-right)
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={textStyles.minimalHeader}>{title}</Text>
      <TouchableOpacity style={{flexDirection: 'row',position: 'absolute', alignSelf: 'flex-start',alignItems: 'center', marginLeft: moderateScale(20)}} onPress={buttonOnPress}>
        <Image style={{height: moderateScale(14), width: moderateScale(8), marginRight: moderateScale(7)}} source={require('../../assets/icons/arrow_back.png')}></Image>
        <Text style={textStyles.minimalHeader}>{buttonText}</Text></TouchableOpacity>
    </LinearGradient>
  </View>
  )
}

export default MinimalHeader

const styles = StyleSheet.create({})