import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import {
  GREY,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSun,
  faTablets,
  faCloudSun,
  faMoon,
  faClock,
  faCapsules,
  faSpoon,
} from '@fortawesome/free-solid-svg-icons';
import Paragraph from './Paragraph';

type DoseProps = {
  type: string;
  quantity: number;
  medicine_name: string;
  routine: string[];
  style?: {[key: string]: any};
};

const renderMecineIcon = (medicine_type: string) => {
  if (medicine_type === 'Tablet') {
    return (
      <FontAwesomeIcon icon={faTablets} size={scale(30)} color="#BB4242" />
    );
  } else if (medicine_type === 'Capsule') {
    return (
      <FontAwesomeIcon icon={faCapsules} size={scale(30)} color="#419EF3" />
    );
  } else {
    return <FontAwesomeIcon icon={faSpoon} size={scale(30)} color="#20b2aa" />;
  }
};

const renderRoutine = (routine: string) => {
  if (routine === 'Morning') {
    return (
      <FontAwesomeIcon
        key={'Morning'}
        icon={faSun}
        size={scale(25)}
        color="#FDB813"
      />
    );
  } else if (routine === 'Afternoon') {
    return (
      <FontAwesomeIcon
        key={'Afternoon'}
        icon={faCloudSun}
        size={scale(30)}
        color="#18607E"
      />
    );
  } else if (routine === 'Evening') {
    return (
      <FontAwesomeIcon
        key={'Evening'}
        icon={faMoon}
        size={scale(25)}
        color={PRIMARY_COLOR}
      />
    );
  }
};

const DoseTile = ({
  type,
  quantity,
  medicine_name,
  routine,
  style,
}: DoseProps) => {
  return (
    <View style={[styles.tile, style]}>
      <View style={styles.row_one}>
        <Text style={styles.medicine_name}>{medicine_name}</Text>
        <View style={styles.icon_count}>
          <Paragraph style={styles.count} text={quantity} />
          {renderMecineIcon(type)}
        </View>
      </View>
      <View style={styles.row_two}>
        <View style={styles.routine}>
          {routine?.map(r => {
            return renderRoutine(r);
          })}
        </View>
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon
            icon={faClock}
            size={scale(20)}
            color={THEMED_BLUE_COLOR}
            style={styles.clock}
          />
          <Paragraph
            text={`${routine?.length} times a day`}
            style={styles.instance}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    height: verticalScale(90),
    width: scale(300),
    backgroundColor: WHITE_COLOR,
    borderRadius: scale(15),
    paddingLeft: scale(15),
    paddingRight: scale(15),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: GREY,
  },
  row_one: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(50),
  },
  row_two: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(40),
  },
  medicine_name: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  count: {
    color: PRIMARY_COLOR,
    fontSize: verticalScale(18),
    paddingRight: scale(10),
  },
  clock: {
    margin: verticalScale(3),
  },
  instance: {
    color: PRIMARY_COLOR,
    fontSize: verticalScale(18),
  },
  icon_count: {
    flexDirection: 'row',
    fontSize: verticalScale(22),
  },
  routine: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-around',
  },
});
export default DoseTile;
