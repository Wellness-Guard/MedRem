import {createSlice} from '@reduxjs/toolkit';
import {Auth} from '../../global/types';
import {
  signUp,
  signIn,
  signOut,
  getProfile,
  updateProfile,
  uploadAvatar,
  resetPassword,
  verifySignUpCode,
  resendVerifyCode,
} from '../thunkActions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: Auth = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  isLoggedIn: false,
  verify: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    saveOAuthUser: (state, {payload}) => {
      state.first_name = payload.first_name;
      state.email = payload.email;
      state.last_name = payload.last_name;
      state.isLoggedIn = payload;
      state.loading = false;
      state.verify = true;
      state.success = 'Sign in with Google Successfully';
    },
    resetAlerts: state => {
      state.error = '';
      state.success = '';
    },
    resetAuth: state => {
      state.error = '';
      state.success = '';
      state.first_name = '';
      state.last_name = '';
      state.email = '';
      state.id = 0;
      state.verify = false;
      state.isLoggedIn = false;
    },
    // signIn:
    // singOut:
    // refreshToken:
    // forgotPassword:
    // googleOAuth:
    // facebookOAuth:
  },

  extraReducers: builder => {
    builder.addCase(signUp.fulfilled, (state, {payload}) => {
      console.log('payload', payload);
      const {email, id, first_name, last_name} = payload.data;
      state.loading = false;
      state.error = '';
      state.success = payload.message;
      state.email = email;
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
    });
    builder.addCase(signUp.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(signUp.pending, state => {
      state.loading = true;
      state.error = '';
    });

    // for sign in asyncThunk
    builder.addCase(signIn.fulfilled, (state, {payload}) => {
      const {email, id, first_name, last_name, verify} = payload.data;
      state.loading = false;
      state.error = '';
      state.verify = verify;
      if (verify) {
        state.isLoggedIn = true;
      }
      state.success = payload.message;
      state.email = email;
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
    });
    builder.addCase(signIn.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      state.success = '';
    });
    builder.addCase(signIn.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });

    //for signOut in asyncThunk
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(signOut.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.isLoggedIn = false;
      state.success = '';
      state.email = '';
      state.id = 0;
      state.first_name = '';
      state.last_name = '';
      state.verify = false;
      AsyncStorage.removeItem('persist:root');
    });
    builder.addCase(signOut.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      state.success = '';
    });
    builder.addCase(signOut.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });

    // for get profile
    builder.addCase(getProfile.fulfilled, (state, {payload}) => {
      const {id, first_name, last_name, avatar, gender, date_of_birth} =
        payload.data;
      state.loading = false;
      state.error = '';
      state.isLoggedIn = true;
      state.gender = gender;
      state.date_of_birth = date_of_birth ? new Date(date_of_birth!) : null;
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.avatar = avatar || null;
    });
    builder.addCase(getProfile.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      state.success = '';
    });
    builder.addCase(getProfile.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });

    // for update profile
    builder.addCase(updateProfile.fulfilled, (state, {payload}) => {
      const {id, first_name, last_name, avatar, gender, date_of_birth} =
        payload.data;
      state.loading = false;
      state.error = '';
      state.isLoggedIn = true;
      state.gender = gender;
      state.date_of_birth = new Date(date_of_birth!);
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.avatar = avatar;
    });
    builder.addCase(updateProfile.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      state.success = '';
    });
    builder.addCase(updateProfile.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });

    // for upload avatar
    builder.addCase(uploadAvatar.fulfilled, (state, {payload}) => {
      const {avatar} = payload.data;
      state.loading = false;
      state.error = '';
      state.success = payload.message;
      state.avatar = avatar;
    });
    builder.addCase(uploadAvatar.rejected, (state, {payload}) => {
      state.loading = false;
      state.success = '';
      state.error = payload as string;
      console.log('error', payload);
    });
    builder.addCase(uploadAvatar.pending, state => {
      state.loading = true;
      state.error = '';
    });

    // for password reset
    builder.addCase(resetPassword.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = '';
      state.success = payload.message;
    });
    builder.addCase(resetPassword.rejected, (state, {payload}) => {
      state.loading = false;
      state.success = '';
      state.error = payload as string;
    });
    builder.addCase(resetPassword.pending, state => {
      state.loading = true;
      state.error = '';
    });

    // for verify sign up code
    builder.addCase(verifySignUpCode.fulfilled, (state, {payload}) => {
      console.log('payload', payload);
      state.loading = false;
      state.error = '';
      state.success = payload.message;
      state.verify = true;
      state.isLoggedIn = true;
    });
    builder.addCase(verifySignUpCode.rejected, (state, {payload}) => {
      console.log('payload', payload);
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(verifySignUpCode.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });

    // resend code
    builder.addCase(resendVerifyCode.fulfilled, (state, {payload}) => {
      state.success = '';
      state.error = '';
      state.success = payload.message;
    });
    builder.addCase(resendVerifyCode.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(resendVerifyCode.pending, state => {
      state.error = '';
      state.success = '';
    });
  },
});

export default authSlice;
export const {saveOAuthUser, resetAlerts, resetAuth} = authSlice.actions;
