import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RED} from '../constants/colors';
import {scale, verticalScale} from 'react-native-size-matters';
type Error = {
  message: string;
  style?: {[x: string]: any};
};

const Error = ({message, style}: Error) => {
  return <Text style={[styles.content, style]}>{message}</Text>;
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    color: RED,
    alignSelf: 'flex-start',
    marginTop: scale(-8),
    marginBottom: scale(-5),
    marginLeft: scale(20),
    fontSize: verticalScale(13),
  },
});
export default Error;
