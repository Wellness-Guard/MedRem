import {createAsyncThunk} from '@reduxjs/toolkit';
import {Auth} from '../../global/types';
import {
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from '../../utils/Request';

const BASE_URL = process.env.BASE_URL!;
const AUTH_PATH = process.env.AUTH_PATH!;
const API_URL = BASE_URL + AUTH_PATH;

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({first_name, last_name, email, password}: Auth, {rejectWithValue}) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/sign-up`,
        body: {
          first_name,
          last_name,
          email,
          password,
        },
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({email, password}: Auth, {rejectWithValue}) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/sign-in`,
        body: {
          email,
          password,
        },
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const signOut = createAsyncThunk(
  'auth/signOut',
  async (flag: boolean, {rejectWithValue}) => {
    try {
      const result = await GetRequest({
        url: `${API_URL}/sign-out`,
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (flag: boolean, {rejectWithValue}) => {
    try {
      const result = await GetRequest({
        url: `${API_URL}/profile`,
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    {
      first_name,
      last_name,
      date_of_birth,
      gender,
    }: {
      first_name: string;
      last_name: string;
      date_of_birth?: Date;
      gender?: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const result = await PatchRequest({
        url: `${API_URL}/profile`,
        body: {
          first_name,
          last_name,
          date_of_birth,
          gender,
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (flag: boolean, {rejectWithValue}) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/refresh-token`,
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (data: FormData, {rejectWithValue}) => {
    try {
      const result = await PutRequest({
        url: `${API_URL}/image-upload`,
        body: data,
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({email}: Auth, {rejectWithValue}) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/reset-password`,
        body: {
          email,
        },
      });
      return result;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error);
    }
  },
);

export const verifySignUpCode = createAsyncThunk(
  'auth/verifyCode',
  async ({id, code}: {id: number; code: number}, {rejectWithValue}) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/verify-signup-code`,
        body: {
          id,
          code,
        },
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const resendVerifyCode = createAsyncThunk(
  'auth/resendVerifyCode',
  async ({email}: Auth, {rejectWithValue}) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/resend-code`,
        body: {
          email,
        },
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
