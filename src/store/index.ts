import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentInfoType } from './componentsReducer';
import PageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StoreType = {
  user: UserStateType;
  // component: ComponentInfoType;
  component: StateWithHistory<ComponentInfoType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    // 没有 undo
    // component: componentsReducer,
    // 增加了undo
    component: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'component/resetComponents',
        'component/changeSelectedId',
        'component/selectPrevComponent',
        'component/selectNextComponent',
      ]),
    }),
    pageInfo: PageInfoReducer,
  },
});
