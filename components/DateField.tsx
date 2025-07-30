import {View, TextInput as Input, Pressable} from 'react-native';

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  SECONDARY_COLOR,
  WHITE_COLOR,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  LIGHT_BLUE_COLOR,
  GREY,
} from '../constants/colors';
import DatePicker from 'react-native-date-picker';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {convertToFormatedDate} from '../utils';

type DateFieldProps = {
  placeHolder: string;
  value: Date | undefined | null;
  name: string;
  changeValue: (value: Date, name: string) => void;
  styles?: object;
};

const DateField = ({
  placeHolder,
  value,
  changeValue,
  name,
  styles,
}: DateFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Pressable style={{...styles}} onPress={() => setOpen(!open)}>
        <Input
          editable={false}
          style={style.field}
          placeholder={placeHolder}
          placeholderTextColor={SECONDARY_COLOR}
          value={convertToFormatedDate(value)}
        />
        <Pressable style={style.icon} onPress={() => setOpen(!open)}>
          <FontAwesomeIcon
            style={style.iconColor}
            icon={faCalendarDays}
            size={scale(34)}
          />
        </Pressable>
      </Pressable>
      <DatePicker
        mode="date"
        theme="light"
        textColor={LIGHT_BLUE_COLOR}
        modal
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          changeValue(date, name);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1,
    elevation: 1,
    borderWidth: 1,
    borderColor: GREY,
  },
});
export default DateField;
