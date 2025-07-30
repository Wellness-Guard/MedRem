/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async ({data}) => {
  console.log('Remote notification', data);
  const parsedJSON = JSON.parse(data?.default);
  const {title, body, data: notification_data} = parsedJSON.notification;

  await notifee.displayNotification({
    id: title,
    title,
    body,
    data: {
      ...notification_data,
    },
    android: {
      showTimestamp: true,
      largeIcon: require('./assets/images/wellness-guard.png'),
      channelId: await notifee.createChannel({
        id: 'default',
        name: 'Notification',
      }),
      pressAction: {
        id: 'default',
      },
    },
  });
});
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  console.log('Type', type);

  console.log('Background Press', detail);
  // Remove the notification
  // Or perform another action

  switch (type) {
    case EventType.PRESS:
      if (notification?.data?.type === 'medicine_reminder') {
        console.log('Navigate');
        // navigatorRef.current.navigate('ReminderScreen', {
        //   medicine_id: '313kksfk213km',
        // });
      }
  }
});

AppRegistry.registerComponent(appName, () => App);
