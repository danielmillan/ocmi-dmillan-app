import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import type { RootState } from '../store';
import { UserInfo } from '../../types/UserInfo';

// Define a type for the slice state
interface AuthState {
  token: string;
  userInfo: UserInfo | null;
  scope: string;
  permissions: string[];
}

// Define the initial state using that type
export const initialState: AuthState = {
  token: Cookies.get('token') ? String(Cookies.get('token')) : '',
  userInfo: null,
  scope: Cookies.get('scope') ? String(Cookies.get('scope')) : '',
  permissions: Cookies.get('permissions')
    ? JSON.parse(String(Cookies.get('permissions')))
    : [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      Cookies.set('token', action.payload);
      return { ...state, token: action.payload };
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      Cookies.set('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    },
    setScope: (state, action: PayloadAction<string>) => {
      Cookies.set('scope', action.payload);
      return { ...state, scope: action.payload };
    },
    setUserPermissions: (state, action: PayloadAction<string[]>) => {
      Cookies.set('permissions', JSON.stringify(action.payload));
      return { ...state, permissions: action.payload };
    },
    logoutApp: (state) => {
      Cookies.remove('token');
      Cookies.remove('userInfo');
      Cookies.remove('scope');
      Cookies.remove('permissions');
      return { ...state, token: '', userInfo: null };
    },
  },
});

export const {
  setAuthToken,
  setScope,
  setUserInfo,
  setUserPermissions,
  logoutApp,
} = authSlice.actions;

// Selectors
export const selectAuthToken = (state: RootState) => state.auth.token;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export const selectScope = (state: RootState) => state.auth.scope;

export const selectUserPermissions = (state: RootState) =>
  state.auth.permissions;

export default authSlice.reducer;
