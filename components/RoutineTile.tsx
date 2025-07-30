import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  BACKGROUND_COLOR,
  DIM_GREY_COLOR,
  LIGHT_BLUE_COLOR,
  WHITE_COLOR,
  YELLOW,
} from '../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import {faCloudSun} from '@fortawesome/free-solid-svg-icons';
import {Routine} from '../global/types';

type RoutineTileProps = {
  toggle: (type: string) => void;
  active: boolean;
  type: Routine;
};

const renderIcon = (type: Routine) => {
  switch (type) {
    case 'Morning':
      return <FontAwesomeIcon icon={faSun} size={scale(40)} color={YELLOW} />;
    case 'Afternoon':
      return (
        <FontAwesomeIcon
          icon={faCloudSun}
          size={scale(40)}
          color={DIM_GREY_COLOR}
        />
      );
    case 'Evening':
      return (
        <FontAwesomeIcon
          icon={faMoon}
          size={scale(40)}
          color={DIM_GREY_COLOR}
        />
      );
  }
};
const RoutineTile = ({toggle, active, type}: RoutineTileProps) => {
  return (
    <Pressable
      style={{
        ...styles.tile,
        backgroundColor: active ? LIGHT_BLUE_COLOR : WHITE_COLOR,
      }}
      onPress={() => toggle(type)}>
      <View style={styles.content}>
        {renderIcon(type)}
        <Text
          style={{
            ...styles.text,
            color: active ? WHITE_COLOR : LIGHT_BLUE_COLOR,
          }}>
          {type}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: scale(80),
    height: verticalScale(70),
    borderWidth: 2,
    borderRadius: 15,
    borderColor: LIGHT_BLUE_COLOR,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: scale(15),
    paddingRight: scale(15),
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: scale(10),
    fontWeight: 'bold',
    lineHeight: verticalScale(15),
  },
});

export default RoutineTile;
