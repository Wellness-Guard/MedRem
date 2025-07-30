import {View, TextInput as Input, Pressable} from 'react-native';

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  SECONDARY_COLOR,
  WHITE_COLOR,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  GREY,
} from '../constants/colors';
import {scale} from 'react-native-size-matters';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {faEye} from '@fortawesome/free-solid-svg-icons';

type PasswordProps = {
  type: boolean;
  placeHolder: string;
  value: string;
  name: string;
  icon: boolean;
  toggle: () => void;
  onBlur?: any;
  changeValue: (value: string, name: string) => void;
};

const PasswordField = ({
  placeHolder,
  value,
  changeValue,
  name,
  type,
  toggle,
  icon,
  onBlur,
}: PasswordProps) => {
  return (
    <View>
      <Input
        style={style.field}
        placeholder={placeHolder}
        value={value}
        placeholderTextColor={SECONDARY_COLOR}
        cursorColor={PRIMARY_COLOR}
        onChangeText={newValue => changeValue(newValue, name)}
        secureTextEntry={type}
        onBlur={onBlur}
      />
      {icon === true ? (
        <Pressable style={style.icon} onPress={() => toggle()}>
          <FontAwesomeIcon
            style={style.iconColor}
            icon={faEyeSlash}
            size={scale(34)}
          />
        </Pressable>
      ) : (
        <Pressable style={style.icon} onPress={() => toggle()}>
          <FontAwesomeIcon
            style={style.iconColor}
            icon={faEye}
            size={scale(34)}
          />
        </Pressable>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: scale(10),
    top: scale(10),
  },
  iconColor: {
    color: THEMED_BLUE_COLOR,
  },
  field: {
    width: scale(318),
    height: scale(60),
    paddingTop: scale(16),
    paddingBottom: scale(17),
    paddingLeft: scale(18),
    borderRadius: 12,
    backgroundColor: WHITE_COLOR,
    color: PRIMARY_COLOR,
    fontSize: scale(18),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: GREY,
  },
});
export default PasswordField;
