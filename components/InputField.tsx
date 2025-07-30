import {TextInput as Input} from 'react-native';

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  SECONDARY_COLOR,
  WHITE_COLOR,
  PRIMARY_COLOR,
  GREY,
  MILD_GREY,
} from '../constants/colors';
import {scale} from 'react-native-size-matters';

type InputProps = {
  type?: string;
  placeHolder?: string;
  value: any;
  name: string;
  icon?: string;
  toggle?: (name: string) => void;
  changeValue: (value: string, name: string) => void;
  onBlur?: any;
  editable?: boolean;
  styles?: object;
};

const InputField = ({
  type,
  placeHolder,
  value,
  changeValue,
  name,
  onBlur,
  styles,
  editable = true,
}: InputProps) => {
  return (
    <Input
      style={{
        ...styles,
        ...style.field,
        backgroundColor: editable ? WHITE_COLOR : GREY,
        color: editable ? PRIMARY_COLOR : MILD_GREY,
      }}
      placeholder={placeHolder}
      value={value?.toString()}
      placeholderTextColor={SECONDARY_COLOR}
      cursorColor={PRIMARY_COLOR}
      onChangeText={newValue => changeValue(newValue, name)}
      secureTextEntry={type === 'password' ? true : false}
      onBlur={onBlur}
      editable={editable}
      keyboardType={type === 'number' ? 'numeric' : 'default'}
    />
  );
};

const style = StyleSheet.create({
  field: {
    width: scale(318),
    height: scale(60),
    paddingTop: scale(16),
    paddingBottom: scale(17),
    paddingLeft: scale(18),
    borderRadius: 12,
    color: PRIMARY_COLOR,
    fontSize: scale(18),
    fontFamily: 'PoppinsRegular',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: GREY,
  },
});
export default InputField;
