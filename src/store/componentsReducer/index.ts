import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
};

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
};
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<Pick<ComponentsStateType, 'componentList'>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedId: action.payload,
      };
    },
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      let components = [...state.componentList];
      if (state.selectedId) {
        const index = state.componentList.findIndex((i) => i.fe_id === state.selectedId);
        if (index !== -1) {
          components.splice(index + 1, 0, action.payload);
        } else {
          components = [...components, action.payload];
        }
      } else {
        components = [...components, action.payload];
      }
      return {
        selectedId: action.payload.fe_id,
        componentList: [...components],
      };
    },
    modifyComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const { fe_id: id } = action.payload;
      const componentList = state.componentList.map((i) => {
        if (i.fe_id === id) return { ...action.payload };
        return { ...i };
      });

      return {
        ...state,
        componentList,
      };
    },
  },
});

export const { resetComponents, changeSelectedId, addComponent, modifyComponent } =
  componentsSlice.actions;

export default componentsSlice.reducer;
