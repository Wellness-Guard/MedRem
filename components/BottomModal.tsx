import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Description from './Description';
import Modal from 'react-native-modal';
import DropDown from './DropDown';
import {LIGHT_GREY} from '../constants/colors';
import {verticalScale, scale} from 'react-native-size-matters';
import InputField from './InputField';
import RoutineTile from './RoutineTile';
import Button from './Button';

type BottomModalProps = {
  isVisible: boolean;
  onBackDropPress: () => void;
  medicines: [];
  addDose: (
    quantity: any,
    medicine_type: any,
    selected_medicine: any,
    routine: string[],
  ) => void;
};
const BottomModal = ({
  isVisible,
  onBackDropPress,
  medicines,
  addDose,
}: BottomModalProps) => {
  const quantity = useRef<any>();
  const selectedMedicine = useRef<string>('');
  const medicineType = useRef<string>('');
  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);
  const changeValue = (value: any, name: string) => {
    console.log('name', name);
    quantity.current = value;
  };

  const toggleRoutine = (routine: string) => {
    console.log('toggle', routine);
    if (selectedRoutines.includes(routine)) {
      setSelectedRoutines(
        selectedRoutines.filter(rout => {
          return rout !== routine;
        }),
      );
      return;
    }
    setSelectedRoutines([...selectedRoutines, routine]);
    console.log('selected', selectedRoutines);
  };

  const checkActive = (routine: string) =>
    selectedRoutines.includes(routine) ? true : false;

  const callbackDose = () => {
    if (
      quantity.current &&
      selectedMedicine.current &&
      selectedRoutines.length > 0 &&
      medicineType.current
    ) {
      console.log('Add Able');
      addDose(
        quantity.current,
        medicineType.current,
        selectedMedicine.current,
        selectedRoutines,
      );
    }
    quantity.current = 0;
    selectedMedicine.current = '';
    setSelectedRoutines([]);
    medicineType.current = '';
    onBackDropPress();
  };

  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      isVisible={isVisible}
      swipeDirection={'up'}
      onBackdropPress={onBackDropPress}
      style={styles.bottom}>
      <View style={styles.container}>
        <Description
          style={styles.header}
          text="Add Prescribed Medicine Dose "
        />
        <DropDown
          style={styles.select_medicine_type}
          name="medicine"
          value={medicineType.current}
          data={[{name: 'Tablet'}, {name: 'Capsule'}, {name: 'Liquid'}]}
          placeHolder="Select Medicine Type"
          changeValue={(value: any, name: string) => {
            console.log('value', name);
            medicineType.current = value;
          }}
        />
        <DropDown
          style={styles.select_medicine}
          name="medicine"
          value={selectedMedicine.current}
          data={medicines}
          placeHolder="Select Medicine"
          changeValue={(value: any, name: string) => {
            console.log('value', name);
            selectedMedicine.current = value;
          }}
        />
        {/* <KeyboardAwareScrollView> */}
        <InputField
          styles={styles.quantity}
          placeHolder="Select Quantity"
          value={quantity.current}
          name="duration"
          changeValue={changeValue}
          type="number"
        />
        {/* </KeyboardAwareScrollView> */}
        <Description style={styles.routine_title} text="Add Routine" />
        <View style={styles.routineRow}>
          <RoutineTile
            type={'Morning'}
            active={checkActive('Morning')}
            toggle={toggleRoutine}
          />
          <RoutineTile
            type={'Afternoon'}
            active={checkActive('Afternoon')}
            toggle={toggleRoutine}
          />
          <RoutineTile
            type={'Evening'}
            active={checkActive('Evening')}
            toggle={toggleRoutine}
          />
        </View>
        <Button
          styles={styles.button}
          title="ADD"
          onPress={callbackDose}
          isLoading={false}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottom: {
    margin: 0,
    // flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // height: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  select_medicine_type: {
    marginTop: verticalScale(50),
  },
  select_medicine: {
    marginTop: verticalScale(25),
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(30),
  },
  quantity: {
    marginTop: verticalScale(25),
  },
  routine_title: {
    paddingBottom: verticalScale(10),
    fontWeight: 'bold',
  },
  routineRow: {
    paddingBottom: verticalScale(20),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  flexRow: {
    flexDirection: 'row',
    marginLeft: scale(15),
  },

  optionTitle: {
    fontSize: verticalScale(18),
    color: LIGHT_GREY,
    fontWeight: 'normal',
    marginLeft: scale(10),
  },
  button: {
    marginBottom: verticalScale(20),
  },
});

export default BottomModal;
