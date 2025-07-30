import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {GREY, PRIMARY_COLOR, WHITE_COLOR} from '../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Description from './Description';

type AlertProps = {
  style?: {[key: string]: any};
  click: () => void;
};
const Alert = ({style, click}: AlertProps) => {
  return (
    <View style={[styles.alert_box, style]}>
      <FontAwesomeIcon
        size={scale(90)}
        icon={faCheckCircle}
        style={styles.checkCircle}
      />
      <Description
        style={styles.text}
        text="Medication Reminder Started Successfully "
      />
      <TouchableOpacity onPress={() => click()}>
        <Text style={styles.button}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alert_box: {
    height: verticalScale(250),
    width: scale(280),
    backgroundColor: WHITE_COLOR,
    borderRadius: scale(15),
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: GREY,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    paddingLeft: verticalScale(10),
  },
  checkCircle: {
    color: 'green',
  },
  text: {
    textAlign: 'center',
    lineHeight: verticalScale(25),
  },
  button: {
    borderWidth: 1,
    width: scale(90),
    paddingTop: verticalScale(9),
    paddingBottom: verticalScale(9),
    paddingLeft: scale(10),
    paddingRight: scale(9),
    color: WHITE_COLOR,
    fontSize: scale(12),
    backgroundColor: 'green',
    borderRadius: scale(15),
    textAlign: 'center',
    borderColor: 'transparent',
  },
});

export default Alert;
