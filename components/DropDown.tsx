import {View} from 'react-native';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  WHITE_COLOR,
  THEMED_BLUE_COLOR,
  LIGHT_BLUE_COLOR,
  MILD_GREY,
  GREY,
} from '../constants/colors';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Data} from '../global/interfaces';
import {PRIMARY_COLOR} from '../constants/colors';
import {Dropdown} from 'react-native-element-dropdown';

type DropDownProps = {
  placeHolder: string;
  name: string;
  data: Data[];
  changeValue: (value: Data, name: string) => void;
  value: string;
  style?: {[key: string]: any};
};

const DropDown = ({
  placeHolder,
  name,
  data,
  changeValue,
  value,
  style,
}: DropDownProps) => {
  // const [isFocus, setIsFocus] = useState(false);
  const focus = useRef<boolean>(false);

  return (
    <View>
      <Dropdown
        style={[
          styles.field,
          style,
          focus.current && {borderColor: LIGHT_BLUE_COLOR},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        autoScroll={true}
        iconColor={THEMED_BLUE_COLOR}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="name"
        valueField="name"
        placeholder={!focus.current ? placeHolder : '...'}
        value={value}
        dropdownPosition="auto"
        containerStyle={styles.dropDownContainer}
        itemContainerStyle={styles.dropDownContainerItem}
        itemTextStyle={styles.dropDownItemText}
        onFocus={() => (focus.current = true)}
        onBlur={() => (focus.current = false)}
        onChange={item => {
          changeValue(item, name);
          focus.current = false;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: scale(10),
  },
  iconColor: {
    color: THEMED_BLUE_COLOR,
  },
  field: {
    width: scale(318),
    height: verticalScale(60),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(17),
    paddingLeft: moderateScale(18),
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: WHITE_COLOR,
    borderColor: GREY,
    fontSize: scale(18),
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: verticalScale(16),
    fontWeight: '400',
    color: MILD_GREY,
  },
  selectedTextStyle: {
    fontSize: verticalScale(16),
    color: LIGHT_BLUE_COLOR,
  },
  iconStyle: {
    width: scale(35),
    height: verticalScale(40),
    marginRight: scale(10),
  },
  dropDownContainerItem: {
    borderBottomWidth: 1,
    width: '95%',
    borderColor: '#DDCFCF',
    marginLeft: scale(10),
    marginRight: scale(10),
  },
  dropDownItemText: {
    fontWeight: '400',
    color: MILD_GREY,
    fontSize: verticalScale(16),
    lineHeight: 21,
    maxWidth: scale(283),
    marginLeft: scale(-13),
    marginRight: scale(-13),
  },
  dropDownContainer: {
    height: verticalScale(315),
    borderRadius: scale(10),
    borderColor: GREY,
    marginTop: verticalScale(5),
    maxHeight: scale(280),
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },
});
export default DropDown;
