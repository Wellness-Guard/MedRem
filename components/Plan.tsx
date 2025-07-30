import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCapsules,
  faCloudSun,
  faMoon,
  faSpoon,
  faSun,
  faTablets,
} from '@fortawesome/free-solid-svg-icons';
import {
  DARK_BLUE_COLOR,
  GREY,
  LIGHT_BLUE_COLOR,
  LIGHT_GREY,
  PRIMARY_COLOR,
  WHITE_COLOR,
  YELLOW,
} from '../constants/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import Heading from './Heading';
type PlanProps = {
  _id?: string;
  plans: []; // medicines
  routine: string;
  time: null | string | Date;
};

type MedicineTileProps = {
  medicine_name: string;
  quantity: number;
  medicine_type?: string;
};

const renderRoutineIcon = (routine: string) => {
  if (routine === 'Morning') {
    return <FontAwesomeIcon size={scale(60)} icon={faSun} color={YELLOW} />;
  } else if (routine === 'Afternoon') {
    return (
      <FontAwesomeIcon
        size={scale(60)}
        icon={faCloudSun}
        color={LIGHT_BLUE_COLOR}
      />
    );
  } else if (routine === 'Evening') {
    return (
      <FontAwesomeIcon size={scale(60)} icon={faMoon} color={DARK_BLUE_COLOR} />
    );
  }
};

const renderMedicineIcon = (medicine_type?: string) => {
  if (medicine_type === 'Tablet') {
    return (
      <FontAwesomeIcon icon={faTablets} color="#BB4242" size={scale(30)} />
    );
  } else if (medicine_type === 'Capsule') {
    return (
      <FontAwesomeIcon icon={faCapsules} color="#419EF3" size={scale(30)} />
    );
  } else if (medicine_type === 'Liquid') {
    return <FontAwesomeIcon icon={faSpoon} color="#20b2aa" size={scale(30)} />;
  }
};

const MedicineTile = ({
  medicine_name,
  quantity,
  medicine_type,
}: MedicineTileProps) => {
  console.log('Medicine Type', medicine_type);
  return (
    <View style={styles.medicine_tile}>
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
const Plan = ({plans, routine, time}: PlanProps) => {
  console.log('plans', plans);
  return (
    <View style={styles.plan_tile}>
      <View style={styles.left_column}>
        <Heading styles={styles.rotine_text} text={routine} />
        <Text style={styles.routine_time}>{'n/a'}</Text>
        <View style={styles.routine_icon}>{renderRoutineIcon(routine)}</View>
      </View>
      <View style={styles.right_column}>
        {plans &&
          plans.map(({medicine_name, quantity, _id, medicine_type}) => (
            <MedicineTile
              medicine_name={medicine_name}
              medicine_type={medicine_type}
              quantity={quantity}
              key={_id}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plan_tile: {
    minHeight: verticalScale(170),
    height: 'auto',
    width: scale(320),
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
    flexDirection: 'row',
    margin: scale(15),
  },
  left_column: {
    flexDirection: 'column',
    alignContent: 'center',
    width: scale(108),
  },
  rotine_text: {
    fontSize: verticalScale(22),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  routine_time: {
    marginTop: verticalScale(-5),
    color: LIGHT_GREY,
    textAlign: 'center',
  },
  routine_icon: {
    marginTop: verticalScale(15),
    width: scale(80),
    height: verticalScale(80),
    alignSelf: 'center',
    alignItems: 'center',
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
    paddingTop: verticalScale(10),
  },
  right_column: {
    flexDirection: 'column',
    paddingLeft: scale(20),
    alignContent: 'center',
  },
  medicine_tile: {
    width: scale(170),
    height: 'auto',
    minHeight: verticalScale(50),
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
    fontSize: verticalScale(16),
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins-Medium',
  },
  medicine_quantity: {
    fontSize: verticalScale(10),
    color: LIGHT_GREY,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  med_icon: {
    width: 50,
    height: 50,
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

export default Plan;
