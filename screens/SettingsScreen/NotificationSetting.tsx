import {StyleSheet, View} from 'react-native';
import React from 'react';
import Back from '../../components/Back';
import {StackParams} from '../../global/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import Layout from '../../Layout/Layout';
import {StackNavigationProp} from '@react-navigation/stack';
import Heading from '../../components/Heading';
import {useNavigation} from '@react-navigation/native';
import Option from '../../components/Option';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {updateNotificationSettings} from '../../store/thunkActions/notificationActions';
const NotificationSetting = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, push_notification} = useSelector(
    (state: RootState) => state.notification,
  );
  const togglePushNotification = () => {
    dispatch(
      updateNotificationSettings({push_notification: !push_notification}),
    );
  };
  return (
    <Layout>
      <Back back={() => navigation.goBack()} />
      <SafeAreaView style={styles.frame}>
        <Heading text="Notification Setting" />
        <View style={styles.options}>
          <Option
            title="Push Notification"
            status={push_notification!}
            action={togglePushNotification}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
  },
  options: {
    marginTop: verticalScale(30),
  },
});
export default NotificationSetting;
