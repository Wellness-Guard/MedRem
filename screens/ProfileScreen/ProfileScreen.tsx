import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Back from '../../components/Back';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Avatar from '../../components/Avatar';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {calculateMedications} from '../../store/features/medicationHistorySlice';
import Heading from '../../components/Heading';
import {PRIMARY_COLOR} from '../../constants/colors';
import Paragraph from '../../components/Paragraph';
type ProfileProp = DrawerScreenProps<any, any>;

const ProfileScreen = ({navigation}: ProfileProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const {first_name, last_name, avatar} = useSelector(
    (state: RootState) => state.auth,
  );
  const {completedMedication, ongoingMedication} = useSelector(
    (state: RootState) => state.medicationHistory,
  );
  useEffect(() => {
    dispatch(calculateMedications());
  }, []);
  return (
    <>
      <SafeAreaView style={styles.cover}>
        <Back
          styles={{color: PRIMARY_COLOR}}
          back={() => navigation.goBack()}
        />
        <View style={styles.cover_items}>
          <Avatar height={scale(180)} width={scale(180)} src={avatar} />
          <Heading styles={styles.name} text={first_name + ' ' + last_name} />
        </View>
      </SafeAreaView>
      <View style={styles.entities}>
        <View style={styles.entity}>
          <Paragraph
            text={'Completed Medication'}
            style={{color: PRIMARY_COLOR, fontSize: verticalScale(15)}}
          />
          <Text style={styles.value}>{completedMedication}</Text>
        </View>
        <View style={styles.entity}>
          <Paragraph
            text={'Ongoing Medication'}
            style={{color: PRIMARY_COLOR, fontSize: verticalScale(15)}}
          />
          <Text style={styles.value}>{ongoingMedication}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cover: {
    paddingTop: '10%',
    height: '50%',
    backgroundColor: '#6BC7DB',
    marginBottom: verticalScale(35),
  },
  cover_items: {
    paddingTop: '5%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  entities: {
    flexDirection: 'row',
  },
  entity: {
    alignItems: 'center',
    padding: '2%',
  },
  name: {
    marginTop: '5%',
  },
  value: {
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins-SemiBold',
    fontSize: verticalScale(20),
  },
});

export default ProfileScreen;
