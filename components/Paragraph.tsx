import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {SECONDARY_COLOR} from '../constants/colors';

type ParagraphProps = {
  text: string | number;
  style?: Object;
  onPress?: () => void;
};
const Paragraph = ({text, style, onPress}: ParagraphProps) => {
  return (
    <Text onPress={onPress} style={{...styles.title, ...style}}>
      {text}
    </Text>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-Regular',
    color: SECONDARY_COLOR,
  },
});

export default Paragraph;
