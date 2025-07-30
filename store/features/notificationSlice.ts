import {createSlice} from '@reduxjs/toolkit';
import {Notification, NotificationContent} from '../../global/types';
import {
  fetchNotifications,
  deleteNotification,
  updateNotificationSettings,
} from '../thunkActions/notificationActions';
const initialState: Notification = {
  _id: '',
  socket_id: '',
  device_token: '',
  push_notification: true,
  notification_content: [],
};
export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    ...initialState,
    loading: false,
    error: '',
    success: '',
    count: 0, // for new pull notification comming from socket.io
    // limit
    // offset
  },
  reducers: {
    updateSocket: (state, {payload}) => {
      state.socket_id = payload;
    },
    updateNotification: (state, {payload}) => {
      state.count++;
      state.notification_content.unshift(payload);
    },
    resetCount: state => {
      state.count = 0;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, {payload}) => {
      const {notification_content, socket_id, push_notification, device_token} =
        payload.data;
      state.socket_id = socket_id;
      state.notification_content = notification_content;
      state.loading = false;
      state.push_notification = push_notification;
      state.device_token = device_token;
    });
    builder.addCase(fetchNotifications.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(fetchNotifications.pending, state => {
      state.loading = true;
      state.loading = true;
      state.error = '';
    });

    builder.addCase(deleteNotification.fulfilled, (state, {payload}) => {
      console.log('Payload', payload);
      const {data: notification_id} = payload;
      state.notification_content = state.notification_content.filter(
        (notification: NotificationContent) => {
          return notification._id !== notification_id;
        },
      );
      state.success = '';
      state.loading = false;
    });
    builder.addCase(deleteNotification.rejected, (state, {payload}) => {
      state.success = '';
      state.error = payload as string;
      console.log('failed', payload);
      state.loading = false;
    });
    builder.addCase(deleteNotification.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });

    // update notification setting

    builder.addCase(
      updateNotificationSettings.fulfilled,
      (state, {payload}) => {
        state.success = '';
        state.loading = false;
        const {data, message} = payload;
        state.success = message as string;
        const {push_notification, device_token} = data;
        state.push_notification = push_notification;
        state.device_token = device_token;
        console.log('payload', payload);
      },
    );
    builder.addCase(updateNotificationSettings.rejected, (state, {payload}) => {
      state.success = '';
      state.error = payload as string;
      state.loading = false;
    });
    builder.addCase(updateNotificationSettings.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });
  },
});

export default notificationSlice;
export const {updateSocket, updateNotification, resetCount} =
  notificationSlice.actions;
