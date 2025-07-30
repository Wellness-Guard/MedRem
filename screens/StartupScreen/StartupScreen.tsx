import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import {PRIMARY_COLOR} from '../../constants/colors';
import {verticalScale, scale} from 'react-native-size-matters';
import SplashImage from '../../assets/svgImages/splash-image.svg';
import Layout from '../../Layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';
const StartupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  return (
    <Layout>
      <View style={styles.splash}>
        <SplashImage height={256} width={scale(224)} />
        <Text style={styles.decription}>
          You will now remember to take your prescribed dosage, utilize the app
          to ensure timely medication, and promote an early path to better
          health.
        </Text>
        <Button
          styles={styles.btn}
          title="Get Started"
          isLoading={false}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  splash: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: scale(130),
  },
  decription: {
    fontSize: scale(20),
    textAlign: 'center',
    width: scale(300),
    height: verticalScale(158),
    lineHeight: scale(30),
    color: PRIMARY_COLOR,
    fontWeight: '400',
    marginTop: scale(56),
  },
  btn: {
    marginTop: verticalScale(30),
  },
});

export default StartupScreen;
