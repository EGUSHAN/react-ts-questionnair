import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentInfoType } from './componentsReducer';

export type StoreType = {
  user: UserStateType;
  component: ComponentInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    component: componentsReducer,
  },
});
