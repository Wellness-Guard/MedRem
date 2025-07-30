import {useEffect} from 'react';
import notifee, {
  EventType,
  Event,
  AndroidImportance,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NotificationTile, StackParams} from '../global/types';
import {NOTIFICATION_TYPE} from '../constants/notification_types';

const useNotification = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const onMessage = async ({data}: FirebaseMessagingTypes.RemoteMessage) => {
    const parsedJSON = JSON.parse(data?.default as string) as NotificationTile;
    const {title, body, data: notification_data} = parsedJSON.notification!;

    await notifee.displayNotification({
      id: title,
      title,
      body,
      data: {
        ...notification_data,
      },
      android: {
        showTimestamp: true,
        largeIcon: require('../assets/images/wellness-guard.png'),
        channelId: await notifee.createChannel({
          id: 'default',
          name: 'Notification',
          importance: AndroidImportance.HIGH,
        }),
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleNotificationAction = ({type, detail}: Event) => {
    const {notification} = detail;
    switch (type) {
      case EventType.PRESS:
        if (
          notification?.data?.type ===
            NOTIFICATION_TYPE.morning_dose_notification ||
          notification?.data?.type ===
            NOTIFICATION_TYPE.afternoon_dose_notification ||
          notification?.data?.type ===
            NOTIFICATION_TYPE.evening_dose_notification
        ) {
          const {medication_id, routine} = notification.data;
          navigation.navigate('ReminderScreen', {
            medication_id: medication_id as string,
            routine: routine as string,
          });
        }
    }
  };

  const onForegroundEvent = async (event: Event) =>
    handleNotificationAction(event);

  const onBackgroundEvent = async (event: Event) =>
    handleNotificationAction(event);

  useEffect(() => {
    const unsubscribeNotifee = notifee.onForegroundEvent(onForegroundEvent);
    const unsubscribeNotifeeBackground =
      notifee.onBackgroundEvent(onBackgroundEvent);

    const unsubscribe = messaging().onMessage(onMessage);
    return () => {
      unsubscribe();
      unsubscribeNotifeeBackground;
      unsubscribeNotifee();
    };
  }, []);
};

export default useNotification;
