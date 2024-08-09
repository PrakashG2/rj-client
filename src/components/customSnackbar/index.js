import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackbar } from './customSnackbarSlice';
import { FONT } from '../../utilities/fonts';
import { COLOR } from '../../utilities/colors';
import { moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { message, visible, color } = useSelector(state => state.snackbar);

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Automatically hide the snackbar after a delay
      const timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          dispatch(hideSnackbar());
        });
      }, 2000); // Snackbar duration

      // Clear timeout when component unmounts
      return () => clearTimeout(timeout);
    }
  }, [dispatch, fadeAnim, visible]);

  return (
    // Render snackbar if it's visible
    visible && (
      <Animated.View style={[styles.CustomSnackbar, { opacity: fadeAnim, backgroundColor: color }]}>
        <Text style={styles.messageText}>{message}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  CustomSnackbar: {
    position: 'absolute',
    bottom: moderateScale(10),
    width: width - 40,
    left: moderateScale(20),
    borderRadius: 5,
    padding: moderateScale(10),
    zIndex: 999,
  },
  messageText: {
    fontFamily: FONT.PRIMARY_BOLD,
    color: COLOR.WHITE,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});

export default CustomSnackbar;
