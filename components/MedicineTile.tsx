import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSpoon,
  faTablets,
  faCapsules,
} from '@fortawesome/free-solid-svg-icons';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  GREY,
  LIGHT_GREY,
} from '../constants/colors';

type MedicineTypeProps = {
  medicine_name: string;
  quantity: number;
  medicine_type: string;
  style?: object;
};
const renderMedicineIcon = (medicine_type?: string) => {
  if (medicine_type === 'Tablet') {
    return (
      <FontAwesomeIcon icon={faTablets} color="#BB4242" size={scale(35)} />
    );
  } else if (medicine_type === 'Capsule') {
    return (
      <FontAwesomeIcon icon={faCapsules} color="#419EF3" size={scale(35)} />
    );
  } else if (medicine_type === 'Liquid') {
    return <FontAwesomeIcon icon={faSpoon} color="#20b2aa" size={scale(35)} />;
  }
};

const MedicineTile = ({
  medicine_name,
  quantity,
  medicine_type,
  style,
}: MedicineTypeProps) => {
  return (
    <View style={[styles.medicine_tile, style]}>
      <View style={styles.column}>
        <Text style={styles.medicine_name}>{medicine_name}</Text>
        <View style={styles.row}>
          <Text style={styles.medicine_quantity}>
            {quantity +
              `${
                medicine_type === 'Liquid'
                  ? ' Table Spoon'
                  : ' ' + medicine_type
              }`}
          </Text>
        </View>
      </View>
      <View style={styles.med_icon}>{renderMedicineIcon(medicine_type)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  medicine_tile: {
    width: '100%',
    minHeight: verticalScale(70),
    height: 'auto',
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
    paddingLeft: scale(18),
    paddingRight: scale(18),
    backgroundColor: WHITE_COLOR,
    shadowColor: PRIMARY_COLOR,
    borderRadius: scale(15),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: GREY,
    padding: scale(10),
    marginTop: verticalScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  medicine_name: {
    fontSize: verticalScale(20),
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins-SemiBold',
  },
  medicine_quantity: {
    fontSize: verticalScale(12),
    color: LIGHT_GREY,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  med_icon: {
    width: scale(50),
    height: scale(50),
    backgroundColor: WHITE_COLOR,
    borderRadius: scale(10),
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(7),
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    borderWidth: 0.5,
    borderColor: GREY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default MedicineTile;
