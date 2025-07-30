import React, {useLayoutEffect, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import Layout from '../../Layout/Layout';
import {verticalScale} from 'react-native-size-matters';
import MedicationTile from './MedicationTile';
import BottomOption from '../../components/BottomOption';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import {Medication, OptionArray, StackParams} from '../../global/types';
import {useToggle} from '../../hooks/useToggle';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import Spinner from '../../components/Spinner';
import {fetchUserMedications} from '../../store/thunkActions/medicationHistoryAction';
import {LIGHT_GREY} from '../../constants/colors';

const History = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [visible, toggle] = useToggle();
  const dispatch = useDispatch<AppDispatch>();
  const medication_id = useRef<string>();
  const {medications, loading} = useSelector(
    (state: RootState) => state.medicationHistory,
  );

  useLayoutEffect(() => {
    console.log('fetch usermedications');
    dispatch(fetchUserMedications(true));
  }, [dispatch]);

  const toggleOption = (_id: string) => {
    console.log('_id', _id);
    medication_id.current = _id;
    toggle();
  };
  const medicationDetail = () => {
    console.log('Medication Detail');
    toggle();
    navigation.navigate('MedicationDetail', {
      medication_id: medication_id.current!,
    });
  };
  const options: OptionArray = [
    {
      title: 'View Details',
      icon: faReceipt,
      action: medicationDetail,
    },
  ];

  return (
    <Layout>
      <SafeAreaView style={styles.safeAreaFrame}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {medications && medications.length > 0 ? (
              <>
                <FlatList
                  data={medications}
                  renderItem={({item}: ListRenderItemInfo<Medication>) => (
                    <MedicationTile
                      key={item._id}
                      _id={item._id!}
                      days={item.days!}
                      name={item.name!}
                      action={toggleOption!}
                      status={item.status!}
                      start_date={item.start_date!}
                    />
                  )}
                  keyExtractor={item => item._id as string}
                />

                <BottomOption
                  isVisible={visible}
                  options={options}
                  onBackDropPress={toggle}
                />
              </>
            ) : (
              <Text style={styles.noContent}>No History</Text>
            )}
          </>
        )}
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  safeAreaFrame: {
    marginTop: verticalScale(60),
    flexDirection: 'column',
    alignItems: 'center',
  },

  noContent: {
    color: LIGHT_GREY,
    textAlign: 'center',
    fontSize: verticalScale(14),
    marginTop: '90%',
  },
});

export default History;
