import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';

import { useDispatch, useSelector } from 'react-redux';
import { COLOR } from '../../utilities/colors';
import { moderateScale } from 'react-native-size-matters';
import textStyles from '../../utilities/textStyles';
import PillShapeButton from '../pillShapeButton';


const ConfirmationPrompt = () => {

  // Redux selector
  const {jobId, buttonOneText, buttonOneTextStyle,buttonOneOnPress, buttonTwoText, buttonTwoStyle, buttonTwoOnPress, message, prompt }= useSelector(state => state.confirmationPrompt);



  // const prompt = false;

  console.log("-----------------------------", buttonOneText)

  return (
    prompt && (
    <View style={styles.container}>
        <View style={styles.prompt}>
            <Text style={textStyles.promptMessage}>{message}</Text>
            {jobId != null &&(
            <Text style={[textStyles.promptMessage, {marginVertical: moderateScale(10)}]}>{`# ${jobId}`}</Text>

            )}


            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: moderateScale(15)}}>
                <PillShapeButton buttonText={buttonOneText} buttonStyle={{width: moderateScale(80), backgroundColor: COLOR.LIGHT_GREEN}} onPress={() => buttonOneOnPress()}></PillShapeButton>
                <PillShapeButton buttonText={buttonTwoText} buttonStyle={{width: moderateScale(80), backgroundColor: COLOR.SECONDARY}} onPress={() => buttonTwoOnPress()}></PillShapeButton>

            </View>
        </View>
   
  </View>)
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },prompt: {
    height: moderateScale(180),
    width: moderateScale(300),
    borderRadius:15,
    backgroundColor: COLOR.WHITE,
    padding: moderateScale(30),
    justifyContent: 'center',
  }
  
});

export default ConfirmationPrompt;
