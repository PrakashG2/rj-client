import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';

import { useDispatch, useSelector } from 'react-redux';


const CustomLoader = () => {

  // Redux selector



  const isLoading = useSelector(state => state.customLoader.loading);

  return (
    isLoading && (<View style={styles.container}>
    {/* <ActivityIndicator size="large" color="#fff" />
    <Text style={styles.text}>Loading...</Text> */}
    <LottieView
      style={styles.animation}
      source={require('../../../assets/animations/loader.json')}
      autoPlay
      loop
      resizeMode="contain"
    />
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
  },
  text: {
    color: '#fff',
    marginTop: 10,
  },
  animation: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    transform: [{scale: 0.5}],
  },
});

export default CustomLoader;
