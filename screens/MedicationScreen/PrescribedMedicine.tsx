import React, {useState} from 'react';
import Layout from '../../Layout/Layout';
import Back from '../../components/Back';
import {useNavigation} from '@react-navigation/native';
import Spinner from '../../components/Spinner';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import Heading from '../../components/Heading';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import Paragraph from '../../components/Paragraph';
import Tile from '../../components/Tile';
import AddMedicineSVG from '../../assets/svgImages/add-medicine.svg';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import BottomModal from '../../components/BottomModal';
import {useToggle} from '../../hooks/useToggle';
import {Dose, StackParams, TabParams} from '../../global/types';
import {Text, ListRenderItemInfo} from 'react-native';
import DoseTile from '../../components/DoseTile';
import Button from '../../components/Button';
import {LIGHT_BLUE_COLOR} from '../../constants/colors';
import {updateMedication} from '../../store/thunkActions/medicationActions';
import Alert from '../../components/Alert';
import {flushMediction} from '../../store/features/medicationSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
const PrescribedMedicine = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const _navigation = useNavigation<BottomTabNavigationProp<TabParams>>();

  const [visible, toggle] = useToggle();
  const {
    name,
    disease,
    days,
    _id,
    loading: _loading,
    success,
  } = useSelector((state: RootState) => state.medication);
  const {loading, medicines} = useSelector(
    (state: RootState) => state.medicine,
  );
  const [doses, setDoses] = useState<Dose[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const pushDose = (
    quantity: any,
    medicine_type: {[x: string]: any},
    selected_medicine: {[x: string]: any},
    routine: string[],
  ) => {
    const dose: Dose = {
      quantity: quantity as number,
      medicine_name: selected_medicine.name,
      medicine_type: medicine_type.name,
      routine: routine,
    };
    setDoses([...doses, dose]);
  };

  const startMedication = async () => {
    console.log('called');
    if (doses.length > 0) {
      console.log('dispatched');
      await dispatch(updateMedication({status: 'Started', doses, _id}));
    }
  };

  const flushCurrentMedication = () => {
    console.log('Please flush current medication and navigate to home screen');
    dispatch(flushMediction());

    _navigation.navigate('Home');
  };

  return (
    <Layout>
      {!success.length && <Back back={() => navigation.goBack()} />}

      <SafeAreaView style={styles.screen}>
        {loading || _loading ? (
          <Spinner />
        ) : (
          <>
            {success.length > 0 ? (
              <Alert click={flushCurrentMedication} style={styles.alert} />
            ) : (
              <>
                <Heading text={name as string} />
                <Paragraph
                  style={styles.description}
                  text={`Medication Reminder for treatment of ${disease} Disease for ${days} Days`}
                />
                {doses.length > 0 ? (
                  <>
                    <View style={styles.doseList}>
                      <FlatList
                        data={doses}
                        renderItem={({item}: ListRenderItemInfo<Dose>) => (
                          <DoseTile
                            key={item.medicine_name}
                            type={item.medicine_type}
                            quantity={item.quantity}
                            medicine_name={item.medicine_name}
                            routine={item.routine}
                            style={styles.doseItem}
                          />
                        )}
                        keyExtractor={item => item.medicine_name}
                      />
                    </View>

                    <TouchableOpacity onPress={toggle}>
                      <Text style={styles.addMore}>Add More</Text>
                    </TouchableOpacity>
                    <Button
                      title="Start Medication Reminder"
                      onPress={startMedication}
                      isLoading={false}
                    />
                  </>
                ) : (
                  <TouchableOpacity onPress={toggle}>
                    <Tile
                      styles={styles.tile}
                      title="Add Medicine"
                      svgImage={<AddMedicineSVG />}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </>
        )}
        <BottomModal
          medicines={medicines as []}
          isVisible={visible}
          onBackDropPress={() => toggle()}
          addDose={pushDose}
        />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    width: '90%',
    textAlign: 'center',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    lineHeight: verticalScale(22),
  },
  tile: {
    marginTop: '50%',
  },
  doseList: {
    height: '65%',
  },
  addMore: {
    color: LIGHT_BLUE_COLOR,
    fontFamily: 'Poppins-SemiBold',
    fontSize: verticalScale(12),
  },
  doseItem: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
  },
  alert: {
    marginTop: '50%',
  },
});

export default PrescribedMedicine;
