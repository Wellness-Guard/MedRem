/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import io from 'socket.io-client';
import {fetchDisease} from '../../store/thunkActions/diseaseAction';
import {getProfile} from '../../store/thunkActions/authActions';

import {
  updateSocket,
  updateNotification,
} from '../../store/features/notificationSlice';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import DrawerLayout from '../../components/DrawerLayout';
import BottomTab from '../../navigations/BottomTab';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import messaging from '@react-native-firebase/messaging';
import {updateNotificationSettings} from '../../store/thunkActions/notificationActions';
import useNotification from '../../hooks/useNotification';
const Drawer = createDrawerNavigator();

const AuthScreen = () => {
  const {id} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useNotification();
  const [socket] = useState(
    io('http://localhost:5000', {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      query: {
        user_id: id,
      },
    }),
  );

  const startListeners = () => {
    socket.io.on('reconnect_attempt', attempt => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', error => {
      console.info('Reconnection error: ' + error);
    });
    socket.emit('handshake', (user_id: number, socket_id: string) => {
      dispatch(updateSocket(socket_id));
    });

    socket.on('pull-notification', Notification => {
      dispatch(updateNotification(Notification));
    });
  };

  const updateDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    return messaging()
      .getToken()
      .then((token: string) => {
        console.log(token);
        dispatch(updateNotificationSettings({device_token: token}));
      });
  };

  const fillProfile = async () => {
    await dispatch(getProfile(true));
  };

  const fillDiseaseList = async () => {
    await dispatch(fetchDisease(true));
  };

  useEffect(() => {
    updateDeviceToken();
    fillDiseaseList();
    fillProfile();
    socket.connect();
    socket.on('connect', startListeners);
    return () => {
      console.log('component unmount runs');
      socket.close();
      dispatch(updateSocket(''));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <DrawerLayout {...props} />
      )}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="BottomTab" component={BottomTab} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default AuthScreen;
