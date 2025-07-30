import React, {useEffect, useState} from 'react';
import Layout from '../../Layout/Layout';
import {View, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import Heading from '../../components/Heading';
import InputField from '../../components/InputField';
import SignInBanner from '../../assets/svgImages/signinBanner.svg';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import {useForm, Controller} from 'react-hook-form';
import {
  BACKGROUND_COLOR,
  DARK_BLUE_COLOR,
  LIGHT_BLUE_COLOR,
  PRIMARY_COLOR,
} from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import Error from '../../components/Error';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {saveOAuthUser, resetAuth} from '../../store/features/authSlice';
import {
  signIn,
  verifySignUpCode,
  resendVerifyCode,
} from '../../store/thunkActions/authActions';
import Toast from 'react-native-toast-message';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';
import Close from '../../components/Close';
import VerificationScreen from '../VerificationScreen/VerificationScreen';

type FormData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [step, setStep] = useState<number>(1);
  const [gload, setGload] = useState<boolean>(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, isLoggedIn, verify, email, id} = useSelector(
    (state: RootState) => state.auth,
  );

  const navigateToForgotPasswordScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  const submitForm = ({email, password}: FormData) => {
    dispatch(signIn({email, password}));
  };
  const verifyCode = async (code: string) => {
    await dispatch(verifySignUpCode({id: id as number, code: Number(code)}));
  };
  const resendCode = async () => {
    console.log('resend', email);
    await dispatch(resendVerifyCode({email}));
  };

  const openBrowser = async (url: string) => {
    if (await InAppBrowser.isAvailable()) {
      setGload(true);
      const response = await InAppBrowser.openAuth(
        url,
        'wellness-guard://SignIn',
        {
          enableUrlBarHiding: false,
          showTitle: true,
          toolbarColor: BACKGROUND_COLOR,
        },
      );
      if (response.type === 'success' && response.url) {
        // this is for temporary use but we will eventually use Linking.openURL to launch
        console.log(response);
        const responseUrl = response.url.split('?')[1].split('/');
        const user: any = {};
        responseUrl.forEach(item => {
          const [key, stringValue] = item.split('=');
          const value =
            key === 'isLoggedIn' ? stringValue === 'true' : stringValue;
          user[key] = value;
        });

        dispatch(saveOAuthUser(user));
        setGload(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: `❌ NO In App Browser Detected`,
        swipeable: true,
      });
    }
    setGload(false);
  };
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    setUrl('');
    if (error) {
      Toast.show({
        type: 'error',
        text1: `❌ ${error}`,
        swipeable: true,
      });
    }
    if (verify === false && email && id) {
      setStep(2);
    }
    if (isLoggedIn && email) {
      navigation.navigate('Auth');
    }
  }, [loading, error, isLoggedIn, navigation, email, id, verify]);

  if (step === 1) {
    return (
      <Layout>
        <KeyboardAwareScrollView>
          <Heading text="Welcome Back" styles={styles.heading} />
          <SignInBanner style={styles.banner} />
          <View style={styles.signInFields}>
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
              <Error message="Valid Email Address is required" />
            )}
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  placeHolder="Enter Your Password*"
                  value={value}
                  name="password"
                  changeValue={onChange}
                  type="password"
                  onBlur={onBlur}
                />
              )}
              name="password"
            />
            {errors.password && <Error message="Password is required" />}
            <Paragraph
              text="Forgot Password"
              style={styles.forgotPassword}
              onPress={navigateToForgotPasswordScreen}
            />
            <Button
              title="Log in"
              onPress={handleSubmit(submitForm)}
              isLoading={loading}
            />
            <Paragraph text="or" style={styles.or} />
            <Button
              title="Sign in with"
              onPress={() => {
                setUrl('http://localhost:3001/facebook/sign-in');
              }}
              isLoading={false}
              type={'facebook'}
            />
            <Button
              title="Sign in with"
              onPress={() =>
                openBrowser('http://localhost:3001/google/sign-in')
              }
              isLoading={gload}
              type={'google'}
            />
            <Text style={styles.text}>
              Do not have an account?
              <Text
                onPress={() => navigation.navigate('Register')}
                style={styles.signup}>
                {' '}
                Sign up
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    );
  } else if (step === 2) {
    return (
      <Layout>
        <TouchableOpacity
          onPress={() => {
            console.log('closed');
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
    marginTop: verticalScale(60),
    marginBottom: verticalScale(5),
    textAlign: 'center',
  },
  banner: {
    alignSelf: 'center',
    marginBottom: verticalScale(10),
  },
  signInFields: {
    flexDirection: 'column',
    alignSelf: 'center',
    gap: scale(7),
  },
  forgotPassword: {
    color: LIGHT_BLUE_COLOR,
    textAlign: 'right',
    fontFamily: 'Poppins-SemiBold',
  },
  or: {
    color: DARK_BLUE_COLOR,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: scale(5),
    fontFamily: 'Poppins-Regular',
  },
  signup: {
    color: LIGHT_BLUE_COLOR,
    fontFamily: 'Poppins-SemiBold',
  },
  close: {
    marginLeft: '80%',
    marginTop: '3%',
    position: 'absolute',
    color: PRIMARY_COLOR,
  },
});

export default SignInScreen;
