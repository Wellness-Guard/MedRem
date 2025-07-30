import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  GREEN,
  GREY,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
  YELLOW,
} from '../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';

type CalenderTileProp = {
  status?: string;
  day: string;
  date: number;
};

const CalenderTile = ({status, day, date}: CalenderTileProp) => {
  return (
    <View style={styles.calender_tile}>
      <View>
        <FontAwesomeIcon
          style={styles.color}
          icon={faCircle}
          color={status === 'Taken' ? GREEN : YELLOW}
          size={scale(15)}
        />
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calender_tile: {
    width: scale(60),
    height: verticalScale(130),
    backgroundColor: WHITE_COLOR,
    borderWidth: 1,
    borderColor: GREY,
    borderTopLeftRadius: verticalScale(30),
    borderTopRightRadius: verticalScale(30),
    borderBottomLeftRadius: verticalScale(30),
    borderBottomRightRadius: verticalScale(30),
    shadowColor: PRIMARY_COLOR,
    borderRadius: scale(15),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    paddingLeft: scale(8),
    paddingRight: scale(8),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    margin: scale(10),
  },
  color: {
    alignSelf: 'center',
    marginTop: verticalScale(13),
    marginBottom: verticalScale(25),
  },
  day: {
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-Medium',
    color: PRIMARY_COLOR,
    textAlign: 'center',
  },
  date: {
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-Medium',
    color: THEMED_BLUE_COLOR,
    textAlign: 'center',
  },
});

export default CalenderTile;
