import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ListRenderItemInfo,
  FlatList,
  Dimensions,
} from 'react-native';
import Heading from '../../components/Heading';
import Back from '../../components/Back';
import Layout from '../../Layout/Layout';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParams} from '../../global/types';
import Entity from '../../components/Entity';
import Plan from '../../components/Plan';
import {
  faCalendarDays,
  faClock,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {
  fetchMedicationDetail,
  unselectMedication,
} from '../../store/features/medicationHistorySlice';
import moment from 'moment';
import {
  DIM_GREY_COLOR,
  LIGHT_GREY,
  THEMED_BLUE_COLOR,
} from '../../constants/colors';
import MedicationTrack from '../../components/MedicationTrack';
import {ScrollView} from 'react-native-gesture-handler';

type MedicationDetailProps = StackScreenProps<StackParams, 'MedicationDetail'>;

const MedicationDetail = ({navigation, route}: MedicationDetailProps) => {
  const [currentIndex, setIndex] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const {selectedMedication} = useSelector(
    (state: RootState) => state.medicationHistory,
  );
  useEffect(() => {
    console.log('call on re render or state change');

    console.log('call on first render');
    dispatch(
      fetchMedicationDetail({medication_id: route.params.medication_id}),
    );

    return () => {
      dispatch(unselectMedication());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Back back={() => navigation.goBack()} />
      <ScrollView>
        <SafeAreaView style={styles.safeAreaFrame}>
          <Heading styles={styles.heading} text={selectedMedication.name!} />
          <View style={styles.row_content}>
            <Entity
              title={moment(selectedMedication.start_date)
                .utc()
                .format('DD/MM/YYYY')}
              icon={faCalendarDays}
            />
            <Entity
              title={moment(selectedMedication.end_date)
                .utc()
                .format('DD/MM/YYYY')}
              icon={faCalendarDays}
            />
          </View>
          <View style={styles.row_content}>
            <Entity title={selectedMedication.days + ' days'} icon={faClock} />
            <Entity title={selectedMedication.status!} icon={faSquareFull} />
          </View>
          <Heading text="Medication Routine" styles={styles.routine_title} />

          {selectedMedication.doses && selectedMedication.doses.length > 0 ? (
            <>
              <FlatList
                data={selectedMedication.doses}
                horizontal
                pagingEnabled
                onScroll={e => {
                  setIndex(
                    Math.round(
                      e.nativeEvent.contentOffset.x /
                        Dimensions.get('window').width,
                    ),
                  );
                }}
                showsHorizontalScrollIndicator={true}
                renderItem={({item}: ListRenderItemInfo<any>) =>
                  item.plans.length > 0 ? (
                    <Plan key={item._id} {...item} />
                  ) : null
                }
              />
              <View style={styles.pagination}>
                {selectedMedication.doses.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.bullet,
                      {
                        backgroundColor:
                          currentIndex === index
                            ? THEMED_BLUE_COLOR
                            : DIM_GREY_COLOR,
                      },
                    ]}
                  />
                ))}
              </View>
              <MedicationTrack
                style={styles.medication_track}
                medication_id={route.params.medication_id}
              />
            </>
          ) : (
            <Text style={styles.noContent}> No Medication Routine</Text>
          )}
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  safeAreaFrame: {
    alignItems: 'center',
    marginTop: verticalScale(30),
    flexDirection: 'column',
  },
  heading: {
    marginBottom: verticalScale(20),
  },
  row_content: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  routine_title: {
    fontSize: verticalScale(20),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  pagination: {
    flexDirection: 'row',
    width: 'auto',
  },
  bullet: {
    marginTop: verticalScale(15),
    marginLeft: scale(5),
    width: 10,
    height: 10,

    borderRadius: 8,
  },
  medication_track: {
    marginTop: verticalScale(35),
    marginBottom: verticalScale(35),
  },
  noContent: {
    color: LIGHT_GREY,
    textAlign: 'center',
    fontSize: verticalScale(14),
    marginTop: '100%',
  },
});

export default MedicationDetail;
