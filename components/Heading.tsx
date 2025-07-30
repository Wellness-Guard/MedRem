import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {PRIMARY_COLOR} from '../constants/colors';

type HeadingProps = {
  text: string;
  styles?: Object;
};
const Heading = ({text, styles}: HeadingProps) => {
  return <Text style={{...style.title, ...styles}}>{text}</Text>;
};
const style = StyleSheet.create({
  title: {
    fontSize: verticalScale(24),
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Heading;
