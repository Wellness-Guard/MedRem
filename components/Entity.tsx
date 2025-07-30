import React from 'react';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {View, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  GREY,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

type EntityProps = {
  title: string;
  icon: IconDefinition;
};
const Entity = ({icon, title}: EntityProps) => {
  return (
    <View style={styles.tile}>
      <View style={styles.row}>
        <FontAwesomeIcon
          icon={icon}
          size={scale(20)}
          color={THEMED_BLUE_COLOR}
        />
        <Text style={styles.text}>
          {title === 'Started' ? 'Active' : title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: scale(150),
    height: verticalScale(56),
    padding: scale(10),
    borderRadius: scale(15),
    borderColor: GREY,
    backgroundColor: WHITE_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  text: {
    fontSize: verticalScale(18),
    color: PRIMARY_COLOR,
    fontFamily: 'PoppinsRegular',
    marginTop: verticalScale(-2),
    marginLeft: scale(12),
  },
});

export default Entity;
