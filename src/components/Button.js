import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from "../../assets/icons/index";
const Button = ({ color, onPress, }) => {
  return (
    <TouchableOpacity style={[styles.pillButton, { backgroundColor: color }]} >
      <Image style={styles.arrowIcon} source={images.icons.rightArrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillButton: {
    padding: 10,
    width: '20%',
    borderRadius: 25,
    alignItems: 'center',
alignSelf: 'flex-end',
marginVertical: '5%'
  },
  arrowIcon: {
    height: 10,
    width: 20,
  },
});

export default Button;
