import {View, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  SECONDARY_COLOR,
} from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Status from '../../components/Status';
import {
  faEllipsisVertical,
  faClock,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import moment from 'moment';

type MedicationProps = {
  _id: string;
  name: string;
  start_date: null | Date;
  status: string;
  days: number;
  action: (_id: string) => void;
};
const MedicationTile = ({
  _id,
  name,
  days,
  start_date,
  status,
  action,
}: MedicationProps) => {
  return (
    <View style={styles.medication_tile}>
      <View style={styles.container}>
        <View style={styles.row_one}>
          <Text style={styles.medication_name}>{name}</Text>

          <TouchableOpacity onPress={() => action(_id!)}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size={scale(25)}
              color={PRIMARY_COLOR}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row_two}>
          <View style={styles.tile_icon}>
            <FontAwesomeIcon
              icon={faClock}
              size={scale(20)}
              color={THEMED_BLUE_COLOR}
            />
            <Text style={styles.text}>{days + 'days'}</Text>
          </View>
          <View style={styles.tile_icon}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              size={scale(20)}
              color={THEMED_BLUE_COLOR}
            />
            <Text style={styles.text}>
              {moment(start_date).utc().format('DD/MM/YYYY')}
            </Text>
            <Status type={status} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  medication_tile: {
    width: '95%',
    height: verticalScale(100),
    backgroundColor: WHITE_COLOR,
    shadowColor: PRIMARY_COLOR,
    borderRadius: scale(15),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'center',
  },
  container: {
    paddingLeft: scale(16),
    paddingTop: verticalScale(18),
    paddingRight: scale(16),
    paddingBottom: verticalScale(18),
  },
  medication_name: {
    fontSize: verticalScale(19),
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins-Medium',
  },
  row_one: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(45),
  },
  row_two: {
    flexDirection: 'row',
  },
  text: {
    fontSize: verticalScale(14),
    color: SECONDARY_COLOR,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: scale(5),
    marginRight: scale(2),
  },
  tile_icon: {
    flexDirection: 'row',
    width: 'auto',
    paddingRight: scale(20),
  },
});

export default MedicationTile;
