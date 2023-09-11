import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentInfoType } from './componentsReducer';
import PageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StoreType = {
  user: UserStateType;
  component: ComponentInfoType;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    component: componentsReducer,
    pageInfo: PageInfoReducer,
  },
});
