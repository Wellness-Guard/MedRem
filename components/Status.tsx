import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  DIM_GREY_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
  YELLOW,
} from '../constants/colors';
// enum statusType {
//   Started = 'Started',
//   Finished = 'Completed',
//   Paused = 'Paused',
// }
type StatusProp = {
  type?: string;
};
const Status = ({type}: StatusProp) => {
  if (type === 'Started') {
    return (
      <View style={styles.status_tile}>
        <Text style={styles.text}>Active</Text>
      </View>
    );
  } else if (type === 'Completed') {
    return (
      <View style={[styles.status_tile, {backgroundColor: 'green'}]}>
        <Text style={styles.text}>Completed</Text>
      </View>
    );
  } else if (type === 'Paused') {
    return (
      <View style={[styles.status_tile, {backgroundColor: DIM_GREY_COLOR}]}>
        <Text style={styles.text}>Paused</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.status_tile, {backgroundColor: YELLOW}]}>
        <Text style={styles.text}>Created</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  status_tile: {
    width: scale(80),
    height: verticalScale(20),
    backgroundColor: THEMED_BLUE_COLOR,
    borderRadius: scale(15),
  },
  text: {
    paddingTop: verticalScale(1),
    color: WHITE_COLOR,
    fontSize: verticalScale(12),
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});

export default Status;
