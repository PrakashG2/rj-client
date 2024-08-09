import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const Ratings = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <View style={styles.container}>
      <AirbnbRating
        showRating={false}
        size={30}
        defaultRating={0}
        onFinishRating={handleRatingChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default Ratings;
