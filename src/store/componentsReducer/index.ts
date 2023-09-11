import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { ComponentPropsType } from '@/components/QuestionComponents';
import { getNextSelectedId, insertNewComponent } from './utils';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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
      return insertNewComponent(state, action.payload);
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
    removeSelectedComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state;
      const newComponentList = state.componentList.filter((i) => i.fe_id !== selectedId);
      const newSelectedId = getNextSelectedId(selectedId, componentList);
      return {
        ...state,
        selectedId: newSelectedId,
        componentList: newComponentList,
      };
    },
    changeComponentHidden(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) {
      const { componentList } = state;
      const newComponentList = componentList.map((i) => {
        let hidden = i.isHidden ?? false;
        if (i.fe_id === action.payload.fe_id) {
          hidden = action.payload.isHidden;
        }
        return {
          ...i,
          isHidden: hidden,
        };
      });
      let newSelectedId = '';
      if (!action.payload.isHidden) {
        newSelectedId = action.payload.fe_id;
      } else {
        newSelectedId = getNextSelectedId(action.payload.fe_id, componentList);
      }
      return {
        ...state,
        selectedId: newSelectedId,
        componentList: newComponentList,
      };
    },

    toggleComponentLocked(state: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) {
      const { componentList } = state;
      const { fe_id: id } = action.payload;
      const newComponentList = componentList.map((i) => {
        return {
          ...i,
          isLocked: i.fe_id === id ? !i.isLocked : i.isLocked,
        };
      });

      return {
        ...state,
        selectedId: id,
        componentList: newComponentList,
      };
    },

    copySelectedComponent(state: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) {
      const { componentList } = state;
      const { fe_id: id } = action.payload;
      const curComponent = componentList.find((i) => i.fe_id === id);
      return {
        ...state,
        copiedComponent: curComponent ?? null,
      };
    },

    pasteCopiedComponent(state: ComponentsStateType) {
      const { copiedComponent } = state;
      if (copiedComponent === null) {
        return {
          ...state,
        };
      }
      const component = {
        ...copiedComponent,
        fe_id: nanoid(),
      };
      return insertNewComponent(state, component);
    },

    selectPrevComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
      if (selectedIndex <= 0) return { ...state };
      return {
        ...state,
        selectedId: componentList[selectedIndex - 1].fe_id,
      };
    },
    selectNextComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
      if (selectedIndex < 0) return { ...state };
      if (selectedIndex + 1 === componentList.length) return { ...state };
      return {
        ...state,
        selectedId: componentList[selectedIndex + 1].fe_id,
      };
    },
    changeComponentTitle(
      state: ComponentsStateType,
      action: PayloadAction<{
        fe_id: string;
        title: string;
      }>,
    ) {
      const { fe_id: id, title } = action.payload;
      const newComponents = state.componentList.map((c) => {
        return {
          ...c,
          title: c.fe_id === id ? title : c.title,
        };
      });
      return {
        ...state,
        componentList: newComponents,
      };
    },
    moveComponent(
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) {
      const { componentList: curComponentList } = state;
      const { oldIndex, newIndex } = action.payload;

      const componentList = arrayMove(curComponentList, oldIndex, newIndex);

      return {
        ...state,
        componentList,
      };
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  modifyComponent,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
