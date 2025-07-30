import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Layout from '../../Layout/Layout';
import {verticalScale} from 'react-native-size-matters';
import Picture from '../../components/Picture';
import InputField from '../../components/InputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateField from '../../components/DateField';
import Button from '../../components/Button';
import Gender from '../../components/Gender';
import {useForm, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useToggle} from '../../hooks/useToggle';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import Prompt from '../../components/Prompt';
import {
  updateProfile,
  uploadAvatar,
} from '../../store/thunkActions/authActions';
import {convertToFormatedDate} from '../../utils';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import Back from '../../components/Back';
import {faCamera, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import BottomOption from '../../components/BottomOption';
import {OptionArray} from '../../global/types';
import {launchImageLibrary} from 'react-native-image-picker';

type FormData = {
  first_name: string;
  last_name: string;
};
const AccountSettingScreen = () => {
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: `❌ ${error}`,
        swipeable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    first_name,
    last_name,
    avatar,
    date_of_birth,
    gender,
    email,
    error,
    loading,
  } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState<{
    date_of_birth: Date | null | undefined;
    gender: string | null | undefined;
    first_name: string;
    last_name: string;
  }>({
    date_of_birth: date_of_birth,
    gender: gender,
    first_name: '',
    last_name: '',
  });
  const navigation = useNavigation();
  const [visible, toggle] = useToggle();
  const [bottom, toggleBottom] = useToggle();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      first_name: first_name,
      last_name: last_name,
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const toggleGender = (gender: string) => {
    setForm({...form, gender: gender});
  };

  const handleChange = (value: string | Date, name: string) => {
    setForm({...form, [name]: value});
  };

  const normalize = async (submitForm: FormData) => {
    const {first_name, last_name} = submitForm;

    setForm({...form, first_name, last_name});
    toggle();
  };

  const submitUpdates = async () => {
    const attr = {} as any;
    attr.first_name = form.first_name;
    attr.last_name = form.last_name;
    if (form.date_of_birth && form.date_of_birth !== null) {
      attr.date_of_birth = convertToFormatedDate(form.date_of_birth);
    }
    if (form.gender && form.gender !== null) {
      attr.gender = form.gender;
    }

    dispatch(updateProfile(attr));

    toggle();
    navigation.goBack();
  };

  const deletPhoto = () => {
    // open a picker to pick from gallery
    console.log('delete Photo');
    toggleBottom();
  };
  const newProfilePhoto = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response => {
        if (response.assets) {
          const {uri, type, fileName: name} = response.assets[0];
          const data = new FormData();
          data.append('image', {
            uri,
            type,
            name,
          });
          dispatch(uploadAvatar(data));
        }
      },
    );
  };

  const options: OptionArray = [
    {
      title: 'New Profile Picture',
      icon: faCamera,
      action: newProfilePhoto,
    },
    {
      title: 'Delete Picture',
      icon: faTrashCan,
      action: deletPhoto,
    },
  ];

  return (
    <Layout>
      <Back back={() => navigation.goBack()} />

      {loading ? (
        <SafeAreaView style={styles.spinner}>
          <Spinner />
        </SafeAreaView>
      ) : (
        <KeyboardAwareScrollView>
          <SafeAreaView style={styles.safeArea}>
            <Picture src={avatar} toggleModal={toggleBottom} />
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
                pattern: /^[A-Za-z]+$/i,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  styles={styles.spacing}
                  name="firstName"
                  changeValue={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="first_name"
            />
            {errors.first_name && (
              <Error message="Please Enter Valid First Name" />
            )}
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
                pattern: /^[A-Za-z]+$/i,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  styles={styles.spacing}
                  name="lastName"
                  changeValue={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="last_name"
            />
            {errors.last_name && (
              <Error message="Please Enter Valid First Name" />
            )}
            <DateField
              name="date_of_birth"
              changeValue={handleChange}
              value={form.date_of_birth}
              styles={styles.spacing}
              placeHolder={'Select your Date Of Birth'}
            />
            <View style={styles.genderRow}>
              <Gender
                active={form.gender === 'male' ? true : false}
                type="male"
                toggle={() => toggleGender('male')}
              />

              <Gender
                active={form.gender === 'female' ? true : false}
                type="female"
                toggle={() => toggleGender('female')}
              />
            </View>

            <InputField
              name="lastName"
              styles={styles.spacing}
              value={email}
              editable={false}
              changeValue={() => null}
            />

            <Button
              styles={styles.spacing}
              title="Update"
              isLoading={loading}
              onPress={handleSubmit(normalize)}
            />

            <Prompt
              isVisible={visible}
              title="Are you sure?"
              success={submitUpdates}
              cancel={toggle}
              onBackDropPress={toggle}
            />
            <BottomOption
              isVisible={bottom}
              options={options}
              onBackDropPress={toggleBottom}
            />
          </SafeAreaView>
        </KeyboardAwareScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  spinner: {
    top: '45%',
  },
  safeArea: {
    marginTop: verticalScale(15),
    alignItems: 'center',
  },
  spacing: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
  },
  genderRow: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
  },
});

export default AccountSettingScreen;
