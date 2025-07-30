import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  GREY,
} from '../constants/colors';
import Heading from './Heading';
import {SkypeIndicator} from 'react-native-indicators';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircle,
  faCircleDot,
  faPlugCircleBolt,
  faVialCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

type OptionProps = {
  title: string;
  status: boolean;
  loading?: boolean;
  action: () => void;
  type?: string;
};

const Option = ({title, status, action, loading, type}: OptionProps) => {
  if (type === 'radio') {
    return (
      <View style={styles.settingTile}>
        <Heading styles={styles.heading} text={title} />
        <FontAwesomeIcon
          icon={faCircleDot}
          color={THEMED_BLUE_COLOR}
          size={scale(25)}
          style={styles.radio_icon}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.settingTile}>
        <Heading styles={styles.heading} text={title} />

        {loading ? (
          <SkypeIndicator color={THEMED_BLUE_COLOR} />
        ) : (
          <ToggleSwitch
            size="medium"
            onColor="green"
            isOn={status}
            onToggle={action}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  settingTile: {
    width: scale(300),
    height: verticalScale(65),
    backgroundColor: WHITE_COLOR,
    shadowColor: PRIMARY_COLOR,
    borderRadius: scale(15),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'row',
    marginTop: verticalScale(7),
    marginBottom: verticalScale(7),
    borderWidth: 1,
    borderColor: GREY,
  },
  icon: {
    marginTop: verticalScale(22),
    marginLeft: scale(10),
    marginRight: scale(10),
    color: THEMED_BLUE_COLOR,
  },
  heading: {
    marginTop: verticalScale(20),
    marginLeft: scale(20),
    width: scale(230),
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-Regular',
  },
  togglRight: {
    color: THEMED_BLUE_COLOR,
    marginTop: verticalScale(20),
    marginLeft: scale(5),
  },
  radio_icon: {
    marginTop: verticalScale(20),
  },
});
export default Option;
