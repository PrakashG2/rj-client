import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR } from '../../utilities/colors';
import { moderateScale } from 'react-native-size-matters';
import textStyles from '../../utilities/textStyles';
import PillShapedButton from '../PillShapedButtonV2';
import { hidePicturedPrompt } from './picturedConfirmationPromptSlice';
import * as Animatable from 'react-native-animatable';
import { ICON } from '../../utilities/icons';

const PicturedConfirmationPrompt = () => {
  const dispatch = useDispatch();

  // Redux selector
  const { promptVisiblity, buttonOneText, buttonOneStyle, buttonOneOnPress, buttonTwoText, buttonTwoStyle, buttonTwoOnPress, message, } = useSelector((state) => state.picturedConfirmationPrompt);

  // Handle outside click
  const handleOutsideClick = () => {
    dispatch(hidePicturedPrompt());
  };

  return (
    promptVisiblity && (
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <Animatable.View
              style={styles.prompt}
              animation="zoomIn"
              duration={300}
              easing="ease-in-out"
              useNativeDriver
            >
              <View style={styles.pictureContainer}>
                <Image
                  source={ICON.IMAGE}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.messageContainer}>
                <Text style={textStyles.promptMessage}>{message}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <PillShapedButton buttonText={buttonOneText} buttonStyle={buttonOneStyle} onPress={buttonOneOnPress}/>
                <PillShapedButton buttonText={buttonTwoText} buttonStyle={buttonTwoStyle} onPress={buttonTwoOnPress} />
              </View>
            </Animatable.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    )
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
  },
  prompt: {
    width: moderateScale(300),
    borderRadius: 20,
    backgroundColor: COLOR.WHITE,
    padding: moderateScale(15),
  },
  pictureContainer: {
    height: moderateScale(125),
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: COLOR.GREY_THREE,
    // elevation: 15,
  }, image: {

    height: '80%',
    width: '100%',
  },
  messageContainer: {
    marginVertical: moderateScale(20),


  },
  buttonContainer: {
    height: moderateScale(40),
    marginVertical: moderateScale(5),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

});

export default PicturedConfirmationPrompt;
