import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import textStyles from '../../utilities/textStyles';
import { COLOR } from '../../utilities/colors';
import { moderateScale, scale } from 'react-native-size-matters';

const PillShapeButton = ({ buttonText, buttonStyle, onPress }) => {
  return (
    <TouchableOpacity style={[styles.pillButton, buttonStyle]} onPress={onPress}>
      <Text style={textStyles.pillShapeButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillButton: {
    height: scale(28),
    width: moderateScale(100),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.PRIMARY,
  },
});

export default PillShapeButton;
