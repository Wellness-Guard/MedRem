import React, {useEffect, useRef} from 'react';
import Layout from '../../Layout/Layout';
import Heading from '../../components/Heading';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import ForgotPasswordSvg from '../../assets/svgImages/forgot_password_image.svg';
import EmailSentSvg from '../../assets/svgImages/email_sent.svg';
import Description from '../../components/Description';
import Paragraph from '../../components/Paragraph';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LIGHT_BLUE_COLOR, PRIMARY_COLOR} from '../../constants/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import Error from '../../components/Error';
import {resetPassword} from '../../store/thunkActions/authActions';
import {resetAlerts, resetAuth} from '../../store/features/authSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import Close from '../../components/Close';
type FormData = {
  email: string;
};
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success} = useSelector((state: RootState) => state.auth);
  const email = useRef<string>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  });
  const forgotPassword = async (form: FormData) => {
    await dispatch(resetPassword({email: form.email}));
    email.current = form.email;
  };
  useEffect(() => {
    dispatch(resetAuth());
    return () => {
      email.current = '';
      dispatch(resetAlerts());
    };
  }, []);
  return (
    <Layout>
      {success ? (
        <SafeAreaView>
          <Close close={() => navigation.goBack()} style={styles.close} />
          <View style={styles.email_container}>
            <EmailSentSvg height={200} width={200} style={styles.banner} />
            <Heading styles={styles.email_heading} text="Email sent!" />
            <Paragraph
              style={styles.email_text}
              text={`We have send an email to ${email.current} with a link to reset your password`}
            />
          </View>
        </SafeAreaView>
      ) : (
        <KeyboardAwareScrollView>
          <Heading styles={styles.heading} text="Forgot Password" />
          <ForgotPasswordSvg height={180} width={200} style={styles.banner} />
          <View style={styles.container}>
            <Description
              style={styles.description}
              text={'Enter the email address associated with your account.'}
            />
            <Paragraph
              style={styles.paragraph}
              text={'We will email you a link to reset your password.'}
            />
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
              <Error
                style={styles.error}
                message="Valid Email Address is required"
              />
            )}
            <Button
              title={'Submit'}
              onPress={handleSubmit(forgotPassword)}
              isLoading={loading}
              styles={styles.submit}
            />
            <Text style={styles.text}>
              Back to
              <Text onPress={() => navigation.goBack()} style={styles.signup}>
                Sign In
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  email_heading: {
    textAlign: 'center',
  },
  email_text: {
    textAlign: 'center',
    width: '90%',
  },
  close: {
    marginLeft: '80%',
    position: 'absolute',
    color: PRIMARY_COLOR,
  },
  email_container: {
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginTop: verticalScale(50),
    marginBottom: verticalScale(50),
    textAlign: 'center',
  },
  banner: {
    alignSelf: 'center',
    marginTop: scale(15),
    marginBottom: scale(30),
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    width: scale(340),
    height: 'auto',
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(18),
    marginBottom: verticalScale(5),
  },
  paragraph: {
    textAlign: 'center',
    width: scale(300),
    marginBottom: scale(30),
  },
  error: {
    paddingTop: verticalScale(10),
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: scale(5),
  },
  signup: {
    color: LIGHT_BLUE_COLOR,
    fontFamily: 'Poppins-SemiBold',
  },
  submit: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
});

export default ForgotPasswordScreen;
