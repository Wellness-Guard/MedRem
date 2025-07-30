import React, {useLayoutEffect, useRef} from 'react';
import {StyleSheet, ListRenderItemInfo, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import Layout from '../../Layout/Layout';
import {useDispatch} from 'react-redux';
import {useToggle} from '../../hooks/useToggle';
import {AppDispatch} from '../../store';
import Spinner from '../../components/Spinner';
import {SafeAreaView} from 'react-native-safe-area-context';
import {verticalScale} from 'react-native-size-matters';
import Notification from './Notification';
import {FlatList} from 'react-native-gesture-handler';
import {NotificationContent} from '../../global/types';
import {resetCount} from '../../store/features/notificationSlice';
import {OptionArray} from '../../global/types';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import BottomOption from '../../components/BottomOption';
import {LIGHT_GREY} from '../../constants/colors';
import {
  deleteNotification,
  fetchNotifications,
} from '../../store/thunkActions/notificationActions';
import Toast from 'react-native-toast-message';
const NotificationScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, toggle] = useToggle();
  const notificationId = useRef<string>('');
  const toggleOption = (_id: string) => {
    notificationId.current = _id;
    console.log('ID', notificationId);
    toggle();
  };

  const deleteItem = async () => {
    console.log('Delete the goddamn notification');
    await dispatch(deleteNotification(notificationId.current));
    //dispatch an async action
    notificationId.current = '';
    toggle();
  };
  const options: OptionArray = [
    {
      title: 'Delete Notification',
      icon: faTrashCan,
      action: deleteItem,
    },
  ];

  const {notification_content, loading, error} = useSelector(
    (state: RootState) => state.notification,
  );

  useLayoutEffect(() => {
    dispatch(fetchNotifications(true));
    dispatch(resetCount());
  }, [dispatch]);
  if (error) {
    Toast.show({
      type: 'error',
      text1: `❌ ${error}`,
      swipeable: true,
    });
  }

  return (
    <Layout>
      {notification_content.length === 0 ? (
        <Text style={styles.noContent}>No Notification</Text>
      ) : null}
      {loading ? (
        <SafeAreaView style={styles.spinner}>
          <Spinner />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.listView}>
          <FlatList
            data={notification_content}
            renderItem={({item}: ListRenderItemInfo<NotificationContent>) => (
              <Notification
                action={toggleOption}
                subject={item.subject}
                body={item.body}
                type={item.type}
                view={item.view}
                _id={item._id}
                createdAt={item.createdAt}
              />
            )}
            keyExtractor={item => item._id}
          />
          <BottomOption
            isVisible={visible}
            options={options}
            onBackDropPress={toggle}
          />
        </SafeAreaView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  spinner: {
    top: '45%',
  },
  listView: {
    marginTop: verticalScale(40),
  },
  noContent: {
    color: LIGHT_GREY,
    textAlign: 'center',
    fontSize: verticalScale(14),
    marginTop: '100%',
  },
});
export default NotificationScreen;
