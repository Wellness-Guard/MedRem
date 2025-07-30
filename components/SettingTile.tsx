import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale, verticalScale} from 'react-native-size-matters';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  GREY,
} from '../constants/colors';
import Heading from './Heading';
type SettngTileProps = {
  title: string;
  icon: IconDefinition;
  route: string;
  navigate: (screen: string) => void;
};

const SettingTile = ({title, icon, navigate, route}: SettngTileProps) => {
  return (
    <View style={styles.settingTile}>
      <FontAwesomeIcon icon={icon} size={scale(25)} style={styles.icon} />
      <Heading styles={styles.heading} text={title} />
      <TouchableOpacity onPress={() => navigate(route)}>
        <FontAwesomeIcon
          style={styles.chevronRight_}
          icon={faChevronRight}
          size={scale(20)}
        />
      </TouchableOpacity>
    </View>
  );
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
    marginLeft: scale(10),
    width: scale(200),
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-Regular',
  },
  chevronRight_: {
    color: THEMED_BLUE_COLOR,
    marginTop: verticalScale(25),
    marginLeft: scale(10),
  },
});
export default SettingTile;
