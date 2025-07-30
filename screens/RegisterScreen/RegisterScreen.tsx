import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Heading from '../../components/Heading';
import Layout from '../../Layout/Layout';
import {verticalScale} from 'react-native-size-matters';
import InputField from '../../components/InputField';
import {useState} from 'react';
import PasswordField from '../../components/PasswordField';
import Button from '../../components/Button';
import {scale} from 'react-native-size-matters';
import {LIGHT_BLUE_COLOR, PRIMARY_COLOR} from '../../constants/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import Error from '../../components/Error';
import {useDispatch, useSelector} from 'react-redux';
import {
  signUp,
  verifySignUpCode,
  resendVerifyCode,
} from '../../store/thunkActions/authActions';
import {AppDispatch, RootState} from '../../store';
import Toast from 'react-native-toast-message';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';
import Close from '../../components/Close';
import VerificationScreen from '../VerificationScreen/VerificationScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {resetAuth} from '../../store/features/authSlice';
import Spinner from '../../components/Spinner';
import {SafeAreaView} from 'react-native-safe-area-context';
type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const {loading, error, isLoggedIn, id, success, email, verify} = useSelector(
    (state: RootState) => state.auth,
  );
  const [step, setStep] = useState<number>(1);
  const [showPass, setShowPass] = useState(true);
  const [showCPass, setShowCPass] = useState(true);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: `❌ ${error}`,
        swipeable: true,
      });
    }
    if (verify && isLoggedIn && id) {
      navigation.navigate('Auth');
    }
    if (email && id) {
      setStep(2);
    }
    if (success) {
      reset();
      Toast.show({
        type: 'success',
        text1: `✅ ${success}`,
        swipeable: true,
      });
    }

    return () => {
      setStep(1);
    };
  }, [
    error,
    loading,
    isLoggedIn,
    id,
    navigation,
    success,
    verify,
    dispatch,
    reset,
    step,
    email,
  ]);

  const passwordToggle = () => {
    setShowPass(!showPass);
  };
  const cpasswordToggle = () => {
    setShowCPass(!showCPass);
  };
  const resendCode = async () => {
    await dispatch(resendVerifyCode({email}));
  };

  const registerUser = async (form: FormData) => {
    const {first_name, email, password, last_name, confirm_password} = form;
    if (password !== confirm_password) {
      setCheck(true);
      return;
    }
    setCheck(false);
    dispatch(signUp({first_name, last_name, email, password}));
  };

  const verifyCode = async (code: string) => {
    await dispatch(verifySignUpCode({id: id as number, code: Number(code)}));
  };
  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.spinner_view}>
  //       <Spinner />
  //     </SafeAreaView>
  //   );
  // }
  if (step === 1) {
    return (
      <Layout>
        <KeyboardAwareScrollView>
          <Heading text="Welcome onboard!" styles={styles.heading} />
          <View style={styles.fields}>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
                pattern: /^[A-Za-z]+$/i,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  placeHolder="Enter First Name*"
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
                  placeHolder="Enter Your Last Name*"
                  name="last_name"
                  changeValue={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="last_name"
            />
            {errors.last_name && (
              <Error message="Please Enter Valid Last Name" />
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  placeHolder="Enter Your Email*"
                  name="email"
                  changeValue={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Error message="Please Enter Valid Email Address" />
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <PasswordField
                  placeHolder="Enter Password*"
                  icon={showPass}
                  toggle={passwordToggle}
                  type={showPass}
                  changeValue={onChange}
                  value={value}
                  name="password"
                  onBlur={onBlur}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Error
                message="Please Enter Valid 8-20 characters, must contains alphabets, one
                special character [@_!*] & one digit [0-9] and no spaces"
              />
            )}
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
                minLength: 8,
                pattern:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <PasswordField
                  placeHolder="Enter Confirm Password*"
                  icon={showCPass}
                  toggle={cpasswordToggle}
                  type={showCPass}
                  changeValue={onChange}
                  value={value}
                  name="password"
                  onBlur={onBlur}
                />
              )}
              name="confirm_password"
            />
            {errors.confirm_password && (
              <Error
                message="Please Enter Valid 8-20 characters, must contains alphabets, one
                special character [@_!*] & one digit [0-9] and no spaces"
              />
            )}
            {check && (
              <Error message="Passoword & Confirm Password Fields are mistmatched" />
            )}

            <Button
              styles={styles.btn}
              title="Register"
              isLoading={loading}
              onPress={handleSubmit(registerUser)}
            />
            <Text style={styles.text}>
              Already have an Account?
              <Text
                onPress={() => navigation.navigate('SignIn')}
                style={styles.signin}>
                Sign in
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    );
  }
  if (step === 2) {
    return (
      <Layout>
        <TouchableOpacity
          onPress={() => {
            reset();
            dispatch(resetAuth());
            setStep(1);
          }}>
          <Close style={styles.close} />
        </TouchableOpacity>
        <VerificationScreen
          submit={verifyCode}
          loading={loading}
          resend={resendCode}
        />
      </Layout>
    );
  }
};

const styles = StyleSheet.create({
  heading: {
    marginTop: verticalScale(110),
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  fields: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: verticalScale(15),
    alignItems: 'center',
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: scale(52),
  },
  btn: {
    marginTop: scale(10),
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: PRIMARY_COLOR,
  },
  signin: {
    color: LIGHT_BLUE_COLOR,
    fontFamily: 'Poppins-SemiBold',
  },
  close: {
    marginLeft: '80%',
    marginTop: '3%',
    position: 'absolute',
    color: PRIMARY_COLOR,
  },
  spinner_view: {
    marginTop: '100%',
  },
});

export default RegisterScreen;
