import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartupScreen from './screens/StartupScreen/StartupScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import SplashScreen from 'react-native-splash-screen';
import AccountSettingScreen from './screens/SettingsScreen/AccountSettingScreen';
import PrescribedPlan from './screens/MedicationScreen/PrescribedPlan';
import PrescribedMedicine from './screens/MedicationScreen/PrescribedMedicine';
import ReminderScreen from './screens/ReminderScreen/ReminderScreen';
import useNotification from './hooks/useNotification';
import {StackParams} from './global/types';
import MedicationDetail from './screens/HistoryScreen/MedicationDetail';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import NotificationSetting from './screens/SettingsScreen/NotificationSetting';
import LanguageSetting from './screens/SettingsScreen/LanguageSetting';
import AnatomyScreen from './screens/AnatomyScreen';

const Stack = createStackNavigator<StackParams>();

function Auth() {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);
  useNotification();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Auth' : 'Startup'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Startup" component={StartupScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <Stack.Screen name="LanguageSetting" component={LanguageSetting} />
      <Stack.Screen name="AccountSetting" component={AccountSettingScreen} />
      <Stack.Screen name="PrescribedPlan" component={PrescribedPlan} />
      <Stack.Screen name="PrescribedMedicine" component={PrescribedMedicine} />
      <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
      <Stack.Screen name="MedicationDetail" component={MedicationDetail} />
      <Stack.Screen name="Anatomy" component={AnatomyScreen} />
    </Stack.Navigator>
  );
}

export default Auth;
