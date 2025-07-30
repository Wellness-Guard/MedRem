import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import {
  LIGHT_BLUE_COLOR,
  PINK_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMars, faVenus} from '@fortawesome/free-solid-svg-icons';

type GenderProp = {
  type: 'male' | 'female';
  active: Boolean;
  toggle: (gender: string) => void;
};
const Gender = ({type, active, toggle}: GenderProp) => {
  if (type === 'male') {
    return (
      <Pressable
        onPress={() => toggle(type)}
        style={{
          ...styles.container,
          ...{backgroundColor: active ? THEMED_BLUE_COLOR : WHITE_COLOR},
          borderColor: THEMED_BLUE_COLOR,
        }}>
        <View style={styles.row}>
          <Text
            style={{
              ...styles.text,
              ...{color: active ? WHITE_COLOR : THEMED_BLUE_COLOR},
            }}>
            Male
          </Text>
          <FontAwesomeIcon
            size={scale(31)}
            icon={faMars}
            color={active ? WHITE_COLOR : THEMED_BLUE_COLOR}
          />
        </View>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        onPress={() => toggle(type)}
        style={{
          ...styles.container,
          ...{backgroundColor: active ? PINK_COLOR : WHITE_COLOR},
          ...{borderColor: PINK_COLOR},
        }}>
        <View style={styles.row}>
          <Text
            style={{
              ...styles.text,
              ...{color: active ? WHITE_COLOR : PINK_COLOR},
            }}>
            Female
          </Text>
          <FontAwesomeIcon
            size={scale(31)}
            icon={faVenus}
            color={active ? WHITE_COLOR : PINK_COLOR}
          />
        </View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: scale(130),
    height: verticalScale(55),
    borderRadius: scale(12),
    backgroundColor: WHITE_COLOR,
    padding: scale(16),
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    color: LIGHT_BLUE_COLOR,
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Gender;
