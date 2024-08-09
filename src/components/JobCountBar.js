// JobCountBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobCountBar = ({ data }) => {
  return (
    <View style={styles.jobCountBar}>
      {data.map(({ value, label }, index) => (
        <View key={index} style={styles.jobCountBarValues}>
          <Text>{value}</Text>
          <Text>{label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  jobCountBar: {
    flex: 1,
    height: '40%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    shadowColor: 'black',
    elevation: 50,
    
  },
  jobCountBarValues: {
    alignItems: 'center',
  },
});

export default JobCountBar;
