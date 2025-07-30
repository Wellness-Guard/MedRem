import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {PRIMARY_COLOR} from '../constants/colors';
type DescriptionProps = {
  text: String;
  style?: object;
};
const Description = ({text, style}: DescriptionProps) => {
  return <Text style={{...styles.description, ...style}}>{text}</Text>;
};

const styles = StyleSheet.create({
  description: {
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-Regular',
    color: PRIMARY_COLOR,
  },
});
export default Description;
