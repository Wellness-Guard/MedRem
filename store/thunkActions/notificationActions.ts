import {createAsyncThunk} from '@reduxjs/toolkit';
import {DeleteRequest, GetRequest, PatchRequest} from '../../utils/Request';
import {NotificationSettingType} from '../../global/types';
const BASE_URL = process.env.BASE_URL!;
const NOTIFICATION_PATH = process.env.NOTIFICATION_PATH!;
const API_URL = BASE_URL + NOTIFICATION_PATH;

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_flag: boolean = true, {rejectWithValue}) => {
    try {
      const result = await GetRequest({
        url: `${API_URL}/notifications`,
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async (notification_id: string, {rejectWithValue}) => {
    try {
      const result = await DeleteRequest({
        url: `${API_URL}/notification`,
        params: notification_id,
      });
      console.log('result', result);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateNotificationSettings = createAsyncThunk(
  'notification/updateNotificationSettings',
  async (
    {device_token, push_notification}: NotificationSettingType,
    {rejectWithValue},
  ) => {
    try {
      const result = await PatchRequest({
        url: `${API_URL}/notification-setting`,
        body: {device_token, push_notification},
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
