import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  GREY,
  LIGHT_GREY,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ToggleProps = {
  optionOne: string;
  optionTwo: string;
  active: string;
  toggle: () => void;
  style?: {[key: string]: any};
};

const Toggle = ({optionOne, optionTwo, toggle, active, style}: ToggleProps) => {
  return (
    <TouchableOpacity style={[styles.tile, style]} onPress={toggle}>
      <View
        style={[
          styles.left_bullet,
          active === optionOne ? styles.active : styles.inactive,
        ]}>
        <Text
          style={[
            styles.text,
            active === optionOne ? styles.active_text : styles.inactive_text,
          ]}>
          {optionOne}
        </Text>
      </View>
      <View
        style={[
          styles.right_bullet,
          active === optionTwo ? styles.active : styles.inactive,
        ]}>
        <Text
          style={[
            styles.text_two,
            active === optionTwo ? styles.active_text : styles.inactive_text,
          ]}>
          {optionTwo}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: scale(120),
    height: verticalScale(30),
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 30,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },
  left_bullet: {
    width: scale(60),
    textAlign: 'center',
    borderRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: GREY,
  },
  active: {
    backgroundColor: THEMED_BLUE_COLOR,
  },
  inactive: {
    backgroundColor: WHITE_COLOR,
  },
  active_text: {
    color: WHITE_COLOR,
  },
  inactive_text: {
    color: LIGHT_GREY,
  },
  text: {
    fontSize: verticalScale(15),
    fontFamily: 'Poppins-Regular',
    marginLeft: scale(10),
    padding: 5,
  },
  right_bullet: {
    width: scale(60),
    textAlign: 'center',
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: scale(2),
    borderColor: GREY,
  },
  text_two: {
    fontSize: verticalScale(15),
    fontWeight: 'bold',
    marginLeft: scale(6),
    padding: 5,
  },
});

export default Toggle;
