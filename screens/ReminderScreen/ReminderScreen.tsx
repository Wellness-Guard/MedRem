import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Heading from '../../components/Heading';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParams} from '../../global/types';
// import Back from '../../components/Back';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../store';

import {fetchMedicationDetail} from '../../store/features/medicationHistorySlice';
import {View, StyleSheet, Text} from 'react-native';
import {
  GREY,
  PRIMARY_COLOR,
  SKY_BLUE_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../../constants/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import Paragraph from '../../components/Paragraph';
import MedicineTile from '../../components/MedicineTile';
import SwipeButton from 'rn-swipe-button';
import {getDaysString} from '../../utils';
import {Dose} from '../../global/types';
import {saveTrack} from '../../store/thunkActions/trackAction';
import Close from '../../components/Close';
import {resetTrack} from '../../store/features/trackSlice';
import {unselectMedication} from '../../store/features/medicationHistorySlice';
type ReminderProps = StackScreenProps<StackParams, 'ReminderScreen'>;

const renderDateTile = () => {
  const date = new Date(Date.now());

  return (
    <View style={styles.date_tile}>
      <Heading text={getDaysString()[date.getUTCDay()]} />
      <Paragraph text={date.getUTCDate()} />
    </View>
  );
};

const ReminderScreen = ({navigation, route}: ReminderProps) => {
  const {medication_id, routine} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const {selectedMedication} = useSelector(
    (state: RootState) => state.medicationHistory,
  );
  const {first_name} = useSelector((state: RootState) => state.auth);
  const {success} = useSelector((state: RootState) => state.track);
  const [medicineList, setMedicineList] = useState<Dose>();

  useEffect(() => {
    dispatch(fetchMedicationDetail({medication_id}));
    if (selectedMedication) {
      setMedicineList(
        selectedMedication.doses?.find(dose => dose.routine === routine),
      );
    }

    return () => {
      dispatch(resetTrack());
      dispatch(unselectMedication());
    };
  }, [dispatch, medication_id, routine, selectedMedication]);

  const updateTrack = () => {
    dispatch(saveTrack({medication_id, routine}));
  };
  return (
    <SafeAreaView style={styles.reminderScreen}>
      <Close
        style={styles.close}
        close={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.screenLayout}>
        <View style={styles.info}>
          <View style={styles.left_info}>
            <Heading
              text={'Good ' + routine + ','}
              styles={{color: WHITE_COLOR}}
            />
            <Text style={styles.fName}>{first_name}</Text>
          </View>
          {renderDateTile()}
        </View>
        <Paragraph
          style={styles.description}
          text={`Hey, it’s time for the intake of the ${routine} dose for the ${selectedMedication?.disease} disease. Please take the medication listed below and remember to update your status afterward.`}
        />
        <View style={styles.doses}>
          {medicineList?.plans.length > 0 &&
            medicineList?.plans.map(
              ({medicine_name, quantity, medicine_type}: Dose, id: number) => (
                <MedicineTile
                  key={id}
                  style={styles.med_tile}
                  medicine_name={medicine_name}
                  medicine_type={medicine_type}
                  quantity={quantity}
                />
              ),
            )}
        </View>
        {success.length > 0 ? (
          <Text style={styles.success}>{success + ' 🍉'}</Text>
        ) : (
          <SwipeButton
            height={65}
            width={'auto'}
            railBackgroundColor={SKY_BLUE_COLOR}
            thumbIconBackgroundColor={WHITE_COLOR}
            railBorderColor={GREY}
            thumbIconBorderColor={GREY}
            railFillBackgroundColor={THEMED_BLUE_COLOR}
            title="Swipe to update status"
            titleStyles={styles.title_style}
            onSwipeSuccess={updateTrack}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  reminderScreen: {
    backgroundColor: THEMED_BLUE_COLOR,
    height: '100%',
  },
  screenLayout: {
    padding: '8%',
  },
  close: {
    marginLeft: '80%',
    position: 'absolute',
  },
  fName: {
    color: PRIMARY_COLOR,
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-SemiBold',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingBottom: '10%',
  },
  left_info: {
    flexDirection: 'column',
  },
  date_tile: {
    height: verticalScale(70),
    width: verticalScale(70),
    backgroundColor: WHITE_COLOR,
    borderRadius: scale(10),
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(7),
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    borderColor: GREY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },
  description: {
    paddingTop: '5%',
    color: PRIMARY_COLOR,
    paddingBottom: '5%',
  },
  doses: {
    marginTop: '5%',
    height: verticalScale(300),
  },
  med_tile: {
    marginTop: '2%',
    marginBottom: '2%',
  },
  title_style: {
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-Medium',
    paddingLeft: 60,
  },
  success: {
    textAlign: 'center',
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-Medium',
  },
});

export default ReminderScreen;
