import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoInter } from '../interface';

export type UserStateType = {
  username: string;
  nickname: string;
};

const INIT_STATE: UserStateType = { nickname: '', username: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<Pick<UserInfoInter, 'username' | 'nickname'>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutReducer: () => {
      return INIT_STATE;
    },
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
