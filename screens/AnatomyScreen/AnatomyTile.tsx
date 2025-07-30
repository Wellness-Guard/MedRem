import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  GREY,
  THEMED_BLUE_COLOR,
} from '../../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

type AnatomyTileProps = {
  name: string;
  svgIcon: React.ReactNode;
};

const AnatomyTile = ({name, svgIcon}: AnatomyTileProps) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.heading}>{name}</Text>
      <View style={styles.anatomy_icon}>{svgIcon}</View>
      <TouchableOpacity
        style={styles.chevronRight_}
        onPress={() => console.log(name)}>
        <FontAwesomeIcon
          icon={faChevronRight}
          color={THEMED_BLUE_COLOR}
          size={verticalScale(20)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AnatomyTile;

const styles = StyleSheet.create({
  tile: {
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
    padding: scale(20),
  },
  heading: {
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-Regular',
    color: PRIMARY_COLOR,
    width: '70%',
  },
  anatomy_icon: {
    marginTop: verticalScale(-10),
    width: '20%',
  },
  chevronRight_: {
    color: THEMED_BLUE_COLOR,
    marginTop: verticalScale(2),
    marginLeft: scale(10),
  },
});
