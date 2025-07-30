import React, {useState, useRef} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Layout from '../../Layout/Layout';
import Back from '../../components/Back';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../components/Heading';
import {verticalScale} from 'react-native-size-matters';
import Paragraph from '../../components/Paragraph';
import DropDown from '../../components/DropDown';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Toggle from '../../components/Toggle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {updateDisease} from '../../store/features/diseaseSlice';
import Error from '../../components/Error';
import {postMedication} from '../../store/thunkActions/medicationActions';

import {fetchMedicine} from '../../store/thunkActions/medicineAction';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';

const PrescribedPlan = () => {
  const disease = useRef<string>('');
  const dates = useRef<{start_date: Date | null; end_date: Date | null}>({
    start_date: null,
    end_date: null,
  });
  const {diseases} = useSelector((state: RootState) => state.disease);
  const {loading} = useSelector((state: RootState) => state.medication);
  const dispatch = useDispatch<AppDispatch>();

  const days = useRef<any>(null);
  const [error, setError] = useState<boolean>(false);
  const [diseaseError, setDiseaseError] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [active, setActive] = useState<string>('Days');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeValue = (value: number | string, name: string) => {
    console.log(value);
    days.current = value as number;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDropDown = async (value: any, name: any) => {
    disease.current = value.name;
    dispatch(updateDisease(disease.current));
  };

  const toggleActive = () => {
    if (active === 'Days') {
      setActive('Weeks');
    } else {
      setActive('Days');
    }
  };

  const calculateStartEndDatesBasedOnDuration = () => {
    const start_date = new Date(Date.now());
    let end_date;
    if (active === 'Weeks') {
      end_date = new Date(Date.now() + days.current * 7 * 24 * 60 * 60 * 1000);
    } else {
      end_date = new Date(Date.now() + days.current * 24 * 60 * 60 * 1000);
    }
    return {start_date, end_date};
  };

  const submit = async () => {
    setError(false);
    setDiseaseError(false);
    if (!disease.current) {
      setDiseaseError(true);
    }
    if (!days.current || days.current === 0) {
      setError(true);
      return;
    }

    if (days.current > 0 && disease.current) {
      setError(false);
      setDiseaseError(false);
      dates.current = calculateStartEndDatesBasedOnDuration();
      try {
        await dispatch(
          postMedication({
            name: disease.current + ' Medication',
            disease: disease.current,
            days: active === 'Weeks' ? days.current * 7 : days.current,
            start_date: dates.current.start_date,
            end_date: dates.current.end_date,
          }),
        );
        console.log('Current Disease', disease.current);
        await dispatch(fetchMedicine(disease.current));

        navigation.navigate('PrescribedMedicine');
      } catch (err) {
        console.log((err as Error).message);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Layout>
        <Back back={() => navigation.goBack()} />
        <SafeAreaView style={styles.screen}>
          <Heading text="Prescribed Medicine" />
          <Paragraph text={'Select The Disease'} style={styles.paragraph} />
          <DropDown
            placeHolder={'Select Diagnosed Disease'}
            changeValue={handleDropDown}
            name="medicine-dropdown"
            style={styles.disease}
            data={diseases}
            value={disease.current}
          />
          {diseaseError && (
            <Error
              style={styles.error}
              message={'Please Select the Diagnosed Disease'}
            />
          )}
          <Paragraph
            text={'Select the Medication Duration'}
            style={styles.duration}
          />
          <Toggle
            optionOne="Days"
            optionTwo="Weeks"
            toggle={toggleActive}
            active={active}
            style={styles.toggle}
          />
          <InputField
            placeHolder="Enter Number of Days or Weeks *"
            value={days.current}
            name="duration"
            changeValue={changeValue}
            type="number"
          />
          {error && (
            <Error
              style={styles.error}
              message={'Must be a number and greater than 0'}
            />
          )}
          <Button
            styles={styles.button}
            title="Next"
            isLoading={loading}
            onPress={submit}
          />
        </SafeAreaView>
      </Layout>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: verticalScale(20),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paragraph: {
    paddingTop: verticalScale(25),
  },
  duration: {
    paddingTop: verticalScale(140),
  },
  disease: {
    marginTop: verticalScale(29),
  },
  error: {
    paddingTop: verticalScale(10),
  },
  toggle: {
    marginTop: verticalScale(23),
    marginBottom: verticalScale(23),
    marginLeft: '55%',
  },
  button: {
    marginTop: verticalScale(60),
  },
});

export default PrescribedPlan;
